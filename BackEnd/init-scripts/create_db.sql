-- Create Database
CREATE DATABASE RecipeApp;

-- Use the Database
USE RecipeApp;

-- Create Table: USERS
CREATE TABLE USERS (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- Create Table: FavoriteRecipes
CREATE TABLE FavoriteRecipes (
    user_id VARCHAR(255) NOT NULL,
    recipe_id INT NOT NULL,
    PRIMARY KEY (user_id, recipe_id)
);

-- Create Table: PrivateRecipes
CREATE TABLE PrivateRecipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    image TEXT,
    title VARCHAR(255),
    minutes INT,
    popularity INT DEFAULT 0,
    vegan BOOLEAN,
    vegetarian BOOLEAN,
    glutenFree BOOLEAN,
    ingredients JSON,
    instructions JSON
);

-- Create Table: FamilyRecipes
CREATE TABLE FamilyRecipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    recipe_owner VARCHAR(255) NOT NULL,
    custom_time VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    minutes INT NOT NULL,
    vegan BOOLEAN NOT NULL,
    vegetarian BOOLEAN NOT NULL,
    gluten BOOLEAN NOT NULL,
    ingredients JSON NOT NULL,
    instructions JSON NOT NULL
);

-- Create Table: WatchedRecipes
CREATE TABLE WatchedRecipes (
    user_id VARCHAR(255) NOT NULL,
    recipe_id INT NOT NULL,
    watched_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, recipe_id)
);


