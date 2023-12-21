CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS shopping_list_item (
    uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    amount TEXT,
    done BOOLEAN,
    name TEXT
);

CREATE TABLE IF NOT EXISTS shopping_list (
    uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    notify TIMESTAMP,
    -- list reference to schema shopping_list_item
    list UUID [] NOT NULL REFERENCES shopping_list_item(uuid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS favorites (
    uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    receiptId UUID,
    -- Adjust the data type accordingly
    name TEXT,
    image TEXT -- Adjust the data type accordingly
);

CREATE TABLE IF NOT EXISTS prediction_image (
    uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    image TEXT,
    -- Adjust the data type accordingly
    name TEXT
);