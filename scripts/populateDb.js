// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client } = require('pg');

const client = new Client({
  user: 'isaac0yen',
  host: 'localhost',
  database: 'nest_social_media',
  password: '3SA11CAa',
});
const dropTableQuery = `
  DROP TABLE IF EXISTS "user";
`;

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    followers INT NOT NULL,
    followings INT NOT NULL
  );
`;

const insertDataQuery = `
  INSERT INTO "user" (username, followers, followings)
  VALUES 
    ('john_doe', 150, 100),
    ('jane_doe', 200, 180),
    ('alice_smith', 300, 250),
    ('bob_jones', 400, 350);
`;

async function setupDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');

    // Drop the User table if it exists
    await client.query(dropTableQuery);
    console.log('User table dropped if it existed');

    // Create the User table
    await client.query(createTableQuery);
    console.log('User table created');

    // Insert dummy data into the User table
    await client.query(insertDataQuery);
    console.log('Dummy data inserted into the User table');
  } catch (err) {
    console.error('Error setting up the database:', err);
  } finally {
    await client.end();
    console.log('Disconnected from the database');
  }
}

setupDatabase();
