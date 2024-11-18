
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 50 ),
  password VARCHAR ( 50 ),
  email VARCHAR ( 254 ),
  phone VARCHAR ( 10 )
);

CREATE TABLE IF NOT EXISTS guest (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  code INTEGER UNIQUE,
  assigned BOOLEAN
);

CREATE TABLE IF NOT EXISTS guest_data (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  guest_id INTEGER REFERENCES guest,
  arrival_date DATE,
  stay_length INTEGER,
  beverage VARCHAR ( 10 ),
  text_1 TEXT,
  text_2 TEXT  
);