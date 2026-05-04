/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Attendance management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Attendance:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         session_id:
 *           type: string
 *           format: uuid
 *         student_id:
 *           type: string
 *           format: uuid
 *         is_present:
 *           type: boolean
 *         remark:
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
 * /api/attendances:
 *   post:
 *     summary: Create bulk attendance records
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - session_id
 *                 - student_id
 *                 - is_present
 *               properties:
 *                 session_id:
 *                   type: string
 *                   format: uuid
 *                 student_id:
 *                   type: string
 *                   format: uuid
 *                 is_present:
 *                   type: boolean
 *                 remark:
 *                   type: string
 *     responses:
 *       201:
 *         description: Attendance records created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attendance'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/attendances:
 *   get:
 *     summary: Get all attendance records
 *     tags: [Attendance]
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
 *         name: session_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by session ID
 *       - in: query
 *         name: student_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by student ID
 *     responses:
 *       200:
 *         description: List of attendance records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Attendance'
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
 * /api/attendances/{id}:
 *   get:
 *     summary: Get attendance record by ID
 *     tags: [Attendance]
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
 *         description: Attendance record found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       404:
 *         description: Attendance record not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/attendance/me:
 *   get:
 *     summary: Get current user's attendance records
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user's attendance records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attendance'
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/attendances/{id}:
 *   put:
 *     summary: Update attendance record
 *     tags: [Attendance]
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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_present:
 *                 type: boolean
 *               remark:
 *                 type: string
 *     responses:
 *       200:
 *         description: Attendance record updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Attendance record not found
 *       500:
 *         description: Server error
 */
