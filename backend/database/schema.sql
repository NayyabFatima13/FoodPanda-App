CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS restaurants (
    id INTEGER PRIMARY KEY,

    owner_id INTEGER NOT NULL,

    name VARCHAR(255) NOT NULL,

    cuisine VARCHAR(100) NOT NULL,

    rating DECIMAL(2,1) NOT NULL
        CHECK (rating >= 0 AND rating <= 5),

    delivery_time VARCHAR(100) NOT NULL,

    price DECIMAL(10,2) NOT NULL
        CHECK (price >= 0),

    image TEXT NOT NULL,

    discount VARCHAR(100) NOT NULL,

    description TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_restaurant_owner
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);