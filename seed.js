// Load environment variables
require('dotenv').config();

// Import PostgreSQL pool
const pool = require('./config/db');

const seedData = async () => {
  try {
    console.log('--- Starting Database Seeding (with Transaction Safety) ---');
    await pool.query('BEGIN'); // START the transaction

    // 1. CLEAR EXISTING DATA (Executed within the transaction)
    console.log('Clearing existing tasks and users...');
    await pool.query('DELETE FROM tasks');
    await pool.query('DELETE FROM users');

    // 2. INSERT SAMPLE USERS (Using safe SQL structure)
    const usersQuery = `
      INSERT INTO users (name, email, password)
      VALUES
        ($1, $2, $3),
        ($4, $5, $6)
      RETURNING id;
    `;
    const usersResult = await pool.query(usersQuery, [
        'John Doe', 'john@example.com', 'hashed_pass_1',
        'Jane Smith', 'jane@example.com', 'hashed_pass_2'
    ]);

    const johnId = usersResult.rows[0].id;
    const janeId = usersResult.rows[1].id;
    console.log(`Users created: John ID=${johnId}, Jane ID=${janeId}`);

    // 3. INSERT SAMPLE TASKS (Using safe parameters and IDs)
    const tasksQuery = `
      INSERT INTO tasks (user_id, title, description, status)
      VALUES
        ($1, 'Complete project', 'Finish the task management system', 'pending'),
        ($2, 'Buy groceries', 'Milk, eggs, and bread', 'completed'),
        ($1, 'Learn PostgreSQL', 'Study advanced queries', 'in_progress');
    `;
    await pool.query(tasksQuery, [johnId, janeId]);

    await pool.query('COMMIT'); // Commit the changes only if everything succeeds
    console.log('--- Database Seeded Successfully! ---');

  } catch (err) {
    console.error('DATABASE SEEDING FAILED:', err.message);
    await pool.query('ROLLBACK'); // Rollback if any error occurred
    console.log('Transaction rolled back.');
  } finally {
    pool.end();
  }
};

seedData();