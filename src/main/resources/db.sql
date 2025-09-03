create table flask_board_test (
    b_no number(3) primary key,
    b_title varchar2(100 char) not null,
    b_author varchar2(50 char) not null,
    b_date date default sysdate,
    b_content varchar2(1000 char) not null
);

create sequence flask_board_test_seq;

insert into flask_board_test values (flask_board_test_seq.nextval, 'test1', 'writer1', sysdate, 'content1');
insert into flask_board_test values (flask_board_test_seq.nextval, 'test2', 'writer2', sysdate, 'content2');
insert into flask_board_test values (flask_board_test_seq.nextval, 'test3', 'writer3', sysdate, 'content3');

select * from flask_board_test;