USE staff_db;

INSERT INTO department (dep_name)
VALUES ('Sales Lead'), ('Sales Representative'), ('Account Manager'), ('Accountant'), ('Lead Engineer'), ('Senior Engineer'), ('Junior Engineer'), ('Customer Service Representative')

INSERT INTO role (title, dep_id, salary)
VALUES ('Sales', 'Finance', 'Engineering')

INSERT INTO employee (fisrt_name, last_name, title, manager_id)
VALUES ('Serena', 'Joy', 'Account Manager', 'Fred Waterford')
