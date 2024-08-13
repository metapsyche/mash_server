# mash_server






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
'DELETE Request URL: http://localhost:3000/artists/1/featured-content/1
'
No JSON body required.

10. Delete New Release by ID
DELETE Request URL: http://localhost:3000/artists/1/new-releases/1

No JSON body required.

Replace the :id in the URLs with the actual artist ID, featured content ID, or new release ID as needed. These JSON payloads should work well for testing the corresponding endpoints in your Node.js Express application using Postman.