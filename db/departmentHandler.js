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
async function getDepartmentId(id) {
   const sql = `
      SELECT
         id
      FROM
         department
      WHERE name = ?
   `;
   const params = [id];

   const deptId = await db.query(sql, params);
   return deptId;
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
   console.log(`Successfully added ${name} into department`);
}

module.exports = {
   getAllDepartments,
   getDepartmentNames,
   getDepartmentId,
   addDepartment
};