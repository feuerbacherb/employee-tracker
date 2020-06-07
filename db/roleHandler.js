// required files
const db = require('./dbConnection');
const {
   getDepartmentId
} = require('./departmentHandler');

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

// GET role titles
async function getRoleNames() {
   const sql = `
      SELECT title
      FROM role
   `;
   const rows = await db.query(sql);
   const roles = [];
   for (const row of rows) {
      roles.push(row.title);
   }
   return roles;
}

// GET role id by name
async function getRoleIdByName(title) {
   const sql = `
      SELECT id
      FROM role
      WHERE title = ?
   `;
   const params = [title];
   console.log(title);
   const rows = await db.query(sql, params);
   const id = rows[0].id;
   return id;
}

// Add new role to the database
async function addRole(obj) {
   // take the information from the prompts and apply it
   // need to grab the deptId first
   const department = await getDepartmentId(obj.roleDepartment);
   
   // set up insert statement based on the supplied information
   const sql = `
      INSERT INTO role (title, salary, department_id)
      VALUES (?,?,?)
   `;
   const params = [obj.roleName, obj.roleSalary, department[0].id];
   const row = await db.query(sql, params);
   console.log('\x1b[1m\x1b[33m%s\x1b[40m\x1b[0m', `${obj.roleName} has been added to the role table.\nChoose View All Roles to see the new role.`);
}

module.exports = {
   getAllRoles,
   getRoleNames,
   getRoleIdByName,
   addRole
};