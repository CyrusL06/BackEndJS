
-- ===================
-- Sellect ALL
-- SELECT * FROM world_food
-- ===================

-- ===================
-- SELECT ONE COLUMS
-- SELECT country from world_food
-- ===================

-- ===================
-- SELECT MULTIPLE COLUMS
-- SELECT country, wheat_production from world_food
-- ===================


-- ===================
-- WHERE CHECK WITH CONDITIONS
-- Use for credits check for an app or token
-- SELECT rice_production from world_food WHERE country = 'United States'
-- ===================


-- ===================
-- WHERE CHECK WITH CONDITIONS with ><<=>=
-- Use for credits check for an app or token
-- Write a query that select the table where to find wheat production greater than 20
-- SELECT country from world_food WHERE wheat_production > 20
-- ===================

-- ===================
-- WHERE LIKE (check matches specific part of data or pattern)
-- Like to check for countries with a for the last letter
-- '<Letter/>' || '%'";
SELECT country FROM world_food WHERE country LIKE '%' || 'a';
-- ===================