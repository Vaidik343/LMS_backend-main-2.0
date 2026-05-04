/**
 * @swagger
 * tags:
 *   name: Batch
 *   description: Batch management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Batch:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         course_id:
 *           type: string
 *           format: uuid
 *         academic_year_id:
 *           type: string
 *           format: uuid
 *         is_active:
 *           type: boolean
 */

/**
 * @swagger
 * /api/batches:
 *   post:
 *     summary: Create a new batch
 *     tags: [Batch]
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
 *               - course_id
 *               - academic_year_id
 *             properties:
 *               name:
 *                 type: string
 *               course_id:
 *                 type: string
 *                 format: uuid
 *               academic_year_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Batch created successfully
 *       400:
 *         description: Missing fields
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/batches:
 *   get:
 *     summary: Get all batches (paginated)
 *     tags: [Batch]
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
 *         description: List of batches
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/batches/{id}:
 *   get:
 *     summary: Get batch by ID
 *     tags: [Batch]
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
 *         description: Batch found
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/batches/{id}:
 *   put:
 *     summary: Update batch
 *     tags: [Batch]
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
 *         description: Batch updated successfully
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/batches/{id}:
 *   delete:
 *     summary: Deactivate batch
 *     tags: [Batch]
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
 *         description: Batch deactivated successfully
 *       400:
 *         description: Cannot delete active batch
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */