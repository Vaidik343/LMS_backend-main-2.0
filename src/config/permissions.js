// config/permissions.js

const PERMISSIONS = {
  Session: {
    create: ["teacher"],
    read: ["admin", "principal", "hod", "teacher", "student"],
    update: ["teacher"],
    delete: ["teacher"],
  },

  Attendance: {
    create: ["teacher"],
    read: ["teacher", "hod", "admin"],
    update: ["teacher"],
  },

  User: {
    read: ["admin"],
    update: ["admin"],
    delete: ["admin"],
  },
};

module.exports = PERMISSIONS;