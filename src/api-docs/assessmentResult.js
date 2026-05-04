/**
 * @swagger
 * tags:
 *   name: AssessmentResult
 *   description: Assessment results management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AssessmentResult:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         assessment_id:
 *           type: string
 *           format: uuid
 *         student_id:
 *           type: string
 *           format: uuid
 *         obtained_marks:
 *           type: integer
 *         remark:
 *           type: string
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
 * /api/assessment_results:
 *   post:
 *     summary: Create bulk assessment results
 *     tags: [AssessmentResult]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - assessment_id
 *                 - student_id
 *                 - obtained_marks
 *               properties:
 *                 assessment_id:
 *                   type: string
 *                   format: uuid
 *                 student_id:
 *                   type: string
 *                   format: uuid
 *                 obtained_marks:
 *                   type: integer
 *                   minimum: 0
 *                 remark:
 *                   type: string
 *     responses:
 *       201:
 *         description: Assessment results created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AssessmentResult'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/assessment_results:
 *   get:
 *     summary: Get all assessment results
 *     tags: [AssessmentResult]
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
 *         name: assessment_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by assessment ID
 *       - in: query
 *         name: student_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by student ID
 *     responses:
 *       200:
 *         description: List of assessment results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AssessmentResult'
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
 * /api/assessment_results/{id}:
 *   get:
 *     summary: Get assessment result by ID
 *     tags: [AssessmentResult]
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
 *         description: Assessment result found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AssessmentResult'
 *       404:
 *         description: Assessment result not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/assessment_results/{id}:
 *   put:
 *     summary: Update assessment result
 *     tags: [AssessmentResult]
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
 *               obtained_marks:
 *                 type: integer
 *                 minimum: 0
 *               remark:
 *                 type: string
 *     responses:
 *       200:
 *         description: Assessment result updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AssessmentResult'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Assessment result not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/assessment_results/{id}:
 *   delete:
 *     summary: Delete assessment result
 *     tags: [AssessmentResult]
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
 *         description: Assessment result deleted successfully
 *       404:
 *         description: Assessment result not found
 *       500:
 *         description: Server error
 */
