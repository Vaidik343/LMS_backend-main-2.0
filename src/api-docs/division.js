/**
 * @swagger
 * tags:
 *   name: Division
 *   description: Division management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Division:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         batch_id:
 *           type: string
 *           format: uuid
 *         is_active:
 *           type: boolean
 */

/**
 * @swagger
 * /api/divisions:
 *   post:
 *     summary: Create a new division
 *     tags: [Division]
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
 *               - batch_id
 *             properties:
 *               name:
 *                 type: string
 *               batch_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Division created successfully
 *       400:
 *         description: Missing fields
 *       404:
 *         description: Invalid batch
 *       409:
 *         description: Division already exists in batch
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/divisions:
 *   get:
 *     summary: Get all divisions (paginated)
 *     tags: [Division]
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
 *         description: List of divisions
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/divisions/{id}:
 *   get:
 *     summary: Get division by ID
 *     tags: [Division]
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
 *         description: Division found
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/divisions/{id}:
 *   put:
 *     summary: Update division
 *     tags: [Division]
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
 *     responses:
 *       200:
 *         description: Division updated successfully
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/divisions/{id}:
 *   delete:
 *     summary: Deactivate division
 *     tags: [Division]
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
 *         description: Division deactivated successfully
 *       400:
 *         description: Cannot delete active division
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */