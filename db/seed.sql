USE cms;

INSERT INTO department (name)
VALUES
   ('Sales'),
   ('Information Technology'),
   ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES
   ('Sales Manager', 75000, 1),
   ('Salesperson', 35000, 1),
   ('IT Manager', 85000, 2),
   ('DBA', 50000, 2),
   ('UI', 45000, 2),
   ('Engineer', 60000, 2),
   ('HR Manager', 45000, 3),
   ('Accounts Receivable', 30000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
   ('Abram', 'Duchamps', 1, null),
   ('Naja', 'Ripley', 2, 1),
   ('Cyrano', 'Kolen', 2, 1),
   ('Andrea', 'Paulinues', 2, 1),

   ('Sunil', 'Yosjioka', 3, null),
   ('Larisa', 'Benedetti', 4, 5),
   ('Ismet', 'Cuidighthigh', 4, 5),
   ('Eusebio', 'Andreas', 5, 5),
   ('Keiko', 'Dukes', 5, 5),
   ('Pyrrhos', 'Hendry', 6, 5),
   ('Keren', 'Kastner', 6, 5),

   ('Uttara', 'Nilsson', 7, null),
   ('Emelrich', 'Haugen', 8, 7);
