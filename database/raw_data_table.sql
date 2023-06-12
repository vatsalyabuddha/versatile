-- Table raw_registration

Create table raw_registration
(
	id bigint auto_increment,
    status_id int default 0,
    reg_number varchar(50) not null,
    recipent_id int not null,
    location varchar(50) not null,
    created_date datetime DEFAULT CURRENT_TIMESTAMP,
	updated_date datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);