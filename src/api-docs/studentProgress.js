/**
 * @swagger
 * tags:
 *   name: StudentProgress
 *   description: Student Progress Management
 */

/**
 * @swagger
 * /api/student_progress:
 *   post:
 *     summary: Create student progress
 *     tags: [StudentProgress]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             student_id: "uuid"
 *             batch_id: "uuid"
 *             division_id: "uuid"
 *             semester_id: "uuid"
 *             academic_year_id: "uuid"
 *             current: true
 *     responses:
 *       201:
 *         description: Created
 *       409:
 *         description: Already exists
 */

/**
 * @swagger
 * /api/student_progress:
 *   get:
 *     summary: Get all student progress
 *     tags: [StudentProgress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: student_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: batch_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: division_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: semester_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: academic_year_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: current
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List fetched
 */

/**
 * @swagger
 * /api/student_progress/{id}:
 *   get:
 *     summary: Get student progress by ID
 *     tags: [StudentProgress]
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
 *         description: Found
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /api/student_progress/{id}/promote:
 *   patch:
 *     summary: Promote student
 *     tags: [StudentProgress]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             student_id: "uuid"
 *             semester_id: "uuid"
 *             academic_year_id: "uuid"
 *     responses:
 *       201:
 *         description: Student promoted
 *       404:
 *         description: Current progress not found
 */