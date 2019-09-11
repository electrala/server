DROP TABLE IF EXISTS critiques;


CREATE TABLE critiques(id SERIAL PRIMARY KEY,
                                         username TEXT, title TEXT, description TEXT, questions TEXT, genre TEXT, comments TEXT[]);


INSERT INTO critiques (title, description, questions, genre, comments)
VALUES ('Ye who yeeeeeeets',
        'Son in this life you either yeet or get yeeted!',
        'Does this quote truly capture a generation?',
        'vilinry',
        '{"Inserting a fucking array is a nightmare!"}');