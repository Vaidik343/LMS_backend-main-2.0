/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Session Management
 */

/**
 * @swagger
 * /api/sessions:
 *   post:
 *     summary: Create session
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             subject_id: "uuid"
 *             batch_id: "uuid"
 *             division_id: "uuid"
 *             semester_id: "uuid"
 *             academic_year_id: "uuid"
 *             session_type: "lecture"
 *             session_date: "2026-01-01"
 *             start_time: "10:00"
 *             end_time: "11:00"
 *             topics_covered: "Introduction"
 *             methods_used: "PPT"
 *             chapter_ids: ["uuid","uuid"]
 *             clinical_details:
 *               clinical_type: "ward_round"
 *               case_description: "Case details"
 *               patient_category: "General"
 *               ward_name: "Ward A"
 *     responses:
 *       201:
 *         description: Session created
 *       400:
 *         description: Validation error
 *       409:
 *         description: Time conflict
 */

/**
 * @swagger
 * /api/sessions:
 *   get:
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     summary: Get all sessions
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List fetched
 */

/**
 * @swagger
 * /api/sessions/{id}:
 *   get:
 *     summary: Get session by ID
 *     tags: [Sessions]
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
 *         description: Found
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /api/sessions/{id}:
 *   put:
 *     summary: Update session
 *     tags: [Sessions]
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
 *             session_type: "lecture"
 *             session_date: "2026-01-01"
 *             start_time: "10:00"
 *             end_time: "11:00"
 *             topics_covered: "Updated topic"
 *             methods_used: "Whiteboard"
 *             chapter_ids: ["uuid"]
 *     responses:
 *       200:
 *         description: Updated
 */

/**
 * @swagger
 * /api/sessions/{id}:
 *   delete:
 *     summary: Delete session
 *     tags: [Sessions]
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