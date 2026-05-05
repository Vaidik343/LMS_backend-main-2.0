const { Op } = require("sequelize");
const {
  Session,
  SessionChapter,
  Chapter,
  Faculty,
  Subject,
  Batch,
  Division,
  Semester,
  AcademicYear,
  ClinicalDetail,
  sequelize,
} = require("../models");
 

// allowed enum values
const ALLOWED_SESSION_TYPES = ["lecture", "practical", "clinical"];

const ALLOWED_CLINICAL_TYPES = ["ward_round", "opd", "case_study"];

// ================= CREATE =================
const createSession = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const {
      subject_id,
      batch_id,
      division_id,
      semester_id,
      academic_year_id,
      session_type,
      session_date,
      start_time,
      end_time,
      topics_covered,
      methods_used,
      chapter_ids,
      clinical_details
    } = req.body;

    const faculty_id = req.user.id;

    // ✅ basic validation
    if (
      !subject_id || !batch_id || !division_id ||
      !semester_id || !academic_year_id ||
      !session_type || !session_date ||
      !start_time || !end_time || !topics_covered
    ) {
      await t.rollback();
      return res.status(400).json({ message: "Fields required!" });
    }

    // ✅ session type validation
    if (!ALLOWED_SESSION_TYPES.includes(session_type)) {
      await t.rollback();
      return res.status(400).json({ message: "Invalid session type" });
    }

    // ✅ time validation
    if (start_time >= end_time) {
      await t.rollback();
      return res.status(400).json({
        message: "End time must be greater than start time",
      });
    }

    // ✅ overlap check
    const conflict = await Session.findOne({
      where: {
        faculty_id,
        session_date,
        [Op.and]: [
          { start_time: { [Op.lt]: end_time } },
          { end_time: { [Op.gt]: start_time } }
        ]
      },
      transaction: t
    });

    if (conflict) {
      await t.rollback();
      return res.status(409).json({
        message: "Faculty already has a session in this time range"
      });
    }

    // ✅ create session
    const session = await Session.create({
      faculty_id,
      subject_id,
      batch_id,
      division_id,
      semester_id,
      academic_year_id,
      session_type,
      session_date,
      start_time,
      end_time,
      topics_covered,
      methods_used,
      is_active: true
    }, { transaction: t });

    // ================= CLINICAL =================
    if (session_type === "clinical") {

      if (!clinical_details) {
        await t.rollback();
        return res.status(400).json({
          message: "Clinical details required"
        });
      }

      const {
        clinical_type,
        case_description,
        patient_category,
        ward_name
      } = clinical_details;

      // ✅ validate clinical type
      if (!ALLOWED_CLINICAL_TYPES.includes(clinical_type)) {
        await t.rollback();
        return res.status(400).json({
          message: "Invalid clinical type"
        });
      }

      // ✅ required clinical fields
      if (!case_description || !patient_category || !ward_name) {
        await t.rollback();
        return res.status(400).json({
          message: "Incomplete clinical details"
        });
      }

      await ClinicalDetail.create({
        session_id: session.id,
        clinical_type,
        case_description,
        patient_category,
        ward_name,
        is_active: true
      }, { transaction: t });

    } else {
      // ❌ prevent wrong data
      if (clinical_details) {
        await t.rollback();
        return res.status(400).json({
          message: "Clinical details only allowed for clinical sessions"
        });
      }
    }

    // ================= CHAPTERS =================
    if (chapter_ids?.length) {
      const chapters = await Chapter.findAll({
        where: { id: chapter_ids },
        transaction: t
      });

      if (chapters.length !== chapter_ids.length) {
        await t.rollback();
        return res.status(400).json({
          message: "Invalid chapter IDs"
        });
      }

      const data = chapter_ids.map(id => ({
        session_id: session.id,
        chapter_id: id,
        is_active: true
      }));

      await SessionChapter.bulkCreate(data, { transaction: t });
    }

    await t.commit();

    res.status(201).json({
      message: "Session created successfully",
      session
    });

  } catch (error) {
    await t.rollback();
    console.log("🚀 createSession error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= GET ALL =================
const getAllSessions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const offset = (page - 1) * limit;
    const where = {is_active: true}

    const { count, rows } = await Session.findAndCountAll({
      limit,
      offset,
      order: [["id", "DESC"]],
      where,
      include: [
        {
          model: SessionChapter,
          include: [
            {
              model: Chapter,
              attributes: ["id", "title"],
            },
           
          ],
          
        },
         {
              model: ClinicalDetail,
            },
      ],
    });

    res.status(200).json({
      data: rows,
      total: count,
      page,
      limit,
    });
  } catch (error) {
    console.log("🚀 getAllSessions error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= GET BY ID =================
const getSessionById = async (req, res) => {
  try {
    const id = req.params.id;

    const session = await Session.findByPk(id, {
      include: [
        {
          model: SessionChapter,
          include: [
            {
              model: Chapter,
              attributes: ["id", "title"],
            },
            
          ],
        },{
              model: ClinicalDetail,
            }
      ],
    });

    if (!session) {
      return res.status(404).json({ message: "Not Found!" });
    }

    res.status(200).json(session);
  } catch (error) {
    console.log("🚀 getSessionById error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= UPDATE =================
const updateSession = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const id = req.params.id;

    const {
      session_type,
      session_date,
      start_time,
      end_time,
      topics_covered,
      methods_used,
      chapter_ids,
    } = req.body;

    const session = await Session.findByPk(id);

    if (!session) {
      return res.status(404).json({ message: "Not Found!" });
    }

    // time validation
    if (start_time && end_time && start_time >= end_time) {
      return res.status(400).json({
        message: "End time must be greater than start time",
      });
    }

    if(session_type === "clinical")
        {
             const { clinical_details } = req.body;

             if(!clinical_details)
             {
                throw new Error("Clinical details required!")
             }

             const existing = await ClinicalDetail.findOne({
                where: {session_id: id},
                transaction: t
             });

             if(existing)
             {
                await existing.update(clinical_details, {transaction: t});
             } else {
                await ClinicalDetail.create({
                    session_id: id,
                    ...clinical_details,
                    is_active: true  
                }, {transaction: t})
             }
        } else {
            // if session changed from clinical -> non clinical
            await ClinicalDetail.destroy({
                where: {session_id: id},
                transaction: t
            });
        }

    // update session
    await session.update(
      {
        session_type,
        session_date,
        start_time,
        end_time,
        topics_covered,
        methods_used,
      },
      { transaction: t },
    );

    // update chapters (replace logic)
    if (chapter_ids) {
      // delete old
      await SessionChapter.destroy({
        where: { session_id: id },
        transaction: t,
      });

      // insert new
      const data = chapter_ids.map((chapter_id) => ({
        session_id: id,
        chapter_id,
        is_active: true,
      }));

      await SessionChapter.bulkCreate(data, { transaction: t });
    }

    await t.commit();

    res.status(200).json({
      message: "Session updated successfully",
    });
  } catch (error) {
    await t.rollback();
    console.log("🚀 updateSession error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= DELETE =================
const deleteSession = async (req, res) => {
  try {
    const id = req.params.id;

    const session = await Session.findByPk(id);

    if (!session) {
      return res.status(404).json({ message: "Not Found!" });
    }

    await session.update({ is_active: false });

    res.status(200).json({
      message: "Session deleted",
    });
  } catch (error) {
    console.log("🚀 deleteSession error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.sessionController = {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
};
