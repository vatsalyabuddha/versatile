-- Table raw_registration

Create table communication_details
(
	id bigint auto_increment,
    status_id int default 0,
    communication_type varchar(50),
    reg_number varchar(50) not null,
    communication_date timestamp default null,
    created_date datetime DEFAULT CURRENT_TIMESTAMP,
	updated_date datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);