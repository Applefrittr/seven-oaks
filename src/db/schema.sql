
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 50 ),
  password VARCHAR ( 254 ),
  email VARCHAR ( 254 ),
  phone VARCHAR ( 10 ),
  email_notifications BOOLEAN,
  admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS guest (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  code VARCHAR (10) UNIQUE,
  assigned BOOLEAN
);

CREATE TABLE IF NOT EXISTS guest_data (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  guest_id INTEGER REFERENCES guest ON DELETE CASCADE,
  name VARCHAR ( 50 ),
  date DATE,
  length INTEGER,
  beverage VARCHAR ( 10 ),
  diet TEXT,
  other TEXT  
);