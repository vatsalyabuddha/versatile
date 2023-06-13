-- Motor Details

Create table motor_details
(
	id bigint auto_increment,
    registration_number varchar(50) not null,
    maker_model varchar(100),
    insurance_status int,
    owner_name varchar(100),
    rto_code varchar(50),
	rto_name varchar(50),
	rto_city_id varchar(50),
	rto_city_name varchar(50),
	rto_state_id varchar(50),
	rto_state_name varchar(50),
    registration_date datetime,
    insurance_upto datetime,
    fitness_upto datetime,
    is_communication_required boolean default false,
    status_id int default 0,
    created_date datetime DEFAULT CURRENT_TIMESTAMP,
	updated_date datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

--- update table
ALTER TABLE motor_details ADD  make_name varchar(50) default NULL;
ALTER TABLE motor_details ADD  model_name varchar(50) default NULL;
ALTER TABLE motor_details ADD  fuel_type varchar(50) default NULL
