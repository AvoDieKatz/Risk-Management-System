/* SEED tbl_user */
INSERT INTO tbl_user (id, first_name, last_name, gender, email,
                   username, password, phone, dob,
                   removed, created_at, updated_at, role) VALUES
    (1, 'Tung', 'Tran', 'MALE', 'tung@mail.com',
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