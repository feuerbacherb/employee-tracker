// // required files
const db = require('./dbConnection');
const {
      getAllDepartments,
      getDepartmentNames,
      getDepartmentId,
      addDepartment   
} = require('./departmentHandler');

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

// GET managers
async function getAllManagers() {
   const sql = `
      SELECT CONCAT(last_name, ', ', first_name) AS manager
      FROM employee
      WHERE manager_id IS NULL
      ORDER BY last_name
   `;
   const rows = await db.query(sql);
   const managers = [];
   for (const row of rows) {
      managers.push(row.manager);
   }
   return managers;
}

// GET employee id by name
async function getEmployeeIdByName(name) {
   //console.log(name.manager);
   const sql = `
      SELECT id
      FROM employee
      WHERE CONCAT(last_name, ', ', first_name) = ?
   `;
   const params = [name.manager];
   const row = await db.query(sql, params);
   return row[0].id;
}

// GET employees by manager_id
async function getEmployeesByManagerName(name) {
   const id = await getEmployeeIdByName(name);
   const sql = `
      SELECT
         CONCAT(last_name, ', ', first_name) AS employee,
         r.title
      FROM employee e
      INNER JOIN role r ON e.role_id = r.id
      WHERE e.manager_id = ?
      ORDER BY e.last_name
   `;
   const rows = await db.query(sql, id);
   const employees = [];
   for (const row of rows){
      employees.push(row);
   }
   if (employees.length === 0) {
      console.log('\x1b[1m\x1b[33m%s\x1b[40m\x1b[0m', `There are no employees under ${name.manager}.`);
      return;
   }
   console.table(employees);
}

// GET employees by dept
async function getEmployeesByDept(name) {
   const id = await getDepartmentId(name.dept);
   const sql = `
      SELECT
         CONCAT(e.last_name, ', ', e.first_name) AS employee,
         r.title,
         r.salary
      FROM
         employee e
         INNER JOIN role r ON e.role_id = r.id
         INNER JOIN department d ON r.department_id = d.id
      WHERE
         d.id = 2
      ORDER BY e.last_name
   `;
   const params = [id];
   const rows = await db.query(sql, params);
   const employees = [];
   for (const row of rows) {
      employees.push(row);
   }
   if (employees.length === 0) {
      console.log('\x1b[1m\x1b[33m%s\x1b[40m\x1b[0m', `There are no employees in ${name.dept}.`);
      return;
   }
   console.table(employees);
}

module.exports = {
   getAllEmployees,
   getAllManagers,
   getEmployeesByManagerName,
   getEmployeesByDept
};