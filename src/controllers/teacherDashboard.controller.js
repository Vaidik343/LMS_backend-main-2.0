const {User, Session, Attendance, FacultyAssignMaster, Subject, Batch, Division, Student, StudentProgress, sequelize} = require("../models");

const getTeacherDashboard = async (req, res) => {

    try {
        // only teacher
        if(!["teacher", "hod", "admin","principal"].includes(req.user.role))
        {
            return res.status(403).json({message: "Forbidden"});
        }

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
                    [Option.gte]: today,
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


        const assignments = await FacultyAssignMaster.findAll({
            where: {
                include: [
                    {
                        model: Subject
                    },
                    {
                        model: Batch
                    },
                    {
                        model: Division
                    },
                ]
            }
        });

        // class overview
        const classOverview = await StudentProgress.findAll({
            attributes: [
                {model: Batch},
                {model: Division},
            ],
            raw: false,
        });

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

module.exports = {getTeacherDashboard}