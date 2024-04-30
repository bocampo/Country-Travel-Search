DROP DATABASE IF EXISTS travel_db;

CREATE DATABASE travel_db;

CREATE TABLE user_info(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    email VARCHAR(100)
);

CREATE TABLE saved_countries(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    country_name VARCHAR(50), 
    FOREIGN KEY (user_id) REFERENCES user_info(id)
);

CREATE TABLE country_visa(
    id SERIAL PRIMARY KEY,
    country_name VARCHAR(50),
    visa VARCHAR (40)
);
