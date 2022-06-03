CREATE DATABASE userdb;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(10),
    dob VARCHAR(100)
);

