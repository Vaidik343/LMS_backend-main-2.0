/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard endpoints for viewing user-specific analytics and information
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StudentDashboard:
 *       type: object
 *       properties:
 *         totalAttendance:
 *           type: number
 *           description: Total attendance percentage
 *         totalCourses:
 *           type: integer
 *           description: Total enrolled courses
 *         avgGPA:
 *           type: number
 *           description: Average GPA
 *         upcomingAssignments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *         recentProgress:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               progress:
 *                 type: number
 *     TeacherDashboard:
 *       type: object
 *       properties:
 *         totalStudents:
 *           type: integer
 *           description: Total students taught
 *         totalCourses:
 *           type: integer
 *           description: Total courses assigned
 *         totalClasses:
 *           type: integer
 *           description: Total classes conducted
 *         pendingAssignments:
 *           type: integer
 *           description: Number of assignments pending review
 *         averageAttendance:
 *           type: number
 *           description: Average attendance across all classes
 *         recentClasses:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               subject:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 */

/**
 * @swagger
 * /api/dashboard/student:
 *   get:
 *     summary: Get student dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentDashboard'
 *       403:
 *         description: Forbidden - User is not a student
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/dashboard/teacher:
 *   get:
 *     summary: Get teacher dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Teacher dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherDashboard'
 *       403:
 *         description: Forbidden - User is not a teacher
 *       500:
 *         description: Server error
 */
