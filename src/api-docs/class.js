/**
 * @swagger
 * tags:
 *   name: Class
 *   description: Class management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         code:
 *           type: string
 *         duration_years:
 *           type: number
 *         description:
 *           type: string
 *         is_active:
 *           type: boolean
 */

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Create a new class
 *     tags: [Class]
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
 *               - duration_years
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               duration_years:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Class created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       400:
 *         description: Missing fields or invalid duration
 *       409:
 *         description: Class already exists
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Get all classes (paginated)
 *     tags: [Class]
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
 *         example: 10
 *     responses:
 *       200:
 *         description: List of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Class'
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
 * /api/classes/{id}:
 *   get:
 *     summary: Get class by ID
 *     tags: [Class]
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
 *         description: Class found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/classes/{id}:
 *   put:
 *     summary: Update class
 *     tags: [Class]
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
 *               duration_years:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Class updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/classes/{id}:
 *   delete:
 *     summary: Deactivate class
 *     tags: [Class]
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
 *         description: Class deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       400:
 *         description: Cannot delete active class
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */