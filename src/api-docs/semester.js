/**
 * @swagger
 * tags:
 *   name: Semester
 *   description: Semester management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Semester:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         batch_id:
 *           type: string
 *           format: uuid
 *         course_id:
 *           type: string
 *           format: uuid
 *         number:
 *           type: integer
 *         label:
 *           type: string
 *         is_active:
 *           type: boolean
 */

/**
 * @swagger
 * /api/semesters:
 *   post:
 *     summary: Create a new semester
 *     tags: [Semester]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - batch_id
 *               - course_id
 *               - number
 *             properties:
 *               batch_id:
 *                 type: string
 *                 format: uuid
 *               course_id:
 *                 type: string
 *                 format: uuid
 *               number:
 *                 type: integer
 *               label:
 *                 type: string
 *     responses:
 *       201:
 *         description: Semester created successfully
 *       400:
 *         description: Invalid data or relation
 *       404:
 *         description: Invalid batch or course
 *       409:
 *         description: Semester already exists
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/semesters:
 *   get:
 *     summary: Get all semesters (paginated)
 *     tags: [Semester]
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
 *         description: List of semesters
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/semesters/{id}:
 *   get:
 *     summary: Get semester by ID
 *     tags: [Semester]
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
 *         description: Semester found
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/semesters/{id}:
 *   put:
 *     summary: Update semester
 *     tags: [Semester]
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
 *               number:
 *                 type: integer
 *               label:
 *                 type: string
 *     responses:
 *       200:
 *         description: Semester updated successfully
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/semesters/{id}:
 *   delete:
 *     summary: Deactivate semester
 *     tags: [Semester]
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
 *         description: Semester deactivated
 *       400:
 *         description: Cannot delete active semester
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/semesters/{id}/set-active:
 *   patch:
 *     summary: Set semester as active
 *     tags: [Semester]
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
 *         description: Semester set as active
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */