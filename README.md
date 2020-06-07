
# Employee Tracker

![](https://img.shields.io/static/v1?label=license&message=MIT&color=green)
  

## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributions](#contributions)
* [Tests](#tests)
* [Contact Me](#contact-me)

## Description
This tool is used to track employees, their managers, their roles, and their departments.  It can be used to change managers and roles, add employees, departments, and roles, and update the employees to new roles and departments.

## Installation
* Clone the Employee-Tracker repository on to a computer that has MySQL installed.  
* Using your favorite terminal application, navigate to the '/db' folder and log in to MySQL.  
* Run 'source schema.sql' to create the database, tables, and dependencies, then run 'source seed.sql' to populate the tables with demo data.  
* Exit back to the terminal prompt and navigate back to the root of employee-tracker, then run 'npm install' to load the dependencies for the application.  
* Type 'npm start' from the root of the employee-tracker folder to start the application.

## Usage
The user can utilize this program to keep track of the hierarchy of their company, including managing titles, departments and employees.  They have the ability to add to each of these, as well as make modification to the roles and managers of the employees.  Finally, the user has a multitude of reporting capabilities available to them in order to monitor these changes.

### Challenges
Deleting departments, roles, and employees was posing a big issues.  It isn't simply just removing the record from the table, but entails moving all the dependencies to a different record.  Since this would make the assignment late, this portion of the application was omitted... also because it was bonus points.

## License
MIT License

Copyright (c) 2020 Brent Feuerbacher

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contributions
I am currently not looking for contributors for this project.

## Tests
In order to test the project make sure that the database is loaded with the demonstration data.  You can then enter each menu and check each item.

## Contact Me
* [Email](mailto:feuerbacherb@gmail.com)

* [GitHub](https://www.github.com/feuerbacherb)
