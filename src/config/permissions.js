const PERMISSIONS = {

  // Master modules — admin only for write
  AcademicYear: {
    create: ["admin"],
    read: ["admin", "principal", "hod", "teacher", "student"],
    update: ["admin"],
    delete: ["admin"],
    setActive: ["admin"],
  },
  Department: {
    create: ["admin"],
    read: ["admin", "principal", "hod", "teacher", "student"],
    update: ["admin"],
    delete: ["admin"],
    setActive: ["admin"],
  },
  Class: {
    create: ["admin"],
    read: ["admin", "principal", "hod", "teacher", "student"],
    update: ["admin"],
    delete: ["admin"],
    setActive: ["admin"],
  },
  Course: {
    create: ["admin"],
    read: ["admin", "principal", "hod", "teacher", "student"],
    update: ["admin"],
    delete: ["admin"],
    setActive: ["admin"],
  },
  Batch: {
    create: ["admin"],
    read: ["admin", "principal", "hod", "teacher", "student"],
    update: ["admin"],
    delete: ["admin"],
  },
  Division: {
    create: ["admin"],
    read: ["admin", "principal", "hod", "teacher", "student"],
    update: ["admin"],
    delete: ["admin"],
  },
  Semester: {
    create: ["admin"],
    read: ["admin", "principal", "hod", "teacher", "student"],
    update: ["admin"],
    delete: ["admin"],
    setActive: ["admin"],
  },
  Subject: {
    create: ["admin"],
    read: ["admin", "principal", "hod", "teacher", "student"],
    update: ["admin"],
    delete: ["admin"],
  },
  Chapter: {
    create: ["admin"],
    read: ["admin", "principal", "hod", "teacher", "student"],
    update: ["admin"],
    delete: ["admin"],
  },
  SyllabusEntry: {
    create: ["admin", "teacher"],
    read: ["admin", "principal", "hod", "teacher", "student"],
    update: ["admin", "teacher"],
    delete: ["admin"],
  },

  // People
  Faculty: {
    create: ["admin"],
    read: ["admin", "principal", "hod"],
    update: ["admin"],
    delete: ["admin"],
  },
  Student: {
    create: ["admin"],
    read: ["admin", "principal", "hod", "teacher"],
    update: ["admin"],
    delete: ["admin"],
  },

  // Assignment
  FacultyAssignMaster: {
    create: ["admin", "hod"],
    read: ["admin", "principal", "hod", "teacher"],
    update: ["admin", "hod"],
    delete: ["admin", "hod"],
  },
  StudentProgress: {
    create: ["admin"],
    read: ["admin", "principal", "hod", "teacher", "student"],
    update: ["admin"],
  },

  // Activity
  Session: {
    create: ["teacher"],
    read: ["admin", "principal", "hod", "teacher", "student"],
    update: ["teacher"],
    delete: ["teacher"],
  },
  Attendance: {
    create: ["teacher"],
    read: ["admin", "hod", "teacher"],
    update: ["teacher"],
  },

  // Academic
  Assessment: {
    create: ["teacher"],
    read: ["admin", "teacher", "student"],
    update: ["teacher"],
    delete: ["teacher"],
  },
  AssessmentResult: {
    create: ["teacher"],
    read: ["admin", "teacher", "student"],
    update: ["teacher"],
  },
  StudentTransfer: {
    create: ["admin"],
    read: ["admin"],
    update: ["admin"],
  },

  // User management
  User: {
    read: ["admin"],
    update: ["admin"],
    delete: ["admin"],
  },

Dashboard: {
  student: ["student", "admin"],
  teacher: ["teacher", "hod", "admin", "principal"],
}
};

module.exports = PERMISSIONS;