// required connects
const {
   getAllEmployees,
   getAllManagers,
   getEmployeesByManagerName,
   getEmployeesByDept
} = require('./db/employeeHandler');
const {
   getAllDepartments,
   getDepartmentNames,
   addDepartment
 } = require('./db/departmentHandler');
const {
   getAllRoles,
   addRole
} = require('./db/roleHandler');
const inquirer = require('inquirer');

/**
 *  PROMPT SECTION
 */

// VIEW EMPLOYEES BY MANAGER
async function promptViewEmployeesByManager() {
   const managers = await getAllManagers();
   return inquirer.prompt([
      {
         type: 'list',
         message: 'Choose a manager to see their employees',
         name: 'manager',
         choices: [
            ...managers
         ]
      }
   ])
}

// VIEW EMPLOYEES BY DEPARTMENT
async function promptViewEmployeesByDept() {
   const depts = await getDepartmentNames();
   return inquirer.prompt([
      {
         type: 'list',
         message: 'Choose a department',
         name: 'dept',
         choices: [
            ...depts
         ]
      }
   ])
}

// ADD DEPARTMENT
async function promptAddDepartment() {
   return inquirer.prompt([
      {
         type: 'input',
         message: 'Enter the name of the new department: ',
         name: 'deptName'
      }
   ])
}

// ADD ROLE
async function promptAddRole() {
   const departments = await getDepartmentNames();
   return inquirer.prompt([
      {
         type: 'input',
         message: 'Enter the name of the new role: ',
         name: 'roleName'
      },
      {
         type: 'input',
         message: 'Enter the salary for this role: ',
         name: 'roleSalary'
      },
      {
         type: 'list',
         message: 'Choose which department this role falls under:',
         name: 'roleDepartment',
         choices: [
            // list of departments
            ...departments
         ]
      }
   ])
}


// this is the first prompt the users encounter and acts like the main menu
async function mainPrompt() {
   return inquirer.prompt([
      {
         type: 'list',
         message: 'What would you like to do?',
         name: 'process',
         choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "View Employees By Manager",
            "View Employees By Department",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Exit"
         ]
      }
   ])
}

async function init() {
   let loop = false;
   while (!loop) {
      const prompt = await mainPrompt();

      switch(prompt.process) {
         case 'View All Departments': {
            await getAllDepartments();
            break;
         }
         case 'View All Roles': {
            await getAllRoles();
            break;
         }
         case 'View All Employees': {
            await getAllEmployees();
            break;
         }
         case 'View Employees By Manager': {
            const manager = await promptViewEmployeesByManager();
            await getEmployeesByManagerName(manager);
            break;
         }
         case 'View Employees By Department': {
            const deptName = await promptViewEmployeesByDept();
            await getEmployeesByDept(deptName);
            break
         }
         case 'Add Department': {
            const deptName = await promptAddDepartment();
            await addDepartment(deptName);
            break;
         }
         case 'Add Role': {
            const newRole = await promptAddRole();
            await addRole(newRole);
            break;
         }
         case 'Exit': {
            exitLoop = true;
            process.exit(0);
            return;
         }
      }
   }
}

init();