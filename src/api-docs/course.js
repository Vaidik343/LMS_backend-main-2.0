/**
 * @swagger
 * tags:
 *   name: Course
 *   description: Course management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         code:
 *           type: string
 *         description:
 *           type: string
 *         department_id:
 *           type: string
 *           format: uuid
 *         class_id:
 *           type: string
 *           format: uuid
 *         is_active:
 *           type: boolean
 */

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *               - department_id
 *               - class_id
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               description:
 *                 type: string
 *               department_id:
 *                 type: string
 *                 format: uuid
 *               class_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Missing fields
 *       404:
 *         description: Invalid Department or Class
 *       409:
 *         description: Duplicate course code
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses (paginated)
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 20
 *     responses:
 *       200:
 *         description: List of courses
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Course]
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
 *         description: Course found
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update course
 *     tags: [Course]
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
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Deactivate course
 *     tags: [Course]
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
 *         description: Course deactivated successfully
 *       400:
 *         description: Cannot delete active course
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */