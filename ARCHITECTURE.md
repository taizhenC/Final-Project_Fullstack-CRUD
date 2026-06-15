# Campuses & Students — High-Level Architecture Plan

## Context

This is the **CSCI 39548 Final Project** (40% of the course grade): a deployed,
fullstack relational CRUD app for managing **Campuses** and the **Students** enrolled
at them. The repo is currently a clean slate (only the spec PDF + an empty README), so
this is a greenfield build.

The stack is dictated by the assignment and maps module-by-module to what the course
teaches: **React + React Router + TanStack Query + Tailwind + Zustand** on the client,
**Express + Prisma + PostgreSQL** on the server, deployed to **Vercel + Render + Neon**.

This document is an **architecture plan only** — it defines the shape of the system
(layers, boundaries, data model, deployment topology, build phases). It deliberately
contains no implementation code.

> **Decisions made:** Monorepo (one repo, `client/` + `server/` folders) · TypeScript on both halves.
>
> ⚠️ **Action item:** The assignment defaults to *two* repos and says a monorepo is
> "acceptable — talk to me first." Get the instructor's sign-off on the monorepo before relying on it.

---

## 1. System Architecture

Three tiers, two deploy targets + a managed database, communicating over HTTPS/JSON.

```
        ┌─────────────────────────────┐
        │   Browser (phone/desktop)   │
        │   React SPA  ·  Tailwind     │
        └──────────────┬──────────────┘
                       │  HTTPS · REST/JSON
                       │  (TanStack Query)
                       ▼
        ┌─────────────────────────────┐
        │   Express REST API          │
        │   routes → validation →     │
        │   Prisma Client             │
        └──────────────┬──────────────┘
                       │  SQL (Prisma)
                       ▼
        ┌─────────────────────────────┐
        │   PostgreSQL (Neon)         │
        └─────────────────────────────┘

  Deploy:  client → Vercel    server → Render    db → Neon
```

**Key boundary:** the client never touches the database. All data flows through the REST
API, which is the single place that validates input and enforces relational rules.

---

## 2. Domain Model & Relational Behavior

One-to-many: a **Campus** has many **Students**; a **Student** belongs to **at most one**
Campus (or none — "unenrolled").

```
Campus 1 ───< Student
  id              id
  name            firstName / lastName
  address         email
  imageUrl*       imageUrl*
  description     gpa            (0.0–4.0)
                  campusId  (nullable, FK → Campus.id)

  * default image applied when none provided
```

**Critical relational rule (worth 10 rubric pts):** deleting a Campus must **unenroll**
its students, not delete them. Architecturally this is a `SET NULL` on-delete behavior on
the `campusId` foreign key — students survive with `campusId = null`. Enroll / un-enroll /
change-campus are all just updates to a student's `campusId`.

---

## 3. Repository Structure (Monorepo)

```
campuses-app/
├── client/                  # React + Vite + TypeScript SPA  → Vercel
│   └── src/
│       ├── pages/           # one component per route (the "screens")
│       ├── components/      # shared UI: Layout, Navbar, Footer, Card, Spinner, ErrorState
│       ├── api/             # fetch functions + TanStack Query hooks (the data layer)
│       ├── store/           # Zustand client-only state
│       ├── types/           # shared TS types (Campus, Student)
│       └── lib/             # helpers: validation, constants, default-image URLs
│
├── server/                  # Express + Prisma + TypeScript  → Render
│   ├── src/
│   │   ├── routes/          # campuses, students (REST handlers)
│   │   ├── middleware/      # input validation, central error handler, CORS
│   │   └── lib/             # Prisma client singleton
│   └── prisma/
│       ├── schema.prisma    # models + relation + on-delete rule
│       └── seed.ts          # populates DB so the deployed app isn't empty
│
└── README.md                # project, stack, local run steps, deployed URLs
```

`client/` and `server/` each have their **own `package.json`** and deploy independently.
**Monorepo advantage:** the `Campus`/`Student` TS types can be shared so the client and
server agree on shape — optionally lift `types/` to the repo root later; start simple.

---

## 4. Backend Architecture (Server)

A thin, layered REST API. Each request flows: **route → validation → Prisma → response**,
with a central error handler catching failures.

### Layers
1. **HTTP / routing** — Express routers for `/campuses` and `/students`.
2. **Validation middleware** — *never trust the client*; reject malformed input with **400**
   (required fields present, valid email format, GPA within 0.0–4.0, `campusId` references a real campus).
3. **Data access** — Prisma Client (typed queries, one shared instance).
4. **Database** — PostgreSQL on Neon.
5. **Cross-cutting** — CORS (allow the deployed frontend origin), central error handler, seed script.

### API Contract (high-level)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/campuses` | List all campuses |
| GET | `/campuses/:id` | One campus **+ its enrolled students** |
| POST | `/campuses` | Create a campus |
| PUT | `/campuses/:id` | Update a campus |
| DELETE | `/campuses/:id` | Delete campus → its students become **unenrolled** |
| GET | `/students` | List all students |
| GET | `/students/:id` | One student **+ their campus** (or none) |
| POST | `/students` | Create a student (optional `campusId`) |
| PUT | `/students/:id` | Update — including enroll / un-enroll / change campus |
| DELETE | `/students/:id` | Delete a student |

Enroll/un-enroll/change-campus need no special endpoints — they are `PUT /students/:id`
with a new (or `null`) `campusId`.

---

## 5. Frontend Architecture (Client)

A single-page React app in four cooperating layers.

### Layer A — Routing (React Router)

| Route | Page |
|-------|------|
| `/` | Home (title + links into the app) |
| `/campuses` | All Campuses (image + name + link) |
| `/campuses/:id` | Single Campus (details + enrolled students, un-enroll action) |
| `/campuses/new` | Add Campus |
| `/campuses/:id/edit` | Edit Campus |
| `/students` | All Students (image + name + link) |
| `/students/:id` | Single Student (details + campus, or "Not enrolled") |
| `/students/new` | Add Student (optional campus selection) |
| `/students/:id/edit` | Edit Student |
| `*` | 404 |

Navigation uses **`NavLink`** with an active-state style; a shared **Layout** wraps every
page (header/nav + footer) for consistent visual style.

### Layer B — Server data (TanStack Query) — *no `useEffect` fetching*
- **Queries (read):** keyed cache, e.g. `['campuses']`, `['campuses', id]`, `['students']`, `['students', id]`.
- **Mutations (write):** create/update/delete → on success **invalidate** the relevant keys
  so views refetch automatically (e.g., deleting a campus invalidates both `['campuses']` and `['students']`).
- Every fetched view renders **loading** and **error** states.

### Layer C — Client-only state (Zustand)
At least one piece of UI state that isn't server data — e.g. **dark mode**, a **search/filter**,
sidebar open/closed, or "recently viewed." Lives in a Zustand store, separate from TanStack Query's cache.

### Layer D — Presentation (Tailwind)
All styling via **Tailwind**; **responsive** (phone → desktop); shared components for cards,
spinners, error banners, and forms. Forms are **validated client-side** (required fields,
email format, GPA 0–4) — the server re-validates as the source of truth.

---

## 6. Cross-Cutting Concerns

| Concern | Approach |
|---------|----------|
| **Validation** | Client-side for UX; server-side as the authority (400 on bad input). Same rules both sides. |
| **Default images** | Constant fallback URL for campus/student when `imageUrl` is empty. |
| **Loading / error UX** | Standard shared components used by every fetched view. |
| **Config / secrets** | `.env` per half: client `VITE_API_URL`; server `DATABASE_URL` + allowed client origin. Never committed. |
| **CORS** | Server allows the deployed frontend origin (and localhost in dev). |
| **Type sharing** | Shared `Campus`/`Student` types keep client and server in agreement (monorepo benefit). |

---

## 7. Deployment Architecture

| Layer | Host | Key config |
|-------|------|-----------|
| Frontend | **Vercel** | Root directory = `client/`; env `VITE_API_URL` → Render backend URL |
| Backend | **Render** | Root directory = `server/`; env `DATABASE_URL` → Neon; allowed origin = Vercel URL; run migrations + seed on deploy |
| Database | **Neon** | Postgres free tier; connection string consumed by Prisma |

Because it's a monorepo, both Vercel and Render must be pointed at their respective
**subdirectory roots**. Goal state: both URLs live, and the **deployed frontend talks to
the deployed backend** (verify in an incognito window).

---

## 8. Incremental Build Phases

Built a little each week, mirroring the course modules (per the spec's own table). Each
phase is a shippable slice, not a throwaway.

| Phase | After learning… | Architecture slice delivered |
|------|------------------|------------------------------|
| 1 | HTML/CSS | Static Home + All Campuses layout/shell |
| 2 | JS / TS | Form-validation logic (pure functions) |
| 3 | React core | Componentize; controlled forms; lift state |
| 4 | React + Tailwind | Real responsive styling + shared Layout |
| 5 | Router + TanStack Query | All routes wired; fetch/cache/invalidate replaces local data |
| 6 | Zustand + Express | Client-only state; scaffold the Express API |
| 7 | Prisma + deploy | Wire Prisma + Neon; seed; deploy both halves |

Target: **complete and deployed before demo day (Mon, Jul 6)** — that date is both the
demo and the firm code deadline.

---

## 9. Team Git Workflow

- **Feature branches → Pull Request → review by ≥1 teammate → merge.** No direct pushes to `main`.
- Every member has commits **in their own name** (graded individually via `git log`).
- A natural way to split work in parallel: **Campus vertical** (model→API→pages) vs.
  **Student vertical**, plus shared infra (Layout, data-layer setup, deploy). Rotate reviews.
- `README.md` documents the project, stack, local-run steps, and both deployed URLs.

---

## 10. Optional Bonus — Clerk Auth (+5)

Stretch goal, additive to the architecture: wrap **write** operations (create/edit/delete)
behind Clerk sign-in while **reads stay public**. Architecturally that means a Clerk provider
on the client and auth-guard middleware on the server's mutating routes. Defer until the
core app is deployed and working.

---

## 11. Rubric Traceability

How the architecture maps to the 100-pt rubric, so nothing is missed:

| Rubric criterion | Pts | Covered by |
|------------------|----:|-----------|
| CRUD completeness (all pages, both resources) | 20 | §4 API contract + §5 route map |
| Relational behavior (enroll/unenroll/unenrolled) | 10 | §2 `SET NULL` rule + student `PUT` |
| Backend quality (routes, schema, validation, seed) | 15 | §4 layers + seed script |
| Frontend data layer (TanStack Query + Zustand) | 10 | §5 layers B & C |
| Routing & navigation (Router, NavLink, 404) | 8 | §5 layer A |
| Tailwind styling & responsiveness | 10 | §5 layer D |
| Deployment (both live, talking) | 10 | §7 |
| Team Git workflow | 10 | §9 |
| Demo quality | 7 | deployed app from §7 |
| Clerk auth (bonus) | +5 | §10 |

---

## 12. Verification (end-to-end)

The architecture is "done" when all of the following hold:

1. **Local:** `server/` runs against Neon; `client/` runs against the local API; every page
   loads with working loading/error states.
2. **CRUD round-trips:** create → read → update → delete works for **both** campuses and
   students through the deployed UI.
3. **Relational checks:** deleting a campus leaves its students as "Not enrolled"; un-enroll
   from a campus page and change-campus from a student page both persist after refresh.
4. **Validation:** bad email / GPA out of 0–4 / missing fields are blocked client-side **and**
   rejected by the API with a 400.
5. **Deployed:** open the **Vercel URL in an incognito window**; confirm it reads/writes the
   **Render** backend against the **Neon** database, with seed data visible.
6. **Workflow:** `git log` shows commits from every member; history shows PR merges, not
   direct pushes to `main`.
