/* SEED tbl_user */
INSERT INTO tbl_user (id, first_name, last_name, gender, email,
                      username, password, phone, dob,
                      removed, created_at, updated_at, role)
VALUES (1, 'Tung', 'Tran', 'MALE', 'tung@mail.com',
        'tungdoe', '$2a$12$4VuBx1.kGOggu0B/kBA0duL9zyjF4.2g5rsCj9rWBLB01L8..TfEm',
        '01234455670', '1999-02-20', FALSE, NOW(), NOW(), 'ADMIN'),
       (2, 'Avo', 'Tran', 'OTHERS', 'avo@mail.com',
        'avodoe', '$2a$12$4VuBx1.kGOggu0B/kBA0duL9zyjF4.2g5rsCj9rWBLB01L8..TfEm',
        '02234455987', '1999-11-10', FALSE, NOW(), NOW(), 'ANALYST'),
       (3, 'Man', 'Tran', 'MALE', 'man@mail.com',
        'managerdoe', '$2a$12$4VuBx1.kGOggu0B/kBA0duL9zyjF4.2g5rsCj9rWBLB01L8..TfEm',
        '03234133678', '1999-11-10', FALSE, NOW(), NOW(), 'MANAGER'),
       (4, 'Ceo', 'Tran', 'FEMALE', 'ceo@mail.com',
        'ceodoe', '$2a$12$4VuBx1.kGOggu0B/kBA0duL9zyjF4.2g5rsCj9rWBLB01L8..TfEm',
        '04234412278', '1999-11-10', FALSE, NOW(), NOW(), 'OFFICER'),
       (5, 'Ana', 'Tran', 'FEMALE', 'ana@mail.com',
        'anadoe', '$2a$12$4VuBx1.kGOggu0B/kBA0duL9zyjF4.2g5rsCj9rWBLB01L8..TfEm',
        '04234455699', '1999-11-10', FALSE, NOW(), NOW(), 'ANALYST');


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
VALUES ('Thread 0', 'Lorem ipsum', 'IDENTIFIED', 1, 2, 2, SUBDATE(NOW(), 10), SUBDATE(NOW(), 10)),
       ('Reputation on Facebook', 'Lorem ipsum', 'IDENTIFIED', 1, 2, 2, SUBDATE(NOW(), 3), SUBDATE(NOW(), 3)),
       ('Financial Risk', 'Lorem ipsum', 'IDENTIFIED', 3, 5, 5, SUBDATE(NOW(), 2), SUBDATE(NOW(), 2)),
       ('Supply chain interruption', 'Lorem ipsum', 'IDENTIFIED', 1, 5, 5, SUBDATE(NOW(), 1), SUBDATE(NOW(), 1)),

       ('Talent retention issue', 'Lorem ipsum', 'ACTIVE', 3, 2, 2, SUBDATE(NOW(), 4), SUBDATE(NOW(), 4)),
       ('Code quality', 'Lorem ipsum', 'ACTIVE', 1, 5, 5, SUBDATE(NOW(), 3), SUBDATE(NOW(), 3)),
       ('Legal issues', 'Lorem ipsum', 'ACTIVE', 3, 2, 2, SUBDATE(NOW(), 2), SUBDATE(NOW(), 2)),
       ('Lost of assets', 'Lorem ipsum', 'ACTIVE', 3, 5, 5, SUBDATE(NOW(), 1), SUBDATE(NOW(), 1));

--        ('Legal issues', 'Lorem ipsum', 'REJECTED', 3, 2, 2, SUBDATE(NOW(), 2), SUBDATE(NOW(), 2)),
--        ('Lost of assets', 'Lorem ipsum', 'REJECTED', 3, 5, 5, SUBDATE(NOW(), 1), SUBDATE(NOW(), 1));

/**
  Seed tbl_thread_likelihood
 */
INSERT INTO tbl_thread_likelihood (likelihood, assessor_id, thread_id, updated_at)
VALUES (3, 2, 1, SUBDATE(NOW(), 10)),
       (5, 2, 2, SUBDATE(NOW(), 3)),
       (1, 5, 3, SUBDATE(NOW(), 2)),
       (2, 5, 4, SUBDATE(NOW(), 1)),
       (5, 2, 5, SUBDATE(NOW(), 4)),
       (1, 5, 6, SUBDATE(NOW(), 3)),
       (3, 2, 7, SUBDATE(NOW(), 2)),
       (4, 5, 8, SUBDATE(NOW(), 1)),

       (5, 2, 1, SUBDATE(ADDTIME(NOW(), "2:30"), 10)),
       (3, 2, 2, SUBDATE(ADDTIME(NOW(), "2:15"), 2)),
       (3, 5, 3, SUBDATE(ADDTIME(NOW(), "2:00"), 1)),
       (4, 5, 4, NOW()),
       (5, 2, 5, SUBDATE(ADDTIME(NOW(), "2:30"), 3)),
       (2, 5, 6, SUBDATE(ADDTIME(NOW(), "2:15"), 2)),
       (2, 2, 7, SUBDATE(ADDTIME(NOW(), "2:00"), 1)),
       (4, 5, 8, NOW());


/**
  Seed tbl_thread_severity
 */
INSERT INTO tbl_thread_severity (severity, assessor_id, thread_id, updated_at)
VALUES (1, 2, 1, SUBDATE(NOW(), 10)),
       (2, 2, 2, SUBDATE(NOW(), 3)),
       (2, 5, 3, SUBDATE(NOW(), 2)),
       (3, 5, 4, SUBDATE(NOW(), 1)),
       (3, 2, 5, SUBDATE(NOW(), 4)),
       (1, 5, 6, SUBDATE(NOW(), 3)),
       (4, 2, 7, SUBDATE(NOW(), 2)),
       (2, 5, 8, SUBDATE(NOW(), 1)),


       (2, 2, 1, SUBDATE(ADDTIME(NOW(), "2:30"), 10)),
       (3, 2, 2, SUBDATE(ADDTIME(NOW(), "2:30"), 2)),
       (4, 5, 3, SUBDATE(ADDTIME(NOW(), "2:30"), 1)),
       (2, 5, 4, NOW()),
       (3, 2, 5, SUBDATE(ADDTIME(NOW(), "2:30"), 3)),
       (1, 5, 6, SUBDATE(ADDTIME(NOW(), "2:30"), 2)),
       (3, 2, 7, SUBDATE(ADDTIME(NOW(), "2:30"), 1)),
       (3, 5, 8, NOW());