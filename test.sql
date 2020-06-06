-- GET all the employee information
--
-- select
--    e.id,
--    CONCAT(e.last_name, ', ', e.first_name) AS emp_name,
--    r.title,
--    d.name,
--    r.salary,
--    CONCAT(m.last_name, ', ', m.first_name) AS manager_name
-- from employee AS e
-- LEFT JOIN employee AS m ON e.manager_id = m.id
-- INNER JOIN role AS r ON e.role_id = r.id
-- INNER JOIN department AS d ON r.department_id = d.id
-- ORDER BY e.last_name, e.first_name;


-- GET all the department information
--
-- SELECT
--    *
-- FROM
--    department;


-- GET all the roles
-- SELECT 
--    r.title AS job_title,
--    r.id,
--    d.name AS department,
--    r.salary
-- FROM
--    role r
--    INNER JOIN department d ON r.department_id = d.id;


-- ADD a department
-- INSERT INTO department (name)
-- VALUES ('IP Security');


-- ADD a role
-- INSERT INTO role (title, salary, department_id)
-- VALUES ('Program Manager', '45000', 2);


-- GET all managers
   -- SELECT CONCAT(e.last_name, ', ', e.first_name) AS manager, e.id
   -- FROM employee e
   -- WHERE e.manager_id IS NULL
   -- ORDER BY e.last_name;


-- GET all employees by manager
-- SELECT
--    CONCAT(e.last_name, ', ', e.first_name) AS employee,
--    r.title AS title
-- FROM 
--    employee e
--    INNER JOIN role r ON e.role_id = r.id
-- WHERE
--    e.manager_id = 12;


-- GET all employees by department
-- SELECT
--    CONCAT(e.last_name, ', ', e.first_name) AS employee,
--    r.title,
--    r.salary
-- FROM
--    employee e
--    INNER JOIN role r ON e.role_id = r.id
--    INNER JOIN department d ON r.department_id = d.id
-- WHERE
--    d.id = 2
-- ORDER BY e.last_name;


-- GET budget per department
SELECT
   d.name as department,
   SUM(r.salary) total_salary
FROM 
   employee e
   INNER JOIN role r ON e.role_id = r.id
   INNER JOIN department d ON r.department_id = d.id
GROUP BY
   d.name
ORDER BY
   d.name;