/**
 * @swagger
 * tags:
 *   name: Chapter
 *   description: Chapter management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Chapter:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         subject_id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *         order_index:
 *           type: integer
 *         is_active:
 *           type: boolean
 */

/**
 * @swagger
 * /api/chapters:
 *   post:
 *     summary: Create a new chapter
 *     tags: [Chapter]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject_id
 *               - title
 *               - order_index
 *             properties:
 *               subject_id:
 *                 type: string
 *                 format: uuid
 *               title:
 *                 type: string
 *               order_index:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Chapter created successfully
 *       400:
 *         description: Missing fields
 *       404:
 *         description: Invalid subject
 *       409:
 *         description: Duplicate chapter
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/chapters:
 *   get:
 *     summary: Get all chapters (paginated)
 *     tags: [Chapter]
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
 *         description: List of chapters
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/chapters/{id}:
 *   get:
 *     summary: Get chapter by ID
 *     tags: [Chapter]
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
 *         description: Chapter found
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/chapters/{id}:
 *   put:
 *     summary: Update chapter
 *     tags: [Chapter]
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
 *               title:
 *                 type: string
 *               order_index:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Chapter updated
 *       400:
 *         description: Invalid update or inactive
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/chapters/{id}:
 *   delete:
 *     summary: Deactivate chapter
 *     tags: [Chapter]
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
 *         description: Chapter deactivated
 *       400:
 *         description: Already inactive
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */