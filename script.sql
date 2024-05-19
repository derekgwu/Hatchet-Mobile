



DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
    id int AUTO_INCREMENT primary key,
    article_link varchar(256)
);

INSERT INTO articles (id, article_link) VALUES
('1', 'https://gwhatchet.com/2024/05/13/protest-negotiations-at-standstill-as-students-leave-campus/'),
('2', 'https://gwhatchet.com/2024/05/17/speakers-encourage-gwsb-graduates-to-be-resilient-give-back/'),
('3', 'https://gwhatchet.com/2024/05/13/officials-to-clear-seven-foggy-bottom-homeless-encampment-sites/'),
('4', 'https://gwhatchet.com/2024/05/13/staff-editorial-after-calls-for-police-gw-must-lead-alone-to-heal-campus/');