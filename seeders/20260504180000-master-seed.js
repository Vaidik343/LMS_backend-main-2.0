'use strict';
const crypto = require('crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    // 0. CLEAR EXISTING DATA (Idempotency) - Using exact migration table names
    await queryInterface.bulkDelete('student_transfers', null, {});
    await queryInterface.bulkDelete('assessment_results', null, {});
    await queryInterface.bulkDelete('assessments', null, {});
    await queryInterface.bulkDelete('attendances', null, {});
    await queryInterface.bulkDelete('clinical_details', null, {});
    await queryInterface.bulkDelete('session_chapters', null, {});
    await queryInterface.bulkDelete('sessions', null, {});
    await queryInterface.bulkDelete('students_progress', null, {});
    await queryInterface.bulkDelete('faculty_assign_master', null, {});
    await queryInterface.bulkDelete('refresh_tokens', null, {});
    await queryInterface.bulkDelete('students', null, {});
    await queryInterface.bulkDelete('faculties', null, {});
    await queryInterface.bulkDelete('syllabus_entries', null, {});
    await queryInterface.bulkDelete('chapters', null, {});
    await queryInterface.bulkDelete('subjects', null, {});
    await queryInterface.bulkDelete('semesters', null, {});
    await queryInterface.bulkDelete('divisions', null, {});
    await queryInterface.bulkDelete('batches', null, {});
    await queryInterface.bulkDelete('courses', null, {});
    await queryInterface.bulkDelete('classes', null, {});
    await queryInterface.bulkDelete('departments', null, {});
    await queryInterface.bulkDelete('academic_years', null, {});
    await queryInterface.bulkDelete('users', null, {});

    // 1. SEED USERS
    await queryInterface.bulkInsert('users', [
      {
        id: crypto.randomUUID(),
        name: 'Vaidik Admin',
        email: 'vaidik.bbcspl@gmail.com',
        role: 'admin',
        is_active: true,
        created_at: now,
        updated_at: now
      },
      {
        id: crypto.randomUUID(),
        name: 'Dr. Rahul Verma',
        email: 'rahul.verma@example.com',
        role: 'teacher',
        is_active: true,
        created_at: now,
        updated_at: now
      },
      {
        id: crypto.randomUUID(),
        name: 'Samantha Rao',
        email: 'samantha.rao@example.com',
        role: 'student',
        is_active: true,
        created_at: now,
        updated_at: now
      }
    ]);

    // 2. SEED ACADEMIC YEARS
    await queryInterface.bulkInsert('academic_years', [
      {
        id: crypto.randomUUID(),
        label: '2024-2025',
        start_date: '2024-07-01',
        end_date: '2025-06-30',
        is_active: true,
        created_at: now,
        updated_at: now
      }
    ]);

    // 3. SEED DEPARTMENTS
    await queryInterface.bulkInsert('departments', [
      {
        id: crypto.randomUUID(),
        name: 'Medical Sciences',
        code: 'MED',
        description: 'Department of Medicine',
        is_active: true,
        created_at: now,
        updated_at: now
      },
      {
        id: crypto.randomUUID(),
        name: 'Nursing',
        code: 'NUR',
        description: 'Department of Nursing',
        is_active: true,
        created_at: now,
        updated_at: now
      }
    ]);

    // 4. SEED CLASSES
    await queryInterface.bulkInsert('classes', [
      {
        id: crypto.randomUUID(),
        name: 'MBBS',
        code: 'MBBS',
        duration_years: 5,
        is_active: true,
        created_at: now,
        updated_at: now
      },
      {
        id: crypto.randomUUID(),
        name: 'Nursing degree',
        code: 'NUR-D',
        duration_years: 4,
        is_active: true,
        created_at: now,
        updated_at: now
      }
    ]);

    // --- FETCH IDS FOR RELATIONSHIPS ---
    const [users] = await queryInterface.sequelize.query('SELECT id, email, role FROM users');
    const [academicYears] = await queryInterface.sequelize.query('SELECT id FROM academic_years');
    const [departments] = await queryInterface.sequelize.query('SELECT id, name FROM departments');
    const [classes] = await queryInterface.sequelize.query('SELECT id, name FROM classes');

    const medDept = departments.find(d => d.name === 'Medical Sciences');
    const mbbsClass = classes.find(c => c.name === 'MBBS');

    // 5. SEED COURSES
    await queryInterface.bulkInsert('courses', [
      {
        id: crypto.randomUUID(),
        department_id: medDept.id,
        class_id: mbbsClass.id,
        name: 'MBBS Course',
        code: 'MBBS-001',
        description: 'Complete medical course',
        is_active: true,
        created_at: now,
        updated_at: now
      }
    ]);

    // --- FETCH COURSE IDS ---
    const [courses] = await queryInterface.sequelize.query('SELECT id, name FROM courses');
    const mbbsCourse = courses.find(c => c.name === 'MBBS Course');

    // 6. SEED BATCHES
    await queryInterface.bulkInsert('batches', [
      {
        id: crypto.randomUUID(),
        course_id: mbbsCourse.id,
        academic_year_id: academicYears[0].id,
        name: 'MBBS Batch 2024',
        is_active: true,
        created_at: now,
        updated_at: now
      }
    ]);

    // --- FETCH BATCH IDS ---
    const [batches] = await queryInterface.sequelize.query('SELECT id FROM batches');

    // 7. SEED DIVISIONS
    await queryInterface.bulkInsert('divisions', [
      {
        id: crypto.randomUUID(),
        batch_id: batches[0].id,
        name: 'Division A',
        is_active: true,
        created_at: now,
        updated_at: now
      },
      {
        id: crypto.randomUUID(),
        batch_id: batches[0].id,
        name: 'Division B',
        is_active: true,
        created_at: now,
        updated_at: now
      }
    ]);

    // 8. SEED SEMESTERS
    await queryInterface.bulkInsert('semesters', [
      {
        id: crypto.randomUUID(),
        course_id: mbbsCourse.id,
        batch_id: batches[0].id,
        number: 1,
        label: 'Semester 1',
        is_active: true,
        created_at: now,
        updated_at: now
      }
    ]);

    // --- FETCH SEMESTER IDS ---
    const [semesters] = await queryInterface.sequelize.query('SELECT id FROM semesters');

    // 9. SEED SUBJECTS
    await queryInterface.bulkInsert('subjects', [
      {
        id: crypto.randomUUID(),
        semester_id: semesters[0].id,
        name: 'Anatomy',
        code: 'ANAT-101',
        description: 'Study of human structure',
        is_active: true,
        created_at: now,
        updated_at: now
      }
    ]);

    // --- FETCH SUBJECT IDS ---
    const [subjects] = await queryInterface.sequelize.query('SELECT id FROM subjects');

    // 10. SEED CHAPTERS
    await queryInterface.bulkInsert('chapters', [
      {
        id: crypto.randomUUID(),
        subject_id: subjects[0].id,
        title: 'Introduction to Human Body',
        order_index: 1,
        is_active: true,
        created_at: now,
        updated_at: now
      }
    ]);

    // --- FETCH CHAPTER IDS ---
    const [chapters] = await queryInterface.sequelize.query('SELECT id FROM chapters');

    // 11. SEED SYLLABUS ENTRIES
    await queryInterface.bulkInsert('syllabus_entries', [
      {
        id: crypto.randomUUID(),
        chapter_id: chapters[0].id,
        content_type: 'theoretical',
        description: 'Basic terminology and organization of the body',
        is_active: true,
        created_at: now,
        updated_at: now
      },
      {
        id: crypto.randomUUID(),
        chapter_id: chapters[0].id,
        content_type: 'practical',
        description: 'Surface anatomy demonstration',
        is_active: true,
        created_at: now,
        updated_at: now
      }
    ]);

    // 12. SEED FACULTY & STUDENTS
    const teacherUser = users.find(u => u.role === 'teacher');
    const studentUser = users.find(u => u.role === 'student');

    await queryInterface.bulkInsert('faculties', [
      {
        id: crypto.randomUUID(),
        user_id: teacherUser.id,
        department_id: medDept.id,
        employee_id: 'FAC-001',
        designation: 'teacher',
        phone: '1234567890',
        address: '123 Medical St, Health City',
        is_active: true,
        created_at: now,
        updated_at: now
      }
    ]);

    await queryInterface.bulkInsert('students', [
      {
        id: crypto.randomUUID(),
        user_id: studentUser.id,
        enrollment_no: 'STU-2024-001',
        dob: '2002-05-15',
        gender: 'female',
        phone: '9876543210',
        address: '456 Student Housing, University Park',
        is_active: true,
        created_at: now,
        updated_at: now
      }
    ]);

    console.log('✅ Master Seeding Completed Successfully with random UUIDs!');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('student_transfers', null, {});
    await queryInterface.bulkDelete('assessment_results', null, {});
    await queryInterface.bulkDelete('assessments', null, {});
    await queryInterface.bulkDelete('attendances', null, {});
    await queryInterface.bulkDelete('clinical_details', null, {});
    await queryInterface.bulkDelete('session_chapters', null, {});
    await queryInterface.bulkDelete('sessions', null, {});
    await queryInterface.bulkDelete('students_progress', null, {});
    await queryInterface.bulkDelete('faculty_assign_master', null, {});
    await queryInterface.bulkDelete('refresh_tokens', null, {});
    await queryInterface.bulkDelete('students', null, {});
    await queryInterface.bulkDelete('faculties', null, {});
    await queryInterface.bulkDelete('syllabus_entries', null, {});
    await queryInterface.bulkDelete('chapters', null, {});
    await queryInterface.bulkDelete('subjects', null, {});
    await queryInterface.bulkDelete('semesters', null, {});
    await queryInterface.bulkDelete('divisions', null, {});
    await queryInterface.bulkDelete('batches', null, {});
    await queryInterface.bulkDelete('courses', null, {});
    await queryInterface.bulkDelete('classes', null, {});
    await queryInterface.bulkDelete('departments', null, {});
    await queryInterface.bulkDelete('academic_years', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
