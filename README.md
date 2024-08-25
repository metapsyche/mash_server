<!-- # mash_server






-- List all tables
\dt

-- Describe a specific table
\d your_table_name

-- Show current database
SELECT current_database();

-- Run a simple query
SELECT * FROM your_table_name;

-- List all databases
\l

-- List all schemas
\dn

-- List all users/roles
\du

-- Check connection info
\conninfo

-- Exit psql
\q











1. Connect to the mashdb Database
First, switch to the mashdb database by reconnecting:

bash
 
\c mashdb
This will change your current database connection to mashdb.

2. List Tables in mashdb
After connecting to mashdb, list all the tables:

sql
 
\dt
3. Describe a Table
If there are tables present, you can describe one using:

sql
 
\d table_name
Replace table_name with the actual table name.

Summary of Commands
bash
 
-- Connect to mashdb
\c mashdb

-- List all tables in mashdb
\dt

-- Describe a specific table
\d table_name


If mashdb also does not contain any tables, you might need to create them or ensure you're in the correct database











$env:PGPASSWORD = "1csUoYvGJUbUwmRO0G15ASpUPnux4JEK"
psql -h dpg-cqkfgrrqf0us73c9ersg-a.oregon-postgres.render.com -U mash_db_user -d mash_db

1. Create a New Artist
POST Request URL: http://localhost:3000/artists

JSON Body:

json
Copy code
{
  "name": "John Doe",
  "username": "john_doe_music",
  "description": "An independent artist with a unique sound.",
  "profilePicture": "https://example.com/images/john_doe.png",
  "walletAddress": "0x1234567890abcdef",
  "instagram": "https://instagram.com/john_doe_music",
  "tiktok": "https://tiktok.com/@john_doe_music",
  "twitter": "https://twitter.com/john_doe_music",
  "website": "https://johndoemusic.com"
}
2. Add Featured Content for an Artist
POST Request URL: http://localhost:3000/artists/1/featured-content

JSON Body:

json
Copy code
{
  "image": "https://example.com/images/featured_content_1.png",
  "name": "Hit Single - Summer Vibes"
}
3. Add New Releases for an Artist
POST Request URL: http://localhost:3000/artists/1/new-releases

JSON Body:

json
Copy code
{
  "image": "https://example.com/images/new_release_1.png",
  "name": "Album - Chill Beats Vol. 1"
}
4. Update an Existing Artist
PUT Request URL: http://localhost:3000/artists/1

JSON Body:

json
Copy code
{
  "name": "John Doe Updated",
  "username": "john_doe_music_updated",
  "description": "An updated description for the artist.",
  "profilePicture": "https://example.com/images/john_doe_updated.png",
  "walletAddress": "0xabcdef1234567890",
  "instagram": "https://instagram.com/john_doe_music_updated",
  "tiktok": "https://tiktok.com/@john_doe_music_updated",
  "twitter": "https://twitter.com/john_doe_music_updated",
  "website": "https://johndoemusicupdated.com"
}
5. Get All Artists
GET Request URL: http://localhost:3000/artists

No JSON body required.

6. Get All Featured Content for an Artist
GET Request URL: http://localhost:3000/artists/1/featured-content

No JSON body required.

7. Get All New Releases for an Artist
GET Request URL: http://localhost:3000/artists/1/new-releases

No JSON body required.

8. Delete an Artist by ID
DELETE Request URL: http://localhost:3000/artists/1

No JSON body required.

9. Delete Featured Content by ID
DELETE Request URL: http://localhost:3000/artists/1/featured-content/1

No JSON body required.

10. Delete New Release by ID
DELETE Request URL: http://localhost:3000/artists/1/new-releases/1

No JSON body required.

Replace the :id in the URLs with the actual artist ID, featured content ID, or new release ID as needed. These JSON payloads should work well for testing the corresponding endpoints in your Node.js Express application using Postman.


 -->

Here's the content formatted for a `README.md` file:

---

# Mash Server

## Database Management with `psql`

### Basic Commands

```bash
-- List all tables
\dt

-- Describe a specific table
\d your_table_name

-- Show current database
SELECT current_database();

-- Run a simple query
SELECT * FROM your_table_name;

-- List all databases
\l

-- List all schemas
\dn

-- List all users/roles
\du

-- Check connection info
\conninfo

-- Exit psql
\q
```

### Connecting to the `mashdb` Database

1. **Connect to `mashdb`:**

    ```bash
    \c mashdb
    ```

    This will change your current database connection to `mashdb`.

2. **List Tables in `mashdb`:**

    ```bash
    \dt
    ```

3. **Describe a Table:**

    ```bash
    \d table_name
    ```

    Replace `table_name` with the actual table name.

### Summary of Commands

```bash
-- Connect to mashdb
\c mashdb

-- List all tables in mashdb
\dt

-- Describe a specific table
\d table_name
```

### Connecting to the Remote Database

```bash
$env:PGPASSWORD = "1csUoYvGJUbUwmRO0G15ASpUPnux4JEK"
psql -h dpg-cqkfgrrqf0us73c9ersg-a.oregon-postgres.render.com -U mash_db_user -d mash_db
```

## API Endpoints

### 1. Create a New Artist

- **POST Request URL:** `http://localhost:3000/artists`
- **JSON Body:**

    ```json
    {
      "name": "John Doe",
      "username": "john_doe_music",
      "description": "An independent artist with a unique sound.",
      "profilePicture": "https://example.com/images/john_doe.png",
      "walletAddress": "0x1234567890abcdef",
      "instagram": "https://instagram.com/john_doe_music",
      "tiktok": "https://tiktok.com/@john_doe_music",
      "twitter": "https://twitter.com/john_doe_music",
      "website": "https://johndoemusic.com"
    }
    ```

### 2. Add Featured Content for an Artist

- **POST Request URL:** `http://localhost:3000/artists/1/featured-content`
- **JSON Body:**

    ```json
    {
      "image": "https://example.com/images/featured_content_1.png",
      "name": "Hit Single - Summer Vibes"
    }
    ```

### 3. Add New Releases for an Artist

- **POST Request URL:** `http://localhost:3000/artists/1/new-releases`
- **JSON Body:**

    ```json
    {
      "image": "https://example.com/images/new_release_1.png",
      "name": "Album - Chill Beats Vol. 1"
    }
    ```

### 4. Update an Existing Artist

- **PUT Request URL:** `http://localhost:3000/artists/1`
- **JSON Body:**

    ```json
    {
      "name": "John Doe Updated",
      "username": "john_doe_music_updated",
      "description": "An updated description for the artist.",
      "profilePicture": "https://example.com/images/john_doe_updated.png",
      "walletAddress": "0xabcdef1234567890",
      "instagram": "https://instagram.com/john_doe_music_updated",
      "tiktok": "https://tiktok.com/@john_doe_music_updated",
      "twitter": "https://twitter.com/john_doe_music_updated",
      "website": "https://johndoemusicupdated.com"
    }
    ```

### 5. Get All Artists

- **GET Request URL:** `http://localhost:3000/artists`
- **No JSON body required.**

### 6. Get All Featured Content for an Artist

- **GET Request URL:** `http://localhost:3000/artists/1/featured-content`
- **No JSON body required.**

### 7. Get All New Releases for an Artist

- **GET Request URL:** `http://localhost:3000/artists/1/new-releases`
- **No JSON body required.**

### 8. Delete an Artist by ID

- **DELETE Request URL:** `http://localhost:3000/artists/1`
- **No JSON body required.**

### 9. Delete Featured Content by ID

- **DELETE Request URL:** `http://localhost:3000/artists/1/featured-content/1`
- **No JSON body required.**

### 10. Delete New Release by ID

- **DELETE Request URL:** `http://localhost:3000/artists/1/new-releases/1`
- **No JSON body required.**

> **Note:** Replace the `:id` in the URLs with the actual artist ID, featured content ID, or new release ID as needed. These JSON payloads should work well for testing the corresponding endpoints in your Node.js Express application using Postman.

---













### 1. **SQL to Create the New Table**

You'll need to execute the following SQL statements to drop the existing table and create a new one with `id` as the primary key:

```sql
-- Drop the existing table if it exists
DROP TABLE IF EXISTS featured_content;

-- Create the new table with 'id' as the primary key
CREATE TABLE featured_content (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    creator VARCHAR(100) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    scarcity VARCHAR(100) NOT NULL,
    utility TEXT,
    tags TEXT[],
    geo VARCHAR(255),
    createdat TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    artistid BIGINT REFERENCES artists(id) ON DELETE CASCADE
);
```

### 2. **POST Endpoint**

Here’s how the `POST` endpoint would look to insert data into the updated `featured_content` table:

```javascript
app.post('/artists/:artistId/featured-content', async (req, res) => {
  const { artistId } = req.params;
  const { type, creator, file_name, file, price, scarcity, utility, tags, geo } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO featured_content (type, creator, file_name, file, price, scarcity, utility, tags, geo, createdat, artistid) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), $10) 
       RETURNING *`,
      [type, creator, file_name, file, price, scarcity, utility, tags, geo, artistId]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

### 3. **Example JSON Request Body**

Here’s a JSON example for inserting data into the new table:

```json
{
  "type": "Drawing",
  "creator": "Mike Bellamy",
  "file_name": "Last Knight",
  "file": "https://firebasestorage.googleapis.com/v0/b/mash-8645e.appspot.com/o/1.Last%20Knight.jpeg?alt=media&token=406c59bd-15fc-4a73-9b20-60b04a9e85cf",
  "price": 0.02,
  "scarcity": "240 / 5,000",
  "utility": "10% off tattoo",
  "tags": ["skull", "medieval", "spooky", "lonely"],
  "geo": "NYC"
}
```

### Summary

- **SQL Commands**: The provided SQL commands drop the existing table and create a new table with `id` as the primary key.
- **POST Endpoint**: Adjusted to fit the new schema.
- **JSON Request Body**: Updated to match the new schema without the `order` field.

This setup will allow you to insert new entries into your `featured_content` table, and each entry will have a unique `id` automatically assigned.
 