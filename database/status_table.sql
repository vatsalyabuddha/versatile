-- Table status

Create table status
(
	id bigint auto_increment,
    status_name varchar(50) not null,
    created_date datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);