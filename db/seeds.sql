USE staff_db;

INSERT INTO departments (dep_name)
VALUES ('Sales Lead'), 
('Sales Representative'), 
('Account Manager'), 
('Accountant'), 
('Lead Engineer'), 
('Senior Engineer'), 
('Junior Engineer'), 
('Customer Service Representative')

INSERT INTO roles (title, dep_id, salary)
VALUES ('Sales', 1, 60000)

INSERT INTO employees (fisrt_name, last_name, title, manager_id)
VALUES ('Serena', 'Joy', 3, 1)


