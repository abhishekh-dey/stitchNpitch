/*
  # Update Chinthakunta Laxmi prasanna department

  1. Changes
    - Update department from "Sales" to "Sales Department" for Chinthakunta Laxmi prasanna
    - This ensures the winner appears correctly when filtering by Sales Department

  2. Notes
    - Only affects the specific winner record
    - Maintains data integrity while fixing the department filter issue
*/

-- Update the department for Chinthakunta Laxmi prasanna from "Sales" to "Sales Department"
UPDATE winners 
SET department = 'Sales Department'
WHERE name = 'Chinthakunta Laxmi prasanna' 
  AND department = 'Sales';