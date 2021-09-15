USE staff_db;


INSERT INTO department (departmen_name)
VALUES ('Sales', 'Finance', 'Engineering')

INSERT INTO role (role_name, department, salary)
VALUES ('Sales Lead', 'Sales representative', 'Account Manager', 'Accountant', 'Lead Engineer', 'Senior Engineer', 'Junior Engineer', 'Customer Service Representative')

INSERT INTO employee (fisrt_name, last_name, title, department, salary, manager)
VALUES ('Serena', 'Joy', 'Account Manager', 'Finance', 60000, 'Fred Waterford')
