CREATE TABLE compliance_record (
    id SERIAL PRIMARY KEY,
    
    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    status VARCHAR(50) NOT NULL,
    priority VARCHAR(50),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    ai_description TEXT,
    ai_recommendation TEXT,
    
    created_by VARCHAR(100)
);

CREATE INDEX idx_status ON compliance_record(status);
CREATE INDEX idx_priority ON compliance_record(priority);