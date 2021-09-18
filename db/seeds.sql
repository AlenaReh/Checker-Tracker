USE staff_db;

INSERT INTO departments (dep_name)
VALUES ('Sales'), ('Finance'), ('Engineering');

INSERT INTO roles (title, salary, dep_id)
VALUES 
('Sales Lead', 60000, 1),
('Sales Representative', 50000, 1),
('Account Manager', 40000, 2),
('Accountant', 30000, 2),
('Lead Engineer', 70000, 3), 
('Senior Engineer', 55000, 3), 
('Junior Engineer', 45000, 3) ,
('CS Representative', 40000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('Serena', 'Joy', 2, 1),
('Nick', 'Blaine', 3, 2),
('Luke', 'Bankole', 1, 2),
('June', 'Osborne', 3, null),
('Mark', 'Tuello', 2, 1),
('Naomi', 'Putnam', 1, 2),
('Eden', 'Blaine', 3, 2),
('Joseph', 'Lawrence', 3, 2);


