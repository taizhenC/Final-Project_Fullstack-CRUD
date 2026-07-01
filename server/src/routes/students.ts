import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { ApiError, asyncHandler } from '../lib/errors'
import { validateBody } from '../middleware/validate'
import { studentCreateSchema, studentUpdateSchema } from '../lib/validation'
import { parseId } from '../lib/constants'

const router = Router()

// Reject a campusId that doesn't reference a real campus with a clean 400
// (rather than letting it surface as a foreign-key error).
async function assertCampusExists(campusId: number): Promise<void> {
  const campus = await prisma.campus.findUnique({ where: { id: campusId } })
  if (!campus) {
    throw new ApiError(400, `campusId ${campusId} does not reference an existing campus`)
  }
}

// GET /students — list all students, each with its campus (or null).
router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const students = await prisma.student.findMany({
      orderBy: { id: 'asc' },
      include: { campus: true },
    })
    res.json(students)
  }),
)

// GET /students/:id — one student plus their campus (or null).
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = parseId(req.params.id)
    const student = await prisma.student.findUnique({
      where: { id },
      include: { campus: true },
    })
    if (!student) throw new ApiError(404, `Student ${id} not found`)
    res.json(student)
  }),
)

// POST /students — create a student; campusId is optional (null = unenrolled).
router.post(
  '/',
  validateBody(studentCreateSchema),
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, gpa, campusId } = req.body
    if (campusId != null) await assertCampusExists(campusId)
    const student = await prisma.student.create({
      data: { firstName, lastName, email, gpa, campusId: campusId ?? null },
      include: { campus: true },
    })
    res.status(201).json(student)
  }),
)

// PUT /students/:id — partial update, including enroll / unenroll / change campus
// (send campusId: <id> to enroll, campusId: null to unenroll). Missing -> 404.
router.put(
  '/:id',
  validateBody(studentUpdateSchema),
  asyncHandler(async (req, res) => {
    const id = parseId(req.params.id)
    const data = req.body
    if (data.campusId != null) await assertCampusExists(data.campusId)
    const student = await prisma.student.update({
      where: { id },
      data,
      include: { campus: true },
    })
    res.json(student)
  }),
)

// DELETE /students/:id
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = parseId(req.params.id)
    await prisma.student.delete({ where: { id } })
    res.status(204).send()
  }),
)

export default router
