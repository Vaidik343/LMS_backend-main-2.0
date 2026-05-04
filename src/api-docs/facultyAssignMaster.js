/**
 * @swagger
 * tags:
 *   name: FacultyAssignMaster
 *   description: Faculty Assignment Management
 */

/**
 * @swagger
 * /api/faculty_assign_master:
 *   post:
 *     summary: Create faculty assignment
 *     tags: [FacultyAssignMaster]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             faculty_id: "uuid"
 *             department_id: "uuid"
 *             course_id: "uuid"
 *             batch_id: "uuid"
 *             division_id: "uuid"
 *             semester_id: "uuid"
 *             subject_id: "uuid"
 *             academic_year_id: "uuid"
 *     responses:
 *       201:
 *         description: Assignment created
 *       400:
 *         description: Missing fields
 *       404:
 *         description: Invalid foreign key
 *       409:
 *         description: Duplicate assignment
 */

/**
 * @swagger
 * /api/faculty_assign_master:
 *   get:
 *     summary: Get all faculty assignments
 *     tags: [FacultyAssignMaster]
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
 *       - in: query
 *         name: faculty_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: subject_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: batch_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: division_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: semester_id
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: academic_year_id
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List fetched
 */

/**
 * @swagger
 * /api/faculty_assign_master/{id}:
 *   get:
 *     summary: Get assignment by ID
 *     tags: [FacultyAssignMaster]
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
 *         description: Assignment found
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /api/faculty_assign_master/{id}:
 *   put:
 *     summary: Update assignment
 *     tags: [FacultyAssignMaster]
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
 *           example:
 *             faculty_id: "uuid"
 *             subject_id: "uuid"
 *             batch_id: "uuid"
 *             division_id: "uuid"
 *             semester_id: "uuid"
 *             academic_year_id: "uuid"
 *     responses:
 *       200:
 *         description: Updated
 */

/**
 * @swagger
 * /api/faculty_assign_master/{id}:
 *   delete:
 *     summary: Delete assignment
 *     tags: [FacultyAssignMaster]
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
 *         description: Deleted
 */