const { User, Student, Attendance, Session, StudentProgress, Subject, AssessmentResult, sequelize} = require("../models");

const getStudentDashboard = async (req, res) => {

    try {
        if(req.user.role !== 'student')
        {
            return res.status(403).json({
                message: "Forbidden"
            });

            const userId = req.user.id;

            // profile
            const student =  await Student.findOne({
                where: {user_id: studentId},
                include: [
                    {
                        model: User,
                        attributes: ["id", "name", "email"],
                    },
                ]
            });
        }

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
        student_id: studentId,
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
                    division_id: progress.batch_id 
                },
                order: [["session_date", "DESC"]],
                limit: 5,
            });
        }

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


module.exports = {getStudentDashboard}