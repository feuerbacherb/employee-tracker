// // required files
const db = require('./dbConnection');

// function to get all employees
async function getAllEmployees() {
   const sql = `
   select
      e.id,
      CONCAT(e.last_name, ', ', e.first_name) AS emp_name,
      r.title,
      d.name AS department,
      r.salary,
      CONCAT(m.last_name, ', ', m.first_name) AS manager_name
   from employee AS e
   LEFT JOIN employee AS m ON e.manager_id = m.id
   INNER JOIN role AS r ON e.role_id = r.id
   INNER JOIN department AS d ON r.department_id = d.id
   ORDER BY e.last_name, e.first_name
   `;

   const rows = await db.query(sql);
   const employees = [];
   for (const emp of rows) {
      employees.push(emp);
   }
   console.table(employees);
}

module.exports = getAllEmployees;