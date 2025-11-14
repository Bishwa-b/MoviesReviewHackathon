Create database Movie_Reviews;

use Movie_Reviews

create table users (
       user_id  int primary key auto_increment,
       first_name varchar(50),
       last_name varchar(50),
       email varchar(50) unique key,
       password  varchar(50),
       mobile varchar(50),
       birth date
);

create table reviews(
    id  int primary key auto_increment,
    movie_id int,
    review text,
    rating int,
    user_id int,
    modified timestamp,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

create table movies (
    m_id int primary key auto_increment,
    title varchar(50),
    r_date date
);

create table shares(
    review_id int,
    user_id int
);

INSERT INTO users ( first_name, last_name, email, password, mobile, birth) VALUES
( 'Alice', 'Smith', 'alice.smith@example.com', 'pass123', '123-456-7890', '1990-05-15'),
( 'Bob', 'Johnson', 'bob.johnson@example.com', 'securepwd', '098-765-4321', '1985-11-22'),
( 'Charlie', 'Brown', 'charlie.brown@example.com', 'mysecret', '555-123-4567', '1992-03-01');


INSERT INTO movies ( title, r_date) VALUES
( 'The Great Adventure', '2023-01-20'),
('Mystery of the Old House', '2022-07-10'),
( 'Sci-Fi Odyssey', '2024-02-28');

INSERT INTO reviews ( movie_id, review, rating, user_id, modified) VALUES
( 1, 'A truly captivating adventure film!', 9, 1, '2024-10-26 10:00:00'),
( 2, 'The plot was a bit slow, but the ending was surprising.', 7, 2, '2024-10-27 14:30:00'),
( 1, 'Enjoyed it immensely, great visuals.', 8, 3, '2024-10-28 09:15:00'),
( 3, 'A mind-bending journey through space and time.', 10, 1, '2024-10-29 11:45:00');


INSERT INTO shares (review_id, user_id) VALUES
(1, 2),
(1, 3),
(2, 1),
(3, 2);