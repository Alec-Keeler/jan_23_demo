SELECT *
FROM pokemon;

SELECT name, rareness
FROM pokemon;

SELECT * 
FROM pokemon
WHERE name = 'Squirtle';

SELECT * FROM pokemon
WHERE weight > 20;

SELECT * FROM pokemon
WHERE evolves = 1;

SELECT * FROM pokemon
WHERE rareness = 'uncommon' AND NOT evolves = 1;

SELECT height * 1000 AS height_times_1000 FROM pokemon;

DELETE FROM pokemon;

DELETE FROM pokemon
WHERE rareness = 'common';

UPDATE pokemon
SET rarity = 'rare'
WHERE name = 'Onix';

UPDATE pokemon
SET height = height + 1000;
-- WHERE