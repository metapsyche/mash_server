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