/**
 * @swagger
 * tags:
 *   name: Subject
 *   description: Subject management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Subject:
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
 *         semester_id:
 *           type: string
 *           format: uuid
 *         is_active:
 *           type: boolean
 */

/**
 * @swagger
 * /api/subjects:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subject]
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
 *               - semester_id
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               description:
 *                 type: string
 *               semester_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Subject created successfully
 *       400:
 *         description: Missing fields
 *       404:
 *         description: Invalid semester
 *       409:
 *         description: Duplicate subject
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/subjects:
 *   get:
 *     summary: Get all subjects (paginated)
 *     tags: [Subject]
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
 *         description: List of subjects
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/subjects/{id}:
 *   get:
 *     summary: Get subject by ID (with chapters)
 *     tags: [Subject]
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
 *         description: Subject found
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/subjects/{id}:
 *   put:
 *     summary: Update subject
 *     tags: [Subject]
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
 *         description: Subject updated successfully
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/subjects/{id}:
 *   delete:
 *     summary: Deactivate subject
 *     tags: [Subject]
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
 *         description: Subject deactivated
 *       400:
 *         description: Already inactive
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */