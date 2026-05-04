/**
 * @swagger
 * tags:
 *   name: Assessment
 *   description: Assessment management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Assessment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         faculty_id:
 *           type: string
 *           format: uuid
 *         subject_id:
 *           type: string
 *           format: uuid
 *         batch_id:
 *           type: string
 *           format: uuid
 *         division_id:
 *           type: string
 *           format: uuid
 *         semester_id:
 *           type: string
 *           format: uuid
 *         academic_year_id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *           example: Unit Test 1
 *         assessment_type:
 *           type: string
 *           enum: [quiz, unit_test, practical, viva, assignment]
 *         total_marks:
 *           type: integer
 *         assessment_date:
 *           type: string
 *           format: date
 *         is_active:
 *           type: boolean
 *           default: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/assessments:
 *   post:
 *     summary: Create a new assessment
 *     tags: [Assessment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - faculty_id
 *               - subject_id
 *               - batch_id
 *               - division_id
 *               - semester_id
 *               - academic_year_id
 *               - title
 *               - assessment_type
 *               - total_marks
 *               - assessment_date
 *             properties:
 *               faculty_id:
 *                 type: string
 *                 format: uuid
 *               subject_id:
 *                 type: string
 *                 format: uuid
 *               batch_id:
 *                 type: string
 *                 format: uuid
 *               division_id:
 *                 type: string
 *                 format: uuid
 *               semester_id:
 *                 type: string
 *                 format: uuid
 *               academic_year_id:
 *                 type: string
 *                 format: uuid
 *               title:
 *                 type: string
 *                 example: Unit Test 1
 *               assessment_type:
 *                 type: string
 *                 enum: [quiz, unit_test, practical, viva, assignment]
 *               total_marks:
 *                 type: integer
 *                 example: 100
 *               assessment_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Assessment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assessment'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/assessments:
 *   get:
 *     summary: Get all assessments
 *     tags: [Assessment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *       - in: query
 *         name: subject_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by subject ID
 *       - in: query
 *         name: batch_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by batch ID
 *       - in: query
 *         name: assessment_type
 *         schema:
 *           type: string
 *           enum: [quiz, unit_test, practical, viva, assignment]
 *         description: Filter by assessment type
 *     responses:
 *       200:
 *         description: List of assessments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Assessment'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/assessments/{id}:
 *   get:
 *     summary: Get assessment by ID
 *     tags: [Assessment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Assessment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assessment'
 *       404:
 *         description: Assessment not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/assessments/{id}:
 *   put:
 *     summary: Update assessment
 *     tags: [Assessment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               assessment_type:
 *                 type: string
 *                 enum: [quiz, unit_test, practical, viva, assignment]
 *               total_marks:
 *                 type: integer
 *               assessment_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Assessment updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assessment'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Assessment not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/assessments/{id}:
 *   delete:
 *     summary: Delete assessment
 *     tags: [Assessment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Assessment deleted successfully
 *       404:
 *         description: Assessment not found
 *       500:
 *         description: Server error
 */
