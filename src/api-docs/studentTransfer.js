/**
 * @swagger
 * tags:
 *   name: StudentTransfer
 *   description: Student transfer management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StudentTransfer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         student_id:
 *           type: string
 *           format: uuid
 *         from_division_id:
 *           type: string
 *           format: uuid
 *         to_division_id:
 *           type: string
 *           format: uuid
 *         from_batch_id:
 *           type: string
 *           format: uuid
 *         to_batch_id:
 *           type: string
 *           format: uuid
 *         transfer_date:
 *           type: string
 *           format: date
 *         remark:
 *           type: string
 *         transferred_by:
 *           type: string
 *         is_active:
 *           type: boolean
 *           default: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/student_transfers:
 *   post:
 *     summary: Transfer student to another batch/division
 *     tags: [StudentTransfer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - from_division_id
 *               - to_division_id
 *               - from_batch_id
 *               - to_batch_id
 *               - transfer_date
 *               - transferred_by
 *             properties:
 *               student_id:
 *                 type: string
 *                 format: uuid
 *               from_division_id:
 *                 type: string
 *                 format: uuid
 *               to_division_id:
 *                 type: string
 *                 format: uuid
 *               from_batch_id:
 *                 type: string
 *                 format: uuid
 *               to_batch_id:
 *                 type: string
 *                 format: uuid
 *               transfer_date:
 *                 type: string
 *                 format: date
 *               remark:
 *                 type: string
 *               transferred_by:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student transferred successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentTransfer'
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Student already transferred
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/student_transfers/history:
 *   get:
 *     summary: Get all student transfer history
 *     tags: [StudentTransfer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *       - in: query
 *         name: student_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by student ID
 *     responses:
 *       200:
 *         description: List of student transfer history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/StudentTransfer'
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
 * /api/student_transfer/{id}/history:
 *   get:
 *     summary: Get transfer history for a specific student
 *     tags: [StudentTransfer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: Transfer history for the student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/StudentTransfer'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
