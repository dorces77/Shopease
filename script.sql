-- Create calculate_total_sales function
CREATE OR REPLACE FUNCTION calculate_total_sales(start_date DATE, end_date DATE)
RETURNS DECIMAL AS $$
DECLARE
    total_sales DECIMAL;
BEGIN
    SELECT SUM(total_price) INTO total_sales
    FROM orders
    WHERE order_date BETWEEN start_date AND end_date;
    
    RETURN total_sales;
END;
$$ LANGUAGE plpgsql;

-- Create inventory table 
CREATE TABLE inventory (
    product_id INT PRIMARY KEY,
    quantity INT NOT NULL
);

-- Insert initial inventory data 
INSERT INTO inventory (product_id, quantity) VALUES
(1, 100),
(2, 150),
(3, 200);

-- Create update_inventory function
CREATE OR REPLACE FUNCTION update_inventory()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE inventory
    SET quantity = quantity - NEW.quantitys
    WHERE product_id = NEW.product_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create after_order_insert trigger
CREATE TRIGGER after_order_insert
AFTER INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION update_inventory();

-- Example queries for performance analysis
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 1;
EXPLAIN ANALYZE SELECT calculate_total_sales('2024-01-01', '2024-07-01');
