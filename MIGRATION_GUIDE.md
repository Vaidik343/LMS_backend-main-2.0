# Sequelize-CLI Migration Strategy - LMS Backend

## 📋 Overview

This guide provides a step-by-step approach to implement Sequelize-CLI migrations for your LMS backend project.

**Current Status**:
- ✅ sequelize-cli installed (v6.6.5)
- ✅ Sequelize installed (v6.37.8)
- ✅ PostgreSQL configured
- ✅ 21+ Models defined in `src/models/`
- ⏳ Migrations: NOT YET CREATED

---

## 📊 Project Database Models

Your LMS has models organized in 5 layers (dependency order):

### Layer 1: Foundation Tables (Independent - No FK)
- `User`
- `AcademicYear`
- `Department`
- `Class`

### Layer 2: Academic Structure (FK → Layer 1)
- `Course` (FK: class_id, department_id)
- `Batch` (FK: academic_year_id)
- `Division` (FK: batch_id, academic_year_id)
- `Semester` (FK: academic_year_id)
- `Subject` (FK: batch_id, semester_id, department_id)

### Layer 3: People (FK → Layer 1 & 2)
- `Faculty` (FK: department_id, batch_id, etc.)
- `Student` (FK: batch_id, division_id, etc.)
- `RefreshToken` (FK: user_id)

### Layer 4: Assignment & Progress (FK → Layer 3)
- `FacultyAssignMaster` (FK: faculty_id, subject_id, batch_id, etc.)
- `StudentProgress` (FK: student_id, subject_id, etc.)

### Layer 5: Activity & Assessment (FK → Layers 2, 3, 4)
- `Chapter` (FK: subject_id, semester_id)
- `SyllabusEntry` (FK: chapter_id, semester_id)
- `Session` (FK: faculty_id, batch_id, subject_id, chapter_id)
- `SessionChapter` (FK: session_id, chapter_id)
- `ClinicalDetail` (FK: student_id, session_id)
- `Attendance` (FK: session_id, student_id)
- `Assessment` (FK: faculty_id, subject_id, batch_id, etc.)
- `AssessmentResult` (FK: assessment_id, student_id)
- `StudentTransfer` (FK: student_id, division_id, batch_id)

---

## 🚀 Step-by-Step Implementation Plan

---

## 🎯 Why Migrations OUTSIDE `src/` ?

**Best Practice for Production**:
- ✅ Migrations are infrastructure code, not business logic
- ✅ Keep src/ for application code only
- ✅ Reduces bundle size (migrations not deployed in app)
- ✅ Industry standard across most production apps
- ✅ Clearer separation of concerns
- ✅ Easier to maintain and version control

**Note**: Models stay in `src/models/` because they're business logic and part of your application runtime.

---

Create file: `.sequelizerc` in project root

```javascript
const path = require('path');

module.exports = {
  config: path.resolve('config', 'config.js'),
  'migrations-path': path.resolve('migrations'),
  'seeders-path': path.resolve('seeders'),
  'models-path': path.resolve('src', 'models')
};
```

**Note**: Migrations and seeders are **OUTSIDE src** (production best practice), but models stay **INSIDE src**

#### Step 1.2: Create `config/config.js`

Create file: `config/config.js` at **project root** (outside src).

This file provides database configuration for different environments.

```javascript
require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/lms_dev',
    dialect: 'postgres',
    logging: false
  },
  
  test: {
    url: process.env.TEST_DATABASE_URL || 'postgres://user:password@localhost:5432/lms_test',
    dialect: 'postgres',
    logging: false
  },
  
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
```

#### Step 1.3: Create migration directories (at project root - OUTSIDE src)

```bash
mkdir -p migrations
mkdir -p seeders
```

**Structure created**:
```
project-root/
├── migrations/        ← HERE (root level)
├── seeders/           ← HERE (root level)
├── config/
│   └── config.js
└── src/
    └── models/
```

#### Step 1.4: Verify setup

```bash
npx sequelize-cli --version
npx sequelize-cli db:migrate:status
```

---

### PHASE 2️⃣: Analyze Models (Documentation)

Analyze each model in `src/models/` and document:

**For each model, identify**:
1. Table name (e.g., `academic_years`)
2. All columns with their types
3. Foreign keys and their references
4. Constraints (NOT NULL, UNIQUE, DEFAULT)
5. Indexes needed for performance

**Example Model Analysis**:

```
Model: AcademicYear
├─ Table: academic_years
├─ Columns:
│  ├─ id (UUID, PK, default: UUIDV4)
│  ├─ year_start (INTEGER, NOT NULL)
│  ├─ year_end (INTEGER, NOT NULL)
│  ├─ is_active (BOOLEAN, NOT NULL, default: true)
│  ├─ createdAt (TIMESTAMP)
│  └─ updatedAt (TIMESTAMP)
├─ Foreign Keys: NONE
├─ Indexes: 
│  └─ year_start, year_end (composite unique)
└─ References: Used by Batch, Semester, Division
```

---

### PHASE 3️⃣: Create Migration Files

Migration files translate your models into database schema.

#### Step 3.1: Create migrations for Layer 1 (Foundation)

Start with independent tables - no dependencies.

**Template for each migration**:

```javascript
// migrations/20240504000001-create-academic-years.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('academic_years', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      year_start: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      year_end: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    }, {
      timestamps: true,
      // Add any table-level options here
    });

    // Add indexes if needed
    await queryInterface.addIndex('academic_years', ['year_start', 'year_end'], {
      unique: true,
      name: 'idx_academic_years_year_start_year_end'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('academic_years');
  }
};
```

#### Step 3.2: Create migrations for Layer 2 (With FK to Layer 1)

These reference Layer 1 tables - create those first.

**Example with Foreign Key**:

```javascript
// migrations/20240504000005-create-courses.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('courses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      class_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'classes',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      },
      department_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'departments',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      },
      course_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    });

    // Add indexes
    await queryInterface.addIndex('courses', ['class_id']);
    await queryInterface.addIndex('courses', ['department_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('courses');
  }
};
```

#### Step 3.3: Continue with Layers 3, 4, 5

Follow same pattern for remaining layers, respecting dependencies.

---

### PHASE 4️⃣: Database Synchronization

Apply all migrations to create database schema.

#### Step 4.1: Check migration status

```bash
npx sequelize-cli db:migrate:status
```

**Output** (before running migrations):
```
( pending )    20240504000001-create-academic-years.js
( pending )    20240504000002-create-departments.js
( pending )    20240504000003-create-classes.js
...
```

#### Step 4.2: Run all migrations

```bash
npx sequelize-cli db:migrate
```

**Success Output**:
```
Sequelize CLI [Node: 18.x.x, CLI: x.x.x, ORM: x.x.x]

Migrating ...: (timestamp)
✔ Migration (timestamp) Executed successfully.
...
```

#### Step 4.3: Verify in database

Use pgAdmin or psql to verify:
- All tables created
- Column types correct
- Foreign keys in place
- Indexes created
- SequelizeMeta table tracks migrations

```sql
-- Check all tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check SequelizeMeta (migration tracking)
SELECT * FROM "SequelizeMeta";
```

---

### PHASE 5️⃣: Create Seeders (Optional)

Populate database with initial data.

#### Step 5.1: Generate seeder for lookup tables

```bash
npx sequelize-cli seed:generate --name seed-academic-years
```

Creates: `seeders/20240504000001-seed-academic-years.js` (at root level)

#### Step 5.2: Write seeder

```javascript
// seeders/20240504000001-seed-academic-years.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('academic_years', [
      {
        id: '12345678-1234-5678-1234-567812345678',
        year_start: 2024,
        year_end: 2025,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '12345678-1234-5678-1234-567812345679',
        year_start: 2025,
        year_end: 2026,
        is_active: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('academic_years', null, {});
  }
};
```

#### Step 5.3: Run seeders

```bash
# Run all seeders
npx sequelize-cli db:seed:all

# Undo all seeders
npx sequelize-cli db:seed:undo:all
```

---

## 📝 Important Considerations

### 1. Migration Order (Critical)
**MUST create tables in dependency order**:
1. Independent tables first (no FK)
2. Then tables with FK to Layer 1
3. Then tables with FK to Layer 2
4. And so on...

**If you create out of order**: ❌ Foreign key constraint error

### 2. Foreign Key Constraints
- Use `RESTRICT` to prevent deletion if referenced
- Use `CASCADE` for automatic deletion
- Use `SET NULL` if foreign key can be nullable

```javascript
// Example constraint options
references: {
  model: 'users',
  key: 'id'
},
onDelete: 'RESTRICT',    // Prevent deletion
onUpdate: 'CASCADE'       // Auto-update if parent changes
```

### 3. UUID Default Values
Ensure all UUID primary keys use:
```javascript
defaultValue: Sequelize.UUIDV4
```

### 4. Timestamps
Sequelize auto-manages `createdAt`/`updatedAt`, so include them:
```javascript
createdAt: {
  type: Sequelize.DATE,
  defaultValue: Sequelize.fn('now')
},
updatedAt: {
  type: Sequelize.DATE,
  defaultValue: Sequelize.fn('now')
}
```

### 5. Indexes for Performance
Add indexes for:
- Foreign keys (needed for joins)
- Frequently queried fields
- Unique constraints

```javascript
await queryInterface.addIndex('students', ['enrollment_no'], {
  unique: true
});
```

### 6. Existing Data
If you have existing data:
- Option A: Export data before migration, re-import after
- Option B: Create custom migration that preserves data
- Option C: Start fresh (development only)

---

## 🔧 Useful Commands Reference

### Migration Commands
```bash
# Generate new migration
npx sequelize-cli migration:generate --name migration-name

# Run pending migrations
npx sequelize-cli db:migrate

# Check migration status
npx sequelize-cli db:migrate:status

# Undo last migration
npx sequelize-cli db:migrate:undo

# Undo specific migration
npx sequelize-cli db:migrate:undo --name migration-name.js

# Undo all migrations
npx sequelize-cli db:migrate:undo:all
```

### Seeder Commands
```bash
# Generate seeder
npx sequelize-cli seed:generate --name seed-name

# Run all seeders
npx sequelize-cli db:seed:all

# Undo all seeders
npx sequelize-cli db:seed:undo:all

# Undo specific seeder
npx sequelize-cli db:seed:undo --seed seed-name.js
```

---

## 📊 Implementation Timeline

| Phase | Task | Duration |
|-------|------|----------|
| 1 | Setup config files (at root & src) | 20 min |
| 2 | Analyze models | 45 min |
| 3 | Create 21 migration files (in /migrations) | 3 hours |
| 4 | Run migrations | 10 min |
| 5 | Create seeders (in /seeders) | 1-2 hours |

**Total**: 4-6 hours

**Key**: Migrations & seeders at root level (production best practice)

---

## ✅ Completion Checklist

- [ ] `.sequelizerc` created (project root)
- [ ] `config/config.js` created (project root - outside src)
- [ ] `migrations/` directory created (project root - outside src)
- [ ] `seeders/` directory created (project root - outside src)
- [ ] All models analyzed and documented
- [ ] Migration files created in `/migrations` (in dependency order)
- [ ] All migrations run successfully
- [ ] Database tables verified
- [ ] Foreign key relationships verified
- [ ] (Optional) Seeders created in `/seeders` and populated
- [ ] `.env` DATABASE_URL configured correctly
- [ ] Production-ready structure confirmed

---

## 🆘 Troubleshooting

### Error: "Column X already exists"
- Migration already run
- Run: `npx sequelize-cli db:migrate:status` to check

### Error: "Foreign key constraint failed"
- Creating child table before parent table
- Check migration order - create parent first

### Error: "Config file not found"
- `.sequelizerc` not in project root
- Verify file path: `./sequelizerc` (no extension)

### Error: "DATABASE_URL not set"
- Update `.env` with correct database URL
- Restart terminal after updating .env

---

## Next Steps

When ready to implement:

1. **Start with Phase 1** - Create config files
2. **Then Phase 2** - Analyze your models
3. **Then Phase 3** - Create migration files (one layer at a time)
4. **Then Phase 4** - Run migrations
5. **Then Phase 5** - Create seeders (optional)

Good luck! 🚀
