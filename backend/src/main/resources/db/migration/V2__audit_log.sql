CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,
    action VARCHAR(255),
    entity VARCHAR(255),
    entity_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);