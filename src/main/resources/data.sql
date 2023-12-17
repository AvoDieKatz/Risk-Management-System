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

INSERT INTO tbl_thread_category (category_name) VALUES
                                ('Technical'),
                                ('Financial'),
                                ('Schedule'),
                                ('Market'),
                                ('Security'),
                                ('Regulatory'),
                                ('Stakeholder'),
                                ('Resource'),
                                ('Scope Creep'),
                                ('Reputation');


/**
  Seed tbl_thread
 */
INSERT INTO tbl_thread (title, description, status,
                        category_id, author_id, risk_owner_id,
                        created_at, updated_at)
VALUES ('Software bugs or compatibility problems', 'There is a possibility of encountering technical issues during the development process, such as software bugs or compatibility problems. These technical challenges can lead to delays in project timelines and impact the overall quality of the product.', 'RESOLVED', 1, 2, 2, SUBDATE(NOW(), 10), SUBDATE(NOW(), 10)),
       ('Insufficient funding or unexpected expenses', 'Inadequate financial resources or unexpected expenses may impact the project''s budget and financial stability. This can result in delays, compromised quality, or even project termination due to the inability to meet financial obligations.', 'IDENTIFIED', 2, 2, 2, SUBDATE(NOW(), 3), SUBDATE(NOW(), 3)),
       ('Delays in project timelines', 'Unexpected events, dependencies on external factors, or resource constraints can cause delays in project timelines. These delays can disrupt the project''s progress, impact deliverables, and lead to increased costs.', 'ACTIVE', 3, 5, 5, SUBDATE(NOW(), 2), SUBDATE(NOW(), 2)),
       ('Low demand or market saturation', 'The risk of low market demand or market saturation poses a threat to the success of the product. Factors such as changing consumer preferences, intense competition, or economic downturns can negatively impact sales and profitability.', 'ACTIVE', 4, 5, 5, SUBDATE(NOW(), 1), SUBDATE(NOW(), 1)),
       ('Data breaches and unauthorized access', 'Vulnerabilities in the system can expose sensitive data to breaches and unauthorized access. This risk compromises the integrity and confidentiality of information, leading to reputational damage, legal consequences, and financial losses.', 'IDENTIFIED', 5, 2, 2, SUBDATE(NOW(), 4), SUBDATE(NOW(), 4)),
       ('Non-compliance with legal requirements', 'Failure to comply with applicable regulations and legal requirements can result in penalties, fines, or legal actions against the project. This risk can disrupt project activities, damage reputation, and incur significant financial liabilities.', 'ACTIVE', 6, 5, 5, SUBDATE(NOW(), 3), SUBDATE(NOW(), 3)),
       ('Conflicts and disagreements among stakeholders', 'Conflicts or disagreements among stakeholders, such as project team members, clients, or management, can hinder decision-making processes and project progress. These conflicts may lead to delays, compromised project outcomes, or even project failure.', 'ACTIVE', 7, 2, 2, SUBDATE(NOW(), 2), SUBDATE(NOW(), 2)),
       ('Limited availability of skilled resources', 'The scarcity of skilled resources or key team members leaving the project can negatively impact its execution. This risk can result in delays, reduced productivity, increased workload on remaining team members, and compromised project quality.', 'IDENTIFIED', 8, 5, 5, SUBDATE(NOW(), 1), SUBDATE(NOW(), 1)),
       ('Uncontrolled expansion of project scope', 'Expanding the project scope without proper control or management can lead to scope creep. This risk causes delays, increased costs, and challenges in meeting project objectives within the defined timeline and budget.', 'REJECTED', 9, 2, 2, SUBDATE(NOW(), 3), SUBDATE(NOW(), 3)),
       ('Negative publicity and customer dissatisfaction', 'Negative publicity, customer dissatisfaction, or poor quality deliverables can damage the project''s reputation and future prospects. This risk can result in loss of customer trust, decreased market share, and potential business opportunities.', 'ACTIVE', 10, 5, 5, SUBDATE(NOW(), 2), SUBDATE(NOW(), 2)),

       ('Data loss due to hardware failure', 'The risk of data loss due to hardware failure exists. This can result in the loss of important project data and information. Adequate backup and recovery processes should be in place to mitigate this risk.', 'IDENTIFIED', 1, 2, 2, SUBDATE(NOW(), 2), SUBDATE(NOW(), 2)),
       ('Inadequate communication and coordination', 'Lack of effective communication and coordination among team members can lead to misunderstandings, delays, and compromised project outcomes. Clear communication channels and regular team meetings should be established to minimize this risk.', 'ACTIVE', 7, 2, 2, SUBDATE(NOW(), 3), SUBDATE(NOW(), 3)),
       ('Scope creep due to changing requirements', 'Changing requirements without proper control and management can result in scope creep. This risk can lead to delays, increased costs, and challenges in meeting project objectives. A change management process should be implemented to mitigate this risk.', 'ACTIVE', 9, 5, 5, SUBDATE(NOW(), 4), SUBDATE(NOW(), 4)),
       ('Inadequate stakeholder engagement', 'Insufficient engagement and involvement of stakeholders can lead to misunderstandings, conflicts, and delays. Effective stakeholder management and regular communication should be prioritized to mitigate this risk.', 'ACTIVE', 7, 2, 2, SUBDATE(NOW(), 5), SUBDATE(NOW(), 5)),
       ('Technological obsolescence', 'The risk of technological obsolescence exists as new technologies emerge and existing ones become outdated. Regular technology assessments and updates should be conducted to mitigate this risk and ensure the project stays current.', 'REJECTED', 1, 2, 2, SUBDATE(NOW(), 6), SUBDATE(NOW(), 6)),
       ('Vendor or supplier failure', 'Dependence on vendors or suppliers can pose a risk if they fail to meet their obligations. Backup options and contingency plans should be in place to minimize the impact of vendor or supplier failures on the project.', 'IDENTIFIED', 8, 2, 2, SUBDATE(NOW(), 2), SUBDATE(NOW(), 2)),
       ('Lack of stakeholder buy-in', 'The lack of stakeholder buy-in can hinder project progress and decision-making. Engaging stakeholders early on, addressing their concerns, and obtaining their support are crucial to mitigate this risk.', 'ACTIVE', 7, 5, 5, SUBDATE(NOW(), 3), SUBDATE(NOW(), 3)),
       ('Inadequate risk assessment and management', 'Failure to conduct thorough risk assessments and implement effective risk management strategies can leave the project vulnerable to unforeseen risks. Proper risk assessment and management protocols should be in place to mitigate this risk.', 'ACTIVE', 1, 5, 5, SUBDATE(NOW(), 4), SUBDATE(NOW(), 4)),
       ('Team member turnover', 'High turnover rates among team members can disrupt project continuity and lead to knowledge gaps. Effective team retention strategies and knowledge transfer processes should be implemented to mitigate the risk of team member turnover.', 'ACTIVE', 8, 2, 2, SUBDATE(NOW(), 5), SUBDATE(NOW(), 5)),
       ('Ineffective project communication', 'Ineffective project communication can result in misunderstandings, delays, and inefficiencies. Clear communication channels, regular updates, and effective communication tools should be utilized to mitigate this risk.', 'RESOLVED', 7, 5, 5, SUBDATE(NOW(), 6), SUBDATE(NOW(), 6));

-- VALUES ('Thread 0', 'Lorem ipsum', 'IDENTIFIED', 1, 2, 2, SUBDATE(NOW(), 10), SUBDATE(NOW(), 10)),
--        ('Reputation on Facebook', 'Lorem ipsum', 'IDENTIFIED', 1, 2, 2, SUBDATE(NOW(), 3), SUBDATE(NOW(), 3)),
--        ('Financial Risk', 'Lorem ipsum', 'IDENTIFIED', 3, 5, 5, SUBDATE(NOW(), 2), SUBDATE(NOW(), 2)),
--        ('Supply chain interruption', 'Lorem ipsum', 'IDENTIFIED', 1, 5, 5, SUBDATE(NOW(), 1), SUBDATE(NOW(), 1)),
--
--        ('Talent retention issue', 'Lorem ipsum', 'ACTIVE', 3, 2, 2, SUBDATE(NOW(), 4), SUBDATE(NOW(), 4)),
--        ('Code quality', 'Lorem ipsum', 'ACTIVE', 1, 5, 5, SUBDATE(NOW(), 3), SUBDATE(NOW(), 3)),
--        ('Legal issues', 'Lorem ipsum', 'ACTIVE', 3, 2, 2, SUBDATE(NOW(), 2), SUBDATE(NOW(), 2)),
--        ('Lost of assets', 'Lorem ipsum', 'ACTIVE', 3, 5, 5, SUBDATE(NOW(), 1), SUBDATE(NOW(), 1)),
--
--        ('Changes in government rules', 'Lorem ipsum', 'REJECTED', 3, 2, 2, SUBDATE(NOW(), 3), SUBDATE(NOW(), 3)),
--        ('Bad weather', 'Lorem ipsum', 'REJECTED', 3, 5, 5, SUBDATE(NOW(), 2), SUBDATE(NOW(), 2));


INSERT INTO tbl_thread_feedback (content, approval, reviewer_id, thread_id, created_at)
--     VALUES ('LGTM!', true, 3, 5,  SUBDATE(ADDTIME(NOW(), "4:00"), 3)),
--            ('LGTM!', true, 3, 6,  SUBDATE(ADDTIME(NOW(), "3:46"), 3)),
--            ('LGTM!', true, 3, 7,  SUBDATE(ADDTIME(NOW(), "2:39"), 1)),
--            ('LGTM!', true, 3, 8,  SUBDATE(ADDTIME(NOW(), "3:08"), 1)),
--            ('Need more revision', false, 3, 9,  SUBDATE(ADDTIME(NOW(), "1:18"), 2)),
--            ('Not feasible', false, 3, 10,  SUBDATE(ADDTIME(NOW(), "3:31"), 1));
VALUES ('The risk of software bugs or compatibility problems is a valid concern and can have a significant impact on project timelines and product quality. The assessment of a likelihood of 3 and severity of 1 reflects the understanding that these issues may occur but are not likely to have a severe impact.', true, 3, 1, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 1), '02:00:00')),
--     ('Insufficient funding or unexpected expenses can indeed jeopardize a project, leading to delays and compromised quality. The likelihood of 2 and severity of 2 suggest that while there is a possibility of facing this risk, it may not have a severe impact.', true, 3, 2, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 2), '02:00:00')),
       ('Delays in project timelines due to unexpected events or resource constraints are common risks. The likelihood of 4 and severity of 3 indicate that this risk is highly probable and can have a moderate impact on the project.', true, 3, 3, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 3), '03:10:40')),
       ('Low demand or market saturation can be a significant risk, especially in a competitive market. The likelihood of 3 and severity of 4 highlight the potential impact this risk can have on sales and profitability.', true, 3, 4, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 4), '01:34:00')),
--     ('Data breaches and unauthorized access pose a significant threat to the project and its stakeholders. The likelihood of 5 and severity of 5 reflect the understanding that this risk is highly probable and can have severe consequences, including reputational damage and financial losses.', true, 3, 5, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 5), '02:00:00')),
       ('Non-compliance with legal requirements can have serious implications for the project, including penalties and reputational damage. The likelihood of 5 and severity of 1 suggest that this risk is highly probable but may not have a severe impact.', true, 3, 6, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 6), '02:02:01')),
       ('Conflicts and disagreements among stakeholders can significantly hinder project progress and outcomes. The likelihood of 5 and severity of 2 indicate that this risk is highly probable and can have a moderate impact on the project.', true, 3, 7, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 7), '02:20:54')),
--     ('Limited availability of skilled resources is a common risk that can affect project execution. The likelihood of 5 and severity of 3 suggest that this risk is highly probable and can have a moderate impact on the project.', true, 3, 8, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 8), '02:00:00')),
       ('Uncontrolled expansion of project scope can lead to scope creep and impact project objectives. The likelihood of 5 and severity of 4 highlight the potential consequences of this risk, including delays and increased costs.', false, 3, 9, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 9), '04:31:31')),
       ('Negative publicity and customer dissatisfaction can have a severe impact on the project''s reputation and future prospects. The likelihood of 5 and severity of 5 indicate that this risk is highly probable and can have severe consequences, including loss of trust and business opportunities.', true, 3, 10, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 10), '01:02:20')),

--     ('The risk of data loss due to hardware failure is a valid concern and should be mitigated by implementing adequate backup and recovery processes. The likelihood of 3 and severity of 1 indicate that while this risk may occur, it is not likely to have a severe impact.', true, 3, 11, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 11), '03:14:59')),
       ('Inadequate communication and coordination among team members can lead to misunderstandings and delays. The likelihood of 2 and severity of 2 suggest that while this risk may occur, it may not have a severe impact on the project.', true, 3, 12, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 12), '02:45:30')),
       ('Scope creep due to changing requirements can pose a significant risk to project timelines and objectives. The likelihood of 4 and severity of 3 indicate that this risk is highly probable and can have a moderate impact.', true, 3, 13, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 13), '04:59:01')),
       ('Inadequate stakeholder engagement can hinder project progress and decision-making processes. The likelihood of 3 and severity of 4 suggest that while this risk may occur, it can have a significant impact on the project.', true, 3, 14, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 14), '01:23:45')),
       ('Technological obsolescence can pose a risk to the project as new technologies emerge and existing ones become outdated. The likelihood of 5 and severity of 5 indicate that this risk is highly probable and can have severe consequences, including the need for significant updates and adjustments.', false, 3, 15, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 15), '12:34:56')),
--     ('Vendor or supplier failure can disrupt project progress and deliverables. The likelihood of 5 and severity of 1 reflect the understanding that this risk is highly probable but may not have a severe impact on the project.', true, 3, 16, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 16), '23:59:59')),
       ('Lack of stakeholder buy-in can hinder project progress and decision-making processes. The likelihood of 5 and severity of 2 indicate that this risk is highly probable and can have a moderate impact.', true, 3, 17, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 17), '00:01:01')),
       ('Inadequate risk assessment and management can leave the project vulnerable to unforeseen risks. The likelihood of 5 and severity of 3 suggest that this risk is highly probable and can have a moderate impact on the project.', true, 3, 18, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 18), '05:45:15')),
       ('Team member turnover can disrupt project continuity and lead to knowledge gaps. The likelihood of 5 and severity of 4 highlight the potential impact this risk can have on the project.', true, 3, 19, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 19), '07:30:20')),
       ('Ineffective project communication can result in misunderstandings and inefficiencies. The likelihood of 5 and severity of 5 indicate that this risk is highly probable and can have severe consequences, including delays and compromised project outcomes.', true, 3, 20, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 20), '10:15:25'));



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
       (4, 5, 8, NOW()),

       (1, 2, 9, SUBDATE(NOW(), 3)),
       (4, 5, 10, SUBDATE(NOW(), 2)),


       (3, 2, 11, SUBDATE(NOW(), 2)),
       (2, 2, 12, SUBDATE(NOW(), 3)),
       (4, 5, 13, SUBDATE(NOW(), 4)),
       (3, 2, 14, SUBDATE(NOW(), 5)),
       (5, 2, 15, SUBDATE(NOW(), 6)),
       (5, 2, 16, SUBDATE(NOW(), 2)),
       (5, 5, 17, SUBDATE(NOW(), 3)),
       (5, 5, 18, SUBDATE(NOW(), 4)),
       (5, 2, 19, SUBDATE(NOW(), 5)),
       (5, 5, 20, SUBDATE(NOW(), 6));


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
       (3, 5, 8, NOW()),

       (2, 2, 9, SUBDATE(NOW(), 3)),
       (3, 5, 10, SUBDATE(NOW(), 2)),

       (1, 2, 11, SUBDATE(NOW(), 2)),
       (2, 2, 12, SUBDATE(NOW(), 3)),
       (3, 5, 13, SUBDATE(NOW(), 4)),
       (4, 2, 14, SUBDATE(NOW(), 5)),
       (5, 2, 15, SUBDATE(NOW(), 6)),
       (1, 2, 16, SUBDATE(NOW(), 2)),
       (2, 5, 17, SUBDATE(NOW(), 3)),
       (3, 5, 18, SUBDATE(NOW(), 4)),
       (4, 2, 19, SUBDATE(NOW(), 5)),
       (5, 5, 20, SUBDATE(NOW(), 6));

/**
  Seed tbl_solution
 */
INSERT INTO tbl_solution (content, type, accepted, thread_id, author_id, created_at, updated_at)
VALUES ('To mitigate the risk of software bugs or compatibility problems, it is essential to implement regular code reviews and testing processes. This will help identify and fix any issues before they impact the project timelines and product quality.', 'MITIGATE', false, 1, 2, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 1), '01:12:34'), ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 1), '01:12:34')),
       ('In order to address the risk of insufficient funding or unexpected expenses, it is recommended to allocate a contingency budget. This will help ensure that the project remains financially stable and can overcome any unexpected financial challenges.', 'TRANSFER', false, 2, 2, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 2), '02:34:56'), ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 2), '02:34:56')),
       ('To mitigate the risk of delays in project timelines, it is advisable to implement agile project management methodologies. This will enable better management of project timelines and provide flexibility to address any potential delays effectively.', 'MITIGATE', false, 3, 5, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 3), '03:45:15'), ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 3), '03:45:15')),
       ('Implement agile project management methodologies to better manage project timelines and address potential delays. This will enable better prioritization of tasks, frequent reassessment of project plans, and efficient allocation of resources to minimize the impact of delays. Regular communication and collaboration among team members and stakeholders will also help in identifying and resolving any issues that may cause delays.', 'ACCEPT', false, 3, 5, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 3), '03:55:15'), ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 3), '03:55:15')),
       ('To address the risk of low demand or market saturation, conducting comprehensive market research and analysis is crucial. This will help identify demand trends and develop strategies to adapt to changing market conditions.', 'AVOID', false, 4, 2, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 4), '04:56:34'), ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 4), '04:56:34')),
       ('To mitigate the risk of data breaches and unauthorized access, implementing robust security measures and protocols is essential. This includes establishing secure systems and ensuring regular security audits to protect sensitive data.', 'MITIGATE', false, 5, 2, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 5), '06:07:08'), ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 5), '06:07:08')),
       ('To ensure compliance with legal requirements and regulations, it is important to establish a dedicated compliance team. This team will be responsible for monitoring and ensuring adherence to all applicable laws throughout the project.', 'AVOID', false, 6, 5, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 6), '07:29:30'), ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 6), '07:29:30')),
       ('To mitigate conflicts and disagreements among stakeholders, promoting effective communication and conflict resolution strategies is essential. This can be achieved through regular stakeholder meetings, open lines of communication, and establishing a collaborative environment.', 'MITIGATE', false, 7, 5, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 7), '08:50:52'), ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 7), '08:50:52')),
       ('To address the limited availability of skilled resources, investing in training and development programs is recommended. This will help enhance the skills and knowledge of the existing team members and ensure the availability of skilled resources for the project.', 'MITIGATE', false, 8, 2, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 8), '10:12:13'), ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 8), '10:12:13')),
       ('To control and manage project scope effectively, implementing a change management process is crucial. This process will help ensure that any changes to the project scope are properly evaluated, approved, and managed to avoid scope creep.', 'MITIGATE', false, 9, 5, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 9), '11:34:35'), ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 9), '11:34:35')),
       ('To ensure high-quality deliverables and customer satisfaction, implementing a robust quality assurance process is recommended. This includes regular quality checks, testing, and feedback loops to address any potential issues or concerns.', 'MITIGATE', false, 10, 5, ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 10), '13:56:57'), ADDTIME((SELECT created_at FROM tbl_thread WHERE id = 10), '13:56:57'));


/**
  Seed tbl_thread_comment
 */
INSERT INTO tbl_thread_comment (content, author_id, thread_id, created_at, updated_at)
VALUES ('The risk of software bugs or compatibility problems is a valid concern and can have a significant impact on project timelines and product quality.', 3, 1, ADDTIME((SELECT created_at from tbl_thread where id = 1), '02:15:43'), ADDTIME((SELECT created_at from tbl_thread where id = 1), '02:15:43')),
       ('Another potential issue to consider is the lack of proper documentation, which can lead to confusion and delays in the development process.', 2, 1, ADDTIME((SELECT created_at from tbl_thread where id = 1), '03:45:12'), ADDTIME((SELECT created_at from tbl_thread where id = 1), '03:45:12')),
       ('It is important to allocate sufficient time for testing and quality assurance to catch any potential issues before they impact the project.', 4, 1, ADDTIME((SELECT created_at from tbl_thread where id = 1), '05:30:20'), ADDTIME((SELECT created_at from tbl_thread where id = 1), '05:30:20')),

        ('Insufficient funding or unexpected expenses can indeed jeopardize a project, leading to delays and compromised quality.', 4, 2, ADDTIME((SELECT created_at from tbl_thread where id = 2), '08:10:15'), ADDTIME((SELECT created_at from tbl_thread where id = 2), '08:10:15')),
        ('To mitigate this risk, it may be necessary to secure additional funding sources or revise the project budget.', 1, 2, ADDTIME((SELECT created_at from tbl_thread where id = 2), '10:25:30'), ADDTIME((SELECT created_at from tbl_thread where id = 2), '10:25:30')),
        ('Regular financial monitoring and frequent communication with stakeholders can help identify and address any unexpected financial challenges.', 5, 2, ADDTIME((SELECT created_at from tbl_thread where id = 2), '12:45:50'), ADDTIME((SELECT created_at from tbl_thread where id = 2), '12:45:50')),

        ('Delays in project timelines due to unexpected events or resource constraints are common risks.', 1, 3, ADDTIME((SELECT created_at from tbl_thread where id = 3), '14:20:10'), ADDTIME((SELECT created_at from tbl_thread where id = 3), '14:20:10')),
        ('It is important to have contingency plans in place and maintain open communication with team members and stakeholders to address any potential delays.', 3, 3, ADDTIME((SELECT created_at from tbl_thread where id = 3), '16:35:25'), ADDTIME((SELECT created_at from tbl_thread where id = 3), '16:35:25')),
        ('Resource allocation and workload management should be carefully planned to minimize the risk of delays.', 2, 3, ADDTIME((SELECT created_at from tbl_thread where id = 3), '18:55:40'), ADDTIME((SELECT created_at from tbl_thread where id = 3), '18:55:40')),

        ('Low demand or market saturation can be a significant risk, especially in a competitive market.', 2, 4, ADDTIME((SELECT created_at from tbl_thread where id = 4), '21:10:55'), ADDTIME((SELECT created_at from tbl_thread where id = 4), '21:10:55')),
        ('To mitigate this risk, conducting market research and identifying unique selling points can help attract customers and differentiate from competitors.', 4, 4, ADDTIME((SELECT created_at from tbl_thread where id = 4), '23:30:10'), ADDTIME((SELECT created_at from tbl_thread where id = 4), '23:30:10')),
        ('Effective marketing strategies and customer engagement can also help create demand and mitigate the impact of market saturation.', 1, 4, ADDTIME((SELECT created_at from tbl_thread where id = 4), '01:45:25'), ADDTIME((SELECT created_at from tbl_thread where id = 4), '01:45:25')),

        ('Data breaches and unauthorized access pose a significant threat to the project and its stakeholders.', 5, 5, ADDTIME((SELECT created_at from tbl_thread where id = 5), '04:00:40'), ADDTIME((SELECT created_at from tbl_thread where id = 5), '04:00:40')),
        ('Implementing strong security measures, including encryption and access controls, can help mitigate the risk of data breaches.', 3, 5, ADDTIME((SELECT created_at from tbl_thread where id = 5), '06:20:55'), ADDTIME((SELECT created_at from tbl_thread where id = 5), '06:20:55')),
        ('Regular security audits and employee training on cyber security best practices are also important to maintain data integrity.', 2, 5, ADDTIME((SELECT created_at from tbl_thread where id = 5), '08:40:10'), ADDTIME((SELECT created_at from tbl_thread where id = 5), '08:40:10')),

        ('Non-compliance with legal requirements can have serious implications for the project.', 3, 6, ADDTIME((SELECT created_at from tbl_thread where id = 6), '11:00:25'), ADDTIME((SELECT created_at from tbl_thread where id = 6), '11:00:25')),
        ('To ensure compliance, it is necessary to stay updated with relevant laws and regulations and seek legal advice if needed.', 1, 6, ADDTIME((SELECT created_at from tbl_thread where id = 6), '13:20:40'), ADDTIME((SELECT created_at from tbl_thread where id = 6), '13:20:40')),
        ('Establishing internal processes and documentation to track compliance can help mitigate the risk of non-compliance.', 4, 6, ADDTIME((SELECT created_at from tbl_thread where id = 6), '15:40:55'), ADDTIME((SELECT created_at from tbl_thread where id = 6), '15:40:55')),

        ('Conflicts and disagreements among stakeholders can significantly hinder project progress and outcomes.', 4, 7, ADDTIME((SELECT created_at from tbl_thread where id = 7), '18:00:10'), ADDTIME((SELECT created_at from tbl_thread where id = 7), '18:00:10')),
        ('Open and transparent communication, active listening, and conflict resolution techniques can help manage and resolve stakeholder conflicts.', 5, 7, ADDTIME((SELECT created_at from tbl_thread where id = 7), '20:20:25'), ADDTIME((SELECT created_at from tbl_thread where id = 7), '20:20:25')),
        ('Establishing a clear decision-making process and involving stakeholders in key decisions can also help prevent conflicts.', 2, 7, ADDTIME((SELECT created_at from tbl_thread where id = 7), '22:40:40'), ADDTIME((SELECT created_at from tbl_thread where id = 7), '22:40:40')),

        ('Limited availability of skilled resources is a common risk that can affect project execution.', 1, 8, ADDTIME((SELECT created_at from tbl_thread where id = 8), '01:00:55'), ADDTIME((SELECT created_at from tbl_thread where id = 8), '01:00:55')),
        ('Investing in training and development programs can help enhance the skills and knowledge of existing team members.', 3, 8, ADDTIME((SELECT created_at from tbl_thread where id = 8), '03:20:10'), ADDTIME((SELECT created_at from tbl_thread where id = 8), '03:20:10')),
        ('Building relationships with external contractors or consultants can also provide access to additional skilled resources.', 5, 8, ADDTIME((SELECT created_at from tbl_thread where id = 8), '05:40:25'), ADDTIME((SELECT created_at from tbl_thread where id = 8), '05:40:25')),

        ('Uncontrolled expansion of project scope can lead to scope creep and impact project objectives.', 2, 9, ADDTIME((SELECT created_at from tbl_thread where id = 9), '08:00:40'), ADDTIME((SELECT created_at from tbl_thread where id = 9), '08:00:40')),
        ('Establishing a change management process and conducting regular scope reviews can help mitigate the risk of scope creep.', 4, 9, ADDTIME((SELECT created_at from tbl_thread where id = 9), '10:20:55'), ADDTIME((SELECT created_at from tbl_thread where id = 9), '10:20:55')),
        ('Clearly defining project scope and obtaining stakeholder approval can also help prevent uncontrolled expansion.', 1, 9, ADDTIME((SELECT created_at from tbl_thread where id = 9), '12:40:10'), ADDTIME((SELECT created_at from tbl_thread where id = 9), '12:40:10')),

        ('Lorem ipsum dolor sit amet.', 3, 10, ADDTIME((SELECT created_at from tbl_thread where id = 10), '15:00:25'), ADDTIME((SELECT created_at from tbl_thread where id = 10), '15:00:25')),
        ('Consectetur adipiscing elit.', 2, 10, ADDTIME((SELECT created_at from tbl_thread where id = 10), '17:20:40'), ADDTIME((SELECT created_at from tbl_thread where id = 10), '17:20:40')),
        ('Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 1, 10, ADDTIME((SELECT created_at from tbl_thread where id = 10), '19:40:55'), ADDTIME((SELECT created_at from tbl_thread where id = 10), '19:40:55'))
