/**
 * @swagger
 * tags:
 *   name: Faculty
 *   description: Faculty management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Faculty:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         user_id:
 *           type: string
 *           format: uuid
 *         employee_id:
 *           type: string
 *         department_id:
 *           type: string
 *           format: uuid
 *         designation:
 *           type: string
 *           enum: [teacher, hod, principal]
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         is_active:
 *           type: boolean
 */

/**
 * @swagger
 * /api/faculty:
 *   post:
 *     summary: Create faculty
 *     tags: [Faculty]
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
 *               - employee_id
 *               - department_id
 *               - designation
 *               - phone
 *               - address
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *               employee_id:
 *                 type: string
 *               department_id:
 *                 type: string
 *                 format: uuid
 *               designation:
 *                 type: string
 *                 enum: [teacher, hod, principal]
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Faculty created
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Invalid user or department
 *       409:
 *         description: Duplicate employee ID
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/faculty:
 *   get:
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     summary: Get all faculty (role-based filtered)
 *     tags: [Faculty]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of faculty
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/faculty/{id}:
 *   get:
 *     summary: Get faculty by ID
 *     tags: [Faculty]
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
 *         description: Faculty found
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/faculty/{id}:
 *   put:
 *     summary: Update faculty
 *     tags: [Faculty]
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
 *               designation:
 *                 type: string
 *                 enum: [teacher, hod, principal]
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Faculty updated
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/faculty/{id}:
 *   delete:
 *     summary: Deactivate faculty
 *     tags: [Faculty]
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
 *         description: Faculty deactivated
 *       400:
 *         description: Cannot delete active faculty
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */