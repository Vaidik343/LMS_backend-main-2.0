// const { User, Student, Assessment,Attendance, Session, StudentProgress, Subject, AssessmentResult, sequelize} = require("../models");

const getStudentDashboard = async (req, res) => {

    try {
        // if(req.user.role !== 'student')
        // {
        //     return res.status(403).json({
        //         message: "Forbidden"
        //     });
        // }
            const userId = req.user.id;

            // profile
            const student =  await Student.findOne({
                where: {user_id: req.user.id},
                include: [
                    {
                        model: User,
                        attributes: ["id", "name", "email"],
                    },
                ]
            });
        

        if(!student)
        {
            return res.status(404).json({message: "Student not found"});
        }

        //current progress
        const progress = await StudentProgress.findOne({
            where: {
                student_id: student.id,
                current: true,
            },
            include: ["Batch", "Division", "Semester", "AcademicYear"],
        });


        // Attendance summary
  const attendanceStats = await Attendance.findAll({
      where: {
        student_id: student.id,
      },
      include: [
        {
          model: Session,
          attributes: [],
          ...(progress && {
            where: {
              semester_id: progress.semester_id,
            },
          }),
        },
      ],
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("Attendance.id")), "total"],
        [
          sequelize.fn(
            "SUM",
            sequelize.literal(
              `CASE WHEN is_present = true THEN 1 ELSE 0 END`
            )
          ),
          "present",
        ],
      ],
      raw: true,
    });

    const total = parseInt(attendanceStats[0]?.total || 0);
    const present = parseInt(attendanceStats[0]?.present || 0);
    const absent = total - present;

    const percentage =
      total === 0 ? 0 : ((present / total) * 100).toFixed(2);

        // results

        let recentSession = [] ;

        if(progress)
        {
            recentSession = await Session.findAll({
                where: {
                    batch_id: progress.batch_id,
                    division_id: progress.division_id
                },
                order: [["session_date", "DESC"]],
                limit: 5,
            });
        }


        const results = await AssessmentResult.findAll({
  where: { student_id: student.id },
  include: [{ model: Assessment }]    // also import Assessment
})
const avgMarks = results.length === 0 ? 0 :
  (results.reduce((sum, r) => sum + r.obtained_marks, 0) / results.length).toFixed(2)

        // response

        res.status(200).json({
            profile: {
                id: student.id,
                name: student.User.name,
                email: student.User.email,
                enrollment_no: student.enrollment_no, 
            },
            progress,

            attendance: {
                total, present, absent, percentage,
            },

            results_summary: {
                total_assessments: results.length,
                average_marks: avgMarks,
            },

            results,

            recent_sessions: recentSession,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

}


const {User, Session, Attendance, FacultyAssignMaster, Subject, Batch, Division, Student, StudentProgress, sequelize} = require("../models");
const { Op } = require("sequelize") 
const getTeacherDashboard = async (req, res) => {

    try {
        // only teacher
        // if(!["teacher", "hod", "admin","principal"].includes(req.user.role))
        // {
        //     return res.status(403).json({message: "Forbidden"});
        // }

        const teacherId = req.user.id;

        // profile
        const user = await User.findByPk(teacherId, {
            attributes: ["id", "name", "email"],
        });

        // today sessions

        const today = new Date().toISOString().split("T")[0];

        const todaySessions = await Session.findAll({
            where: {
                faculty_id: teacherId,
                session_date: today,
            },

            include: ["Subject", "Batch", "Division"],
            order: [["start_time", "ASC"]],
        });

        // upcoming sessions

        const upcomingSessions = await Session.findAll({
            where: {
                faculty_id: teacherId,
                session_date: {
                    [Op.gte]: today,
                }
            },
            limit: 5,
            order: [["session_date", "ASC"]],
            include: ["Subject", "Batch", "Division"],
        });

        // attendance summary

        const attendanceStats = await Attendance.findAll({
            include: [
                {
                    model: Session,
                    where: {faculty_id: teacherId},
                    attributes: [],
                },
            ],
            attributes: [
                [sequelize.fn("COUNT", sequelize.col("Attendance.id")), "total"],
                [
                    sequelize.fn(
                        "SUM",
                        sequelize.literal(
                            `CASE WHEN is_present = true THEN 1 ELSE 0 END`
                        )
                    ),
                    "present",
                ],
            ],
            raw: true,
        });

        const total = parseInt(attendanceStats[0]?.total || 0)    // ✅ add this
const present = parseInt(attendanceStats[0]?.present || 0) // ✅ add this
const absent = total - present 
        

        const assignments = await FacultyAssignMaster.findAll({
  where: { faculty_id: teacherId },  // ✅ filter by teacher
  include: [
    { model: Subject },
    { model: Batch },
    { model: Division },
  ]
})

        // class overview
const batchIds = assignments.map(a => a.batch_id)
const classOverview = await StudentProgress.findAll({
  where: { batch_id: batchIds },
  include: [{ model: Batch }, { model: Division }]
})  

        // response
        res.status(200).json({
            profile: user, 

            today_sessions: todaySessions,
            upcoming_sessions: upcomingSessions,

            attendance_summary: {
                total,
                present,
                absent,
            },

            assigned_subjects: assignments,

            class_overview: classOverview,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

}


module.exports.dashboardController = {getStudentDashboard, getTeacherDashboard}