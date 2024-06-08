# Instagram-like Post Application wit NestJs

This is a simple application that mimics basic Instagram functionalities using NestJS, GraphQL, PostgreSQL, and TypeORM.

## Features

- Create, Read, Update, and Delete (CRUD) operations for posts
- Each post can have images and likes
- **User interface available at the root directory (`/`) for interacting with the NestJS application**

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/isaac0yen/nest-social-media.git
   cd nest-social-media
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:

   Create a `.env` file in the root directory and add the following:

   ```env
   DB_HOST=your_database_host
   DB_PORT=your_database_port
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   DB_DATABASE=your_database_name
   ```

## Running the Application

1. Start the PostgreSQL database.
2. Run the application:

   ```bash
   npm run start
   ```

3. Open [http://localhost:3000/](http://localhost:3000/) in your browser to access the user interface.
4. Open [http://localhost:3000/graphql](http://localhost:3000/graphql) in your browser to access the GraphQL playground.

## Populating the Database with Dummy Data

Go to client ui of the project on `http://localhost:3000` and click on the `populate db` button.

## Contact

If you have any questions, feel free to reach out to me at [isacoyeniyi06@gmail.com](mailto:isacoyeniyi06@gmail.com).