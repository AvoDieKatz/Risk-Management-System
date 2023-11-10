/* SEED tbl_user */
INSERT INTO tbl_user (id, first_name, last_name, gender, email,
                      username, password, phone, dob,
                      removed, created_at, updated_at, role)
VALUES (1, 'Tung', 'Tran', 'MALE', 'tung@mail.com',
        'tungdoe', '$2a$12$4VuBx1.kGOggu0B/kBA0duL9zyjF4.2g5rsCj9rWBLB01L8..TfEm',
        '01234455678', '1999-02-20', FALSE, NOW(), NOW(), 'ADMIN'),
       (2, 'Avo', 'Tran', 'MALE', 'avo@mail.com',
        'avodoe', '$2a$12$4VuBx1.kGOggu0B/kBA0duL9zyjF4.2g5rsCj9rWBLB01L8..TfEm',
        '02234455678', '1999-11-10', FALSE, NOW(), NOW(), 'ANALYST'),
       (3, 'Man', 'Tran', 'MALE', 'man@mail.com',
        'managerdoe', '$2a$12$4VuBx1.kGOggu0B/kBA0duL9zyjF4.2g5rsCj9rWBLB01L8..TfEm',
        '03234455678', '1999-11-10', FALSE, NOW(), NOW(), 'MANAGER'),
       (4, 'Ceo', 'Tran', 'FEMALE', 'ceo@mail.com',
        'ceodoe', '$2a$12$4VuBx1.kGOggu0B/kBA0duL9zyjF4.2g5rsCj9rWBLB01L8..TfEm',
        '04234455678', '1999-11-10', FALSE, NOW(), NOW(), 'OFFICER');


/**
  Seed tbl_thread_category
 */
INSERT INTO tbl_thread_category (category_name)
VALUES ('Cyber'),
       ('Finance'),
       ('Operation');

/**
  Seed tbl_thread
 */
INSERT INTO tbl_thread (title, description, status,
                        category_id, author_id, risk_owner_id,
                        created_at, updated_at)
VALUES ('Bruh', 'Bye', 'IDENTIFIED', 1, 2, 2, SUBDATE(NOW(), 4), SUBDATE(NOW(), 4)),
       ('Nah Jah', 'Nah', 'IDENTIFIED', 1, 2, 2, SUBDATE(NOW(), 3), SUBDATE(NOW(), 3)),
       ('Hi', 'Hehe', 'IDENTIFIED', 1, 2, 2, SUBDATE(NOW(), 2), SUBDATE(NOW(), 2)),
       ('Helo', 'World', 'IDENTIFIED', 1, 2, 2, SUBDATE(NOW(), 1), SUBDATE(NOW(), 1));

/**
  Seed tbl_thread_likelihood
 */
INSERT INTO tbl_thread_likelihood (likelihood, assessor_id, thread_id, updated_at)
VALUES (3, 2, 1, SUBDATE(NOW(), 4)),
       (5, 2, 2, SUBDATE(NOW(), 3)),
       (1, 2, 3, SUBDATE(NOW(), 2)),
       (2, 2, 4, SUBDATE(NOW(), 1)),

       (5, 2, 1, SUBDATE(ADDTIME(NOW(), "2:30"), 3)),
       (3, 2, 2, SUBDATE(ADDTIME(NOW(), "2:15"), 2)),
       (3, 2, 3, SUBDATE(ADDTIME(NOW(), "2:00"), 1)),
       (4, 2, 4, NOW());

/**
  Seed tbl_thread_severity
 */
INSERT INTO tbl_thread_severity (severity, assessor_id, thread_id, updated_at)
VALUES (1, 2, 1, SUBDATE(NOW(), 4)),
       (2, 2, 2, SUBDATE(NOW(), 3)),
       (1, 2, 3, SUBDATE(NOW(), 2)),
       (3, 2, 4, SUBDATE(NOW(), 1)),

       (2, 2, 1, SUBDATE(ADDTIME(NOW(), "2:30"), 3)),
       (3, 2, 2, SUBDATE(ADDTIME(NOW(), "2:30"), 2)),
       (3, 2, 3, SUBDATE(ADDTIME(NOW(), "2:30"), 1)),
       (2, 2, 4, NOW());