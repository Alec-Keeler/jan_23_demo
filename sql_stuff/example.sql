DROP TABLE IF EXISTS pokemon;
DROP TABLE IF EXISTS trainers;

CREATE TABLE pokemon (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    height FLOAT(4, 2) NOT NULL, --1000, 100.9, 10.99, 1.5, 1
    weight FLOAT(5, 2) NOT NULL,
    rarity VARCHAR(30) DEFAULT 'rare',
    evolves BOOLEAN NOT NULL
);

CREATE TABLE trainers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(150) NOT NULL,
    team_size INTEGER NOT NULL,
    gym_badges INTEGER,
    bike BOOLEAN DEFAULT false
);

INSERT INTO pokemon (evolves, rarity, weight, height, name)
VALUES
(true, 'com''mon', 5.5, 0.4, 'Pikachu');

INSERT INTO pokemon (name, height, weight, rarity, evolves)
VALUES
('Squirtle', 0.5, 9.0, 'rare', true),
('millie', .2, 2.2, 'super rare', true),
('Politoed', 1.1, 33.9, 'rare', false),
('Tandemaus', 0.3, 1.8, 'uncommon', true),
('Machamp', 1.6, 130.0, 'normal', false),
('Mudkip', 0.4, 7.6, 'medium rare', true),
('Milotic', 6.2, 162.0, 'rare', false),
('Ralts', 0.4, 6.6, 'rare', true),
('Onix', 8.8, 210.0, 'normal', true),
('Stakataka', 5.5, 820, 'rare', false),
('Piplup', 0.4, 5.2, 'rare', true),
('Altaria', 1.1, 20.6, 'uncommon', false),
('Skitty', 0.6, 11.0, 'common', true);