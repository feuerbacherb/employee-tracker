// required files
const db = require('./dbConnection');
const {
   getDepartmentId
} = require('./deparmentHandler');

// GET all roles
async function getAllRoles() {
   const sql = `
      SELECT 
         r.title AS job_title,
         r.id,
         d.name AS department,
         r.salary
      FROM
         role r
         INNER JOIN department d ON r.department_id = d.id
   `;

   const rows = await db.query(sql);
   const roles = [];
   for (const role of rows) {
      roles.push(role);
   }
   console.table(roles);
}

async function addRole(obj) {
   const deptId = 
   console.log(obj);
}

module.exports = {
   getAllRoles,
   addRole
};