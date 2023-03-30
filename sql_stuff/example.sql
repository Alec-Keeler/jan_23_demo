PRAGMA FOREIGN_KEYS = 1;
DROP TABLE IF EXISTS pokemon_trainers;
DROP TABLE IF EXISTS pokemon;
DROP TABLE IF EXISTS trainers;
DROP TABLE IF EXISTS rarity;

CREATE TABLE rarity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value VARCHAR(30) NOT NULL UNIQUE,
    encounter_chance FLOAT(4, 2)  -- 50.76
);

CREATE TABLE pokemon (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    height FLOAT(4, 2) NOT NULL, --1000, 100.9, 10.99, 1.5, 1
    weight FLOAT(5, 2) NOT NULL,
    evolves BOOLEAN NOT NULL,
    -- rarity_id INTEGER,
    -- FOREIGN KEY (rarity_id) REFERENCES rarity(id)
    rarity_id INTEGER REFERENCES rarity(id) ON DELETE SET NULL
);

CREATE TABLE trainers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(150) NOT NULL,
    gym_badges INTEGER,
    bike BOOLEAN DEFAULT false
);

CREATE TABLE pokemon_trainers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trainer_id INTEGER REFERENCES trainers(id) ON DELETE CASCADE,
    pokemon_id INTEGER REFERENCES pokemon(id) ON DELETE CASCADE
);

INSERT INTO rarity (value, encounter_chance)
VALUES
('common', 90.0),
('uncommon', 75.8),
('rare', 40.34),
('legendary', 15.01),
('mythical', 2);

INSERT INTO pokemon (evolves, rarity_id, weight, height, name)
VALUES
(true, 1, 5.5, 0.4, 'Pikachu');

INSERT INTO pokemon (name, height, weight, rarity_id, evolves)
VALUES
('Squirtle', 0.5, 9.0, 3, true),
('millie', .2, 2.2, 5, true),
('Politoed', 1.1, 33.9, 3, false),
('Tandemaus', 0.3, 1.8, 2, true),
('Machamp', 1.6, 130.0, 1, false),
('Mudkip', 0.4, 7.6, 4, true),
('Milotic', 6.2, 162.0, 3, false),
('Ralts', 0.4, 6.6, 3, true),
('Onix', 8.8, 210.0, 1, true),
('Stakataka', 5.5, 820, 3, false),
('Piplup', 0.4, 5.2, 3, true),
('Altaria', 1.1, 20.6, 2, false),
('Skitty', 0.6, 11.0, 1, true);

INSERT INTO trainers (name, gym_badges, bike)
VALUES
('Dan', 4, 1),
('Franco', 5, 0),
('Olivia', 8, 1);

INSERT INTO pokemon_trainers (trainer_id, pokemon_id)
VALUES
(1, 2),
(1, 6),
(1, 8),
(2, 1),
(2, 3),
(2, 7),
(3, 9),
(3, 12),
(3, 6);