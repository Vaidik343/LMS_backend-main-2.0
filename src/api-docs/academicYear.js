/**
 * @swagger
 * tags:
 *   name: AcademicYear
 *   description: Academic year management
 */

/**
 * @swagger
 * /api/academic_years:
 *   post:
 *     summary: Create a new academic year
 *     tags: [AcademicYear]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - label
 *               - start_date
 *               - end_date
 *             properties:
 *               label:
 *                 type: string
 *                 example: 2024-2025
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: 2024-06-01
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-05-31
 *     responses:
 *       200:
 *         description: Academic year created
 *       400:
 *         description: Validation error
 *       409:
 *         description: Already exists
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/academic_years:
 *   get:
 *     summary: Get all academic years (paginated)
 *     tags: [AcademicYear]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of academic years
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/academic_years/{id}:
 *   get:
 *     summary: Get academic year by ID
 *     tags: [AcademicYear]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Academic year found
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/academic_years/{id}:
 *   put:
 *     summary: Update academic year
 *     tags: [AcademicYear]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Academic year updated
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/academic_years/{id}:
 *   delete:
 *     summary: Soft delete academic year
 *     tags: [AcademicYear]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Academic year deleted
 *       400:
 *         description: Cannot delete active academic year
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /api/academic_years/{id}/set-active:
 *   patch:
 *     summary: Set academic year as active
 *     tags: [AcademicYear]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Academic year set as active
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
