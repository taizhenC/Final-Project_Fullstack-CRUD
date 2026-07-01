import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { ApiError, asyncHandler } from '../lib/errors'
import { validateBody } from '../middleware/validate'
import { campusCreateSchema, campusUpdateSchema } from '../lib/validation'
import { DEFAULT_CAMPUS_IMAGE, parseId } from '../lib/constants'

const router = Router()

// GET /campuses — list all campuses.
router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const campuses = await prisma.campus.findMany({ orderBy: { id: 'asc' } })
    res.json(campuses)
  }),
)

// GET /campuses/:id — one campus plus its enrolled students.
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = parseId(req.params.id)
    const campus = await prisma.campus.findUnique({
      where: { id },
      include: { students: { orderBy: { id: 'asc' } } },
    })
    if (!campus) throw new ApiError(404, `Campus ${id} not found`)
    res.json(campus)
  }),
)

// POST /campuses — create a campus (empty imageUrl falls back to the default).
router.post(
  '/',
  validateBody(campusCreateSchema),
  asyncHandler(async (req, res) => {
    const { name, address, description, imageUrl } = req.body
    const campus = await prisma.campus.create({
      data: {
        name,
        address,
        description,
        imageUrl: imageUrl && imageUrl.length > 0 ? imageUrl : DEFAULT_CAMPUS_IMAGE,
      },
    })
    res.status(201).json(campus)
  }),
)

// PUT /campuses/:id — partial update. Missing campus -> Prisma P2025 -> 404.
router.put(
  '/:id',
  validateBody(campusUpdateSchema),
  asyncHandler(async (req, res) => {
    const id = parseId(req.params.id)
    const data = req.body
    if ('imageUrl' in data && !(data.imageUrl && data.imageUrl.length > 0)) {
      data.imageUrl = DEFAULT_CAMPUS_IMAGE
    }
    const campus = await prisma.campus.update({ where: { id }, data })
    res.json(campus)
  }),
)

// DELETE /campuses/:id — students are auto-unenrolled via onDelete: SetNull.
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = parseId(req.params.id)
    await prisma.campus.delete({ where: { id } })
    res.status(204).send()
  }),
)

export default router
