INSERT INTO department(names)
    VALUES  ("Sales"),
            ("Legal"),
            ("Engineering"),
            ("Finance"),
            ("Marketing");

INSERT INTO roles (title, salary, department_id)
    VALUES  ("Accountant", 100000, 4),
            ("Software Engineer", 130000, 3),
            ("Legal Team Lead", 240000, 2),
            ("Lawyer", 200000, 2),
            ("Social Media Specialist", 110000, 5),
            ("Chief Marketing Officer", 180000, 5),
            ("Sales Lead", 100000, 1),
            ("Salesperson", 80000, 1),
            ("Lead Engineer", 160000, 3),
            ("Accountant Manager", 130000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES  ("Mike","Tyson", 7, NULL),
            ("Mickey","Mouse", 5, 1),
            ("Tony","Hawk", 1, 1),
            ("Giannis","Antetokounmpo", 6, NULL),
            ("Zach","Braff", 4, NULL),
            ("Donald","Faison", 3, 5),
            ("Lebron","James", 2, 4),
            ("Khris","Middleton", 10, 4),
            ("Astro","World", 8, NULL),
            ("Travis","Scott", 7, 9);
            
            