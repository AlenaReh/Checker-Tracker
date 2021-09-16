USE staff_db;

INSERT INTO departments (dep_name)
VALUES ('Sales'), ('finance'), ('engineering');

INSERT INTO roles (title, salary, dep_id)
VALUES 
('Sales Lead', 60000, 1),
('Sales Representative', 50000, 1),
('Account Manager', 30000, 2),
('Accountant', 20000, 2),
('Lead Engineer', 70000, 3), 
('Senior Engineer', 55000, 3), 
('Junior Engineer', 45000, 3) ,
('CS Representative', 45000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Serena', 'Joy', 2, null);