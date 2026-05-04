/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         enrollment_no:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 *         gender:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         is_active:
 *           type: boolean
 */

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create student
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - enrollment_no
 *               - dob
 *               - gender
 *               - phone
 *               - address
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               enrollment_no:
 *                 type: string
 *                 example: "123456789012"
 *               dob:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Duplicate enrollment number
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students (paginated)
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of students
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Student]
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
 *         description: Student found
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update student
 *     tags: [Student]
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
 *               dob:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Deactivate student
 *     tags: [Student]
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
 *         description: Student deactivated
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */