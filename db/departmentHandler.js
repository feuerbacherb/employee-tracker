// required files
const db = require('./dbConnection');

// function to get all departments
async function getAllDepartments() {
   const sql = `
   SELECT
      id,
      name AS department
   FROM
      department
   `;

   const rows = await db.query(sql);
   const departments = [];
   for (const dept of rows) {
      departments.push(dept);
   }
   console.table(departments);
}

// function to get department name
async function getDepartmentNames() {
   const sql = `
      SELECT
         name
      FROM
         department
   `;

   const rows = await db.query(sql);
   const departments = [];
   for (const dept of rows) {
      departments.push(dept);
   }
   return departments;
}

// function to get department id
async function getDepartmentId(name) {
   const sql = `
      SELECT
         id
      FROM
         department
      WHERE name = ?
   `;
   const params = [name];

   const deptId = await db.query(sql, params);
   const id = [];
   for (const row of deptId) {
      id.push(row);
   }
   return id[0].id;
}

// GET department budget
async function getDepartmentBudget() {
   const sql = `
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
         d.name
   `;

   const rows = await db.query(sql);
   const depts = [];
   for (const row of rows) {
      depts.push(row);
   }
   console.table(depts);
}

// function to add department
async function addDepartment(obj) {
   // extract the new department from the object
   const name = obj.deptName;
   const sql = `
      INSERT INTO department (name)
      VALUES (?)
   `;
   const params = [name];
   const rows = await db.query(sql, params);
   console.log('\x1b[1m\x1b[33m%s\x1b[40m\x1b[0m', `Successfully added ${name} into department`);
}

module.exports = {
   getAllDepartments,
   getDepartmentNames,
   getDepartmentId,
   getDepartmentBudget,
   addDepartment
};