const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");


// ── Layer 3: People ──────────────────────────────────────────

const Student      = require("./student.model")(sequelize, DataTypes);
const Faculty      = require("./faculty.model")(sequelize, DataTypes);
const RefreshToken = require("./refreshToken.model")(sequelize, DataTypes);

// ── Layer 4: Assignment ──────────────────────────────────────

const FacultyAssignMaster = require("./facultyAssignMaster.model")(sequelize, DataTypes);
const StudentProgress     = require("./studentProgress.model")(sequelize, DataTypes);

// ── Layer 5: Activity ──────────────────────────────────

const Session        = require("./session.model")(sequelize, DataTypes);
const SessionChapter = require("./sessionChapter.model")(sequelize, DataTypes);
const ClinicalDetail = require("./clinicalDetail.model")(sequelize, DataTypes);
const Attendance     = require("./attendance.model")(sequelize, DataTypes);


// ── Initialize models ────────────────────────────────────────
const User          = require("./user.model")(sequelize, DataTypes);
const AcademicYear  = require("./academic_years.model")(sequelize, DataTypes);
const Department    = require("./department.model")(sequelize, DataTypes);
const Class         = require("./class.model")(sequelize, DataTypes);
const Course        = require("./courses.model")(sequelize, DataTypes);

const Batch         = require("./batches.model")(sequelize, DataTypes);
const Division      = require("./division.model")(sequelize, DataTypes);
const Semester      = require("./semester.model")(sequelize, DataTypes);
const Subject       = require("./subject.model")(sequelize, DataTypes);
const Chapter       = require("./chapter.model")(sequelize, DataTypes);
const SyllabusEntry = require("./syllabusEntry.model")(sequelize, DataTypes);

const Assessment       = require("./assessment.model")(sequelize, DataTypes);
const AssessmentResult = require("./assessmentResult.model")(sequelize, DataTypes);
const StudentTransfer  = require("./studentTransfer.model")(sequelize, DataTypes);

// ── Layer 1 Associations ─────────────────────────────────────

// Department → Course
Department.hasMany(Course, { foreignKey: "department_id", onDelete: "RESTRICT" });
Course.belongsTo(Department, { foreignKey: "department_id" });

// Class → Course
Class.hasMany(Course, { foreignKey: "class_id", onDelete: "RESTRICT" });
Course.belongsTo(Class, { foreignKey: "class_id" });

// ── Layer 2 Associations ─────────────────────────────────────

// Course → Batch
Course.hasMany(Batch, { foreignKey: "course_id", onDelete: "RESTRICT" });
Batch.belongsTo(Course, { foreignKey: "course_id" });

// AcademicYear → Batch
AcademicYear.hasMany(Batch, { foreignKey: "academic_year_id", onDelete: "RESTRICT" });
Batch.belongsTo(AcademicYear, { foreignKey: "academic_year_id" });

// Batch → Division
Batch.hasMany(Division, { foreignKey: "batch_id", onDelete: "RESTRICT" });
Division.belongsTo(Batch, { foreignKey: "batch_id" });

// Batch → Semester
Batch.hasMany(Semester, { foreignKey: "batch_id", onDelete: "RESTRICT" });
Semester.belongsTo(Batch, { foreignKey: "batch_id" });

// Course → Semester
Course.hasMany(Semester, { foreignKey: "course_id", onDelete: "RESTRICT" });
Semester.belongsTo(Course, { foreignKey: "course_id" });

// Course → Subject
Course.hasMany(Subject, { foreignKey: "course_id", onDelete: "RESTRICT" });
Subject.belongsTo(Course, { foreignKey: "course_id" });

// Semester → Subject
Semester.hasMany(Subject, { foreignKey: "semester_id", onDelete: "RESTRICT" });
Subject.belongsTo(Semester, { foreignKey: "semester_id" });

// Subject → Chapter
Subject.hasMany(Chapter, { foreignKey: "subject_id", onDelete: "RESTRICT" });
Chapter.belongsTo(Subject, { foreignKey: "subject_id" });

// Chapter → SyllabusEntry
Chapter.hasMany(SyllabusEntry, { foreignKey: "chapter_id", onDelete: "RESTRICT" });
SyllabusEntry.belongsTo(Chapter, { foreignKey: "chapter_id" });

// ── Layer 3 Associations ─────────────────────────────────────

// User → Student
User.hasOne(Student, { foreignKey: "user_id", onDelete: "RESTRICT" });
Student.belongsTo(User, { foreignKey: "user_id" });

// User → Faculty
User.hasOne(Faculty, { foreignKey: "user_id", onDelete: "RESTRICT" });
Faculty.belongsTo(User, { foreignKey: "user_id" });

// Department → Faculty
Department.hasMany(Faculty, { foreignKey: "department_id", onDelete: "RESTRICT" });
Faculty.belongsTo(Department, { foreignKey: "department_id" });

// User → RefreshToken
User.hasMany(RefreshToken, { foreignKey: "user_id", onDelete: "CASCADE" });
RefreshToken.belongsTo(User, { foreignKey: "user_id" });

// ── Layer 4 Associations ─────────────────────────────────────

// FacultyAssignMaster
Faculty.hasMany(FacultyAssignMaster, { foreignKey: "faculty_id", onDelete: "RESTRICT" });
FacultyAssignMaster.belongsTo(Faculty, { foreignKey: "faculty_id" });

Department.hasMany(FacultyAssignMaster, { foreignKey: "department_id", onDelete: "RESTRICT" });
FacultyAssignMaster.belongsTo(Department, { foreignKey: "department_id" });

Course.hasMany(FacultyAssignMaster, { foreignKey: "course_id", onDelete: "RESTRICT" });
FacultyAssignMaster.belongsTo(Course, { foreignKey: "course_id" });

Batch.hasMany(FacultyAssignMaster, { foreignKey: "batch_id", onDelete: "RESTRICT" });
FacultyAssignMaster.belongsTo(Batch, { foreignKey: "batch_id" });

Division.hasMany(FacultyAssignMaster, { foreignKey: "division_id", onDelete: "RESTRICT" });
FacultyAssignMaster.belongsTo(Division, { foreignKey: "division_id" });

Semester.hasMany(FacultyAssignMaster, { foreignKey: "semester_id", onDelete: "RESTRICT" });
FacultyAssignMaster.belongsTo(Semester, { foreignKey: "semester_id" });

Subject.hasMany(FacultyAssignMaster, { foreignKey: "subject_id", onDelete: "RESTRICT" });
FacultyAssignMaster.belongsTo(Subject, { foreignKey: "subject_id" });

AcademicYear.hasMany(FacultyAssignMaster, { foreignKey: "academic_year_id", onDelete: "RESTRICT" });
FacultyAssignMaster.belongsTo(AcademicYear, { foreignKey: "academic_year_id" });

// StudentProgress
Student.hasMany(StudentProgress, { foreignKey: "student_id", onDelete: "RESTRICT" });
StudentProgress.belongsTo(Student, { foreignKey: "student_id" });

Batch.hasMany(StudentProgress, { foreignKey: "batch_id", onDelete: "RESTRICT" });
StudentProgress.belongsTo(Batch, { foreignKey: "batch_id" });

Division.hasMany(StudentProgress, { foreignKey: "division_id", onDelete: "RESTRICT" });
StudentProgress.belongsTo(Division, { foreignKey: "division_id" });

Semester.hasMany(StudentProgress, { foreignKey: "semester_id", onDelete: "RESTRICT" });
StudentProgress.belongsTo(Semester, { foreignKey: "semester_id" });

AcademicYear.hasMany(StudentProgress, { foreignKey: "academic_year_id", onDelete: "RESTRICT" });
StudentProgress.belongsTo(AcademicYear, { foreignKey: "academic_year_id" });

// ── Layer 5 Associations ─────────────────────────────────────

// Faculty → Session
Faculty.hasMany(Session, { foreignKey: "faculty_id", onDelete: "RESTRICT" });
Session.belongsTo(Faculty, { foreignKey: "faculty_id" });

// Subject → Session
Subject.hasMany(Session, { foreignKey: "subject_id", onDelete: "RESTRICT" });
Session.belongsTo(Subject, { foreignKey: "subject_id" });

// Batch → Session
Batch.hasMany(Session, { foreignKey: "batch_id", onDelete: "RESTRICT" });
Session.belongsTo(Batch, { foreignKey: "batch_id" });

// Division → Session
Division.hasMany(Session, { foreignKey: "division_id", onDelete: "RESTRICT" });
Session.belongsTo(Division, { foreignKey: "division_id" });

// Semester → Session
Semester.hasMany(Session, { foreignKey: "semester_id", onDelete: "RESTRICT" });
Session.belongsTo(Semester, { foreignKey: "semester_id" });

// AcademicYear → Session
AcademicYear.hasMany(Session, { foreignKey: "academic_year_id", onDelete: "RESTRICT" });
Session.belongsTo(AcademicYear, { foreignKey: "academic_year_id" });

// Session → SessionChapter
Session.hasMany(SessionChapter, { foreignKey: "session_id", onDelete: "CASCADE" });
SessionChapter.belongsTo(Session, { foreignKey: "session_id" });

// Chapter → SessionChapter
Chapter.hasMany(SessionChapter, { foreignKey: "chapter_id", onDelete: "RESTRICT" });
SessionChapter.belongsTo(Chapter, { foreignKey: "chapter_id" });

// Session → ClinicalDetail (one session has at most one clinical detail)
Session.hasOne(ClinicalDetail, { foreignKey: "session_id", onDelete: "CASCADE" });
ClinicalDetail.belongsTo(Session, { foreignKey: "session_id" });

// Session → Attendance
Session.hasMany(Attendance, { foreignKey: "session_id", onDelete: "CASCADE" });
Attendance.belongsTo(Session, { foreignKey: "session_id" });

// Student → Attendance
Student.hasMany(Attendance, { foreignKey: "student_id", onDelete: "RESTRICT" });
Attendance.belongsTo(Student, { foreignKey: "student_id" });

// ── Layer 6 Associations ─────────────────────────────────────

// Assessment
Faculty.hasMany(Assessment, { foreignKey: "faculty_id", onDelete: "RESTRICT" });
Assessment.belongsTo(Faculty, { foreignKey: "faculty_id" });

Subject.hasMany(Assessment, { foreignKey: "subject_id", onDelete: "RESTRICT" });
Assessment.belongsTo(Subject, { foreignKey: "subject_id" });

Batch.hasMany(Assessment, { foreignKey: "batch_id", onDelete: "RESTRICT" });
Assessment.belongsTo(Batch, { foreignKey: "batch_id" });

Division.hasMany(Assessment, { foreignKey: "division_id", onDelete: "RESTRICT" });
Assessment.belongsTo(Division, { foreignKey: "division_id" });

Semester.hasMany(Assessment, { foreignKey: "semester_id", onDelete: "RESTRICT" });
Assessment.belongsTo(Semester, { foreignKey: "semester_id" });

AcademicYear.hasMany(Assessment, { foreignKey: "academic_year_id", onDelete: "RESTRICT" });
Assessment.belongsTo(AcademicYear, { foreignKey: "academic_year_id" });

// AssessmentResult
Assessment.hasMany(AssessmentResult, { foreignKey: "assessment_id", onDelete: "CASCADE" });
AssessmentResult.belongsTo(Assessment, { foreignKey: "assessment_id" });

Student.hasMany(AssessmentResult, { foreignKey: "student_id", onDelete: "RESTRICT" });
AssessmentResult.belongsTo(Student, { foreignKey: "student_id" });

// StudentTransfer
Student.hasMany(StudentTransfer, { foreignKey: "student_id", onDelete: "RESTRICT" });
StudentTransfer.belongsTo(Student, { foreignKey: "student_id" });

Semester.hasMany(StudentTransfer, { foreignKey: "from_semester_id", as: "transfersFrom", onDelete: "RESTRICT" });
StudentTransfer.belongsTo(Semester, { foreignKey: "from_semester_id", as: "fromSemester" });

Semester.hasMany(StudentTransfer, { foreignKey: "to_semester_id", as: "transfersTo", onDelete: "RESTRICT" });
StudentTransfer.belongsTo(Semester, { foreignKey: "to_semester_id", as: "toSemester" });

Batch.hasMany(StudentTransfer, { foreignKey: "from_batch_id", as: "transfersFrom", onDelete: "RESTRICT" });
StudentTransfer.belongsTo(Batch, { foreignKey: "from_batch_id", as: "fromBatch" });

Batch.hasMany(StudentTransfer, { foreignKey: "to_batch_id", as: "transfersTo", onDelete: "RESTRICT" });
StudentTransfer.belongsTo(Batch, { foreignKey: "to_batch_id", as: "toBatch" });

// ── Export ───────────────────────────────────────────────────
module.exports = {
  sequelize,
  User,
  AcademicYear,
  Department,
  Class,
  Course,
  Batch,
  Division,
  Semester,
  Subject,
  Chapter,
  SyllabusEntry,
  Student,
  Faculty,
  RefreshToken,
  FacultyAssignMaster,
  StudentProgress,
  Session,
  SessionChapter,
  ClinicalDetail,
  Attendance,
  Assessment,
  AssessmentResult,
  StudentTransfer,
};