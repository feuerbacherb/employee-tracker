// required connects
const {
   getAllEmployees,
   getEmployeeNames,
   getAllManagers,
   getManagerIdByName,
   getEmployeeIdByName,
   getEmployeesByManagerName,
   getEmployeesByDept,
   addEmployee,
   updateEmployeeRole,
   updateEmployeeManager
} = require('./db/employeeHandler');
const {
   getAllDepartments,
   getDepartmentNames,
   getDepartmentBudget,
   addDepartment
 } = require('./db/departmentHandler');
const {
   getAllRoles,
   getRoleNames,
   getRoleIdByName,
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

// ADD EMPLOYEE
async function promptAddEmployee() {
   const roles = await getRoleNames();
   const managers = await getAllManagers();
   return inquirer.prompt([
      {
         type: 'input',
         message: 'Enter the first name of the employee:',
         name: 'first_name'
      },
      {
         type: 'input',
         message: 'Enter the last name of the employee:',
         name: 'last_name'
      },
      {
         type: 'list',
         message: 'Choose a role for the employee:',
         name: 'role',
         choices: [
            ...roles
         ]
      },
      {
         type: 'list',
         message: 'Choose the manager for the employee:',
         name: 'manager',
         choices: [
            ...managers
         ]
      }
   ])
}

// UPDATE EMPLOYEE
async function promptUpdateEmployee() {
   const employees = await getEmployeeNames();
   return inquirer.prompt([
      {
         type: 'list',
         message: 'Choose an employee to update:',
         name: 'emp',
         choices: [
            ...employees
         ]
      }
   ])
}

// GET ROLE NAME
async function promptGetNewRole() {
   const roles = await getRoleNames();
   return inquirer.prompt([
      {
         type: 'list',
         message: 'Choose the employee\'s new role',
         name: 'role',
         choices: [
            ...roles
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
            "View Department Budget",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Update Employee Manager",
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
            await getEmployeesByManagerName(manager.manager);
            break;
         }
         case 'View Employees By Department': {
            const deptName = await promptViewEmployeesByDept();
            await getEmployeesByDept(deptName);
            break
         }
         case 'View Department Budget': {
            await getDepartmentBudget();
            break;
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
         case 'Add Employee': {
            const emp = await promptAddEmployee();
            await addEmployee(emp.first_name, emp.last_name, emp.role, emp);
            break;
         }
         case 'Update Employee Role': {
            const empName = await promptUpdateEmployee();
            const empId = await getEmployeeIdByName(empName.emp);
            const newRole = await promptGetNewRole();
            const newRoleId = await getRoleIdByName(newRole.role);
            await updateEmployeeRole(empName.emp, empId, newRole.role, newRoleId);
            break;
         }
         case 'Update Employee Manager': {
            const empName = await promptUpdateEmployee();
            const empId = await getEmployeeIdByName(empName.emp);
            const manager = await promptViewEmployeesByManager();
            const managerId = await getManagerIdByName(manager);
            await updateEmployeeManager(empName.emp, empId, manager.manager, managerId);
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