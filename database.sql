CREATE TABLE admin (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

INSERT INTO admin (id, name,password) VALUES
(1, 'govind', 'govind@123'),
(2, 'sahil', 'sahil@123'),
(3, 'vinayak', 'vinayak@123'),
(4, 'virendra', 'virendra@123');

select * from employee

CREATE TABLE employee(
	employee_id INT PRIMARY KEY,
	name varchar(50) NOT NULL,	
	email varchar(50) NOT NULL,
	valid_upto timestamp NOT NULL,
	dob timestamp NOT NULL,
	address varchar(50) NOT NULL,
	phone varchar(50) NOT NULL,
    password varchar(50) NOT NULL
);

INSERT INTO employee (employee_id, name, valid_upto, dob, address, phone, email, password) VALUES
(1, 'alan', '13-12-2020', '23-12-2000', 'Delhi India', '9800000000','alan@gmail.com','alan@123'),
(2, 'alice', '02-02-2024', '23-12-2001', 'Bangalore India', '9078943210','alice@gmail.com','alice@123'),
(3, 'Bob', '03-02-2025', '23-12-2002', 'Gurgoan India', '9999999999', 'bob@gmail.com','bob@123'),
(4, 'Ken', '07-08-2026', '23-12-1998', 'Gwalior India', '8043687431', 'ken@gmail.com','ken@123'),
(5, 'Eve', '30-11-2023', '15-05-1995', 'Mumbai India', '7890123456', 'eve@gmail.com','eve@123'),
(6, 'Charlie', '18-06-2025', '20-08-1990', 'Hyderabad India', '8765432109', 'charlie@gmail.com','charlie@123');

CREATE TABLE drug (
    company_name VARCHAR(50) NOT NULL,
    drug_name VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    code VARCHAR(50) NOT NULL,
    batch_no VARCHAR(50) NOT NULL,
    selling_price DOUBLE PRECISION NOT NULL,
    expiry timestamp NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (company_name, code, batch_no)
);

INSERT INTO drug (company_name, drug_name, type, code, batch_no, selling_price, expiry, quantity)
VALUES
('CompanyA', 'Drug1', 'TypeA', 'ABC123', 'BATCH001', 25.5, '03-03-2024', 100),
('CompanyA', 'Drug2', 'TypeB', 'DEF456', 'BATCH002', 30.0, '10-12-2023', 150),
('CompanyB', 'Drug3', 'TypeC', 'GHI789', 'BATCH003', 15.75, '05-05-2025', 80),
('CompanyB', 'Drug4', 'TypeA', 'JKL012', 'BATCH004', 18.2, '15-08-2024', 120),
('CompanyC', 'Drug5', 'TypeB', 'MNO345', 'BATCH005', 22.8, '20-06-2023', 90),
('CompanyC', 'Drug6', 'TypeC', 'PQR678', 'BATCH006', 12.5, '08-04-2025', 200),
('CompanyD', 'Drug7', 'TypeA', 'STU901', 'BATCH007', 27.4, '02-11-2023', 110),
('CompanyD', 'Drug8', 'TypeB', 'VWX234', 'BATCH008', 33.6, '25-09-2024', 70),
('CompanyE', 'Drug9', 'TypeC', 'YZA567', 'BATCH009', 16.9, '12-07-2025', 180),
('CompanyE', 'Drug10', 'TypeA', 'BCD890', 'BATCH010', 20.3, '28-01-2024', 130);

select * from drug
 

CREATE TABLE sales (	 
	customer_id SERIAL PRIMARY KEY,
    customer VARCHAR(50) NOT NULL,
	company_name VARCHAR(50) NOT NULL,
    drug_name VARCHAR(50) NOT NULL,    
    type VARCHAR(50) NOT NULL,
    code VARCHAR(50) NOT NULL,
	batch_no VARCHAR(50) NOT NULL,
    selling_price DOUBLE PRECISION NOT NULL, 
    quantity INT NOT NULL,
    date timestamp NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    employee_id INT NOT NULL
);

CREATE TABLE sales_buffer (	 
    customer_id SERIAL PRIMARY KEY,
    customer VARCHAR(50) NOT NULL,
	company_name VARCHAR(50) NOT NULL,
    drug_name VARCHAR(50) NOT NULL,    
    type VARCHAR(50) NOT NULL,
    code VARCHAR(50) NOT NULL,
	batch_no VARCHAR(50) NOT NULL,
    selling_price DOUBLE PRECISION NOT NULL, 
    quantity INT NOT NULL,
    date timestamp NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    employee_id INT NOT NULL 
);
 
-- Trigger functions 
-- trigger 1
CREATE OR REPLACE FUNCTION delete_expired_drugs()
RETURNS TRIGGER AS $$
BEGIN
  -- Print the SQL statement for debugging
  RAISE NOTICE 'Deleting expired drugs: %', 'DELETE FROM drug WHERE expiry < CURRENT_TIMESTAMP';

  -- Delete rows if drugs are expired
  DELETE FROM drug
  WHERE expiry < CURRENT_TIMESTAMP; 

  RETURN NEW; -- Return NEW to indicate that the trigger should proceed with the original operation
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_delete_expired_drugs
BEFORE INSERT OR UPDATE OR DELETE ON drug
FOR EACH ROW
EXECUTE FUNCTION delete_expired_drugs();


-- Trigger 2
CREATE OR REPLACE FUNCTION delete_empty_quantity_drugs()
RETURNS TRIGGER AS $$
BEGIN
  -- Print the SQL statement for debugging
  RAISE NOTICE 'Deleting drugs with quantity <= 0: %', 'DELETE FROM drug WHERE quantity <= 0';

  -- Delete rows if quantity is less than or equal to 0
  DELETE FROM drug
  WHERE quantity <= 0;

  RETURN NEW; -- Return NEW to indicate that the trigger should proceed with the original operation
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_delete_empty_quantity_drugs
BEFORE INSERT OR UPDATE OR DELETE ON drug
FOR EACH ROW
EXECUTE FUNCTION delete_empty_quantity_drugs();



-- Trigger 3
-- Create a function to update drug quantity
CREATE OR REPLACE FUNCTION update_drug_quantity()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the updated quantity will be non-negative
    IF NEW.quantity < 0 THEN
        RAISE EXCEPTION 'Invalid quantity. Quantity cannot be decreased.';
    END IF;

    -- Update the drug quantity based on the sales record
    UPDATE drug
    SET quantity = quantity - NEW.quantity
    WHERE code = NEW.code;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to execute the function after insert on the sales table
CREATE TRIGGER sales_after_insert
AFTER INSERT ON sales
FOR EACH ROW
EXECUTE FUNCTION update_drug_quantity();

-- Trigger 3
-- Create a trigger function if quantity enter is invalid
CREATE OR REPLACE FUNCTION before_update_drug_quantity()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the new quantity is non-negative
    IF NEW.quantity < 0 THEN
        RAISE EXCEPTION 'Invalid quantity. Quantity cannot be negative.';
    END IF;

    -- Check if the updated quantity is less than or equal to the current quantity
    IF NEW.quantity < OLD.quantity THEN
        RAISE EXCEPTION 'Invalid quantity. Quantity cannot be decreased.';
    END IF;

    -- If all checks pass, return NEW to allow the update
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the trigger function before an update on the drug table
CREATE TRIGGER before_update_drug_quantity_trigger
BEFORE UPDATE ON drug
FOR EACH ROW
EXECUTE FUNCTION before_update_drug_quantity();


--  Trigger 4 
-- Trigger for checking the validity of an employee's license before inserting into the sales table
CREATE OR REPLACE FUNCTION check_license_validity()
RETURNS TRIGGER AS $$
DECLARE
    ex_date DATE;
BEGIN
    -- Fetch the expiration date of the employee's license
    SELECT DATE(valid_upto) INTO ex_date
    FROM employee
    WHERE employee_id = NEW.employee_id;

    -- Check if the expiration date is valid
    IF ex_date >= CURRENT_DATE THEN
        -- License is valid, allow the insert
        RETURN NEW;
    ELSE
        -- License is expired, prevent the insert and raise a notice
        RAISE EXCEPTION 'Employee license expired. Insert into sales table is not allowed.';
    END IF;
END;
$$ LANGUAGE plpgsql; 
-- Create the trigger for sales_license_check
CREATE TRIGGER sales_license_check
BEFORE INSERT ON sales
FOR EACH ROW
EXECUTE FUNCTION check_license_validity();

-- trigger 5
--  Create a trigger to automatically remove data from sales_buffer when inserting into sales
CREATE OR REPLACE FUNCTION remove_data_from_sales_buffer()
RETURNS TRIGGER AS $$
BEGIN
    -- Delete the corresponding entry from sales_buffer
    DELETE FROM sales_buffer
    WHERE customer = NEW.customer AND date = NEW.date;

    RETURN NEW; -- Return NEW to indicate that the trigger should proceed with the original operation
END;
$$ LANGUAGE plpgsql;

-- Create the trigger for removing data from sales_buffer when inserting into sales
CREATE TRIGGER trigger_remove_data_from_sales_buffer
AFTER INSERT ON sales
FOR EACH ROW
EXECUTE FUNCTION remove_data_from_sales_buffer();

 
select * from admin
select * from employee
select * from drug
select * from sales_buffer
select * from sales 