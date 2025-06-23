-- Updated Database Schema for Vendor Information System

-- Core Tables
CREATE TABLE BusinessUnit (
    BUnitID INT AUTO_INCREMENT PRIMARY KEY,
    BUnitName VARCHAR(255) NOT NULL,
    Location VARCHAR(255)
);

CREATE TABLE Product (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    ProductName VARCHAR(255) NOT NULL,
    ProductType VARCHAR(255),
    ProductPrice DECIMAL(10, 2),
    BUnitID INT,
    FOREIGN KEY (BUnitID) REFERENCES BusinessUnit(BUnitID) ON DELETE SET NULL
);

CREATE TABLE Vendor (
    VendorID INT AUTO_INCREMENT PRIMARY KEY,
    VendorName VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL -- Passwords should be hashed
);

CREATE TABLE AdminOfficer (
    OfficerID INT AUTO_INCREMENT PRIMARY KEY,
    OfficerName VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL, -- Passwords should be hashed
    OfficerEmailAddress VARCHAR(255) UNIQUE,
    OfficerPhoneNo VARCHAR(20)
);

CREATE TABLE Employee (
    EmployeeID INT AUTO_INCREMENT PRIMARY KEY,
    EmployeeName VARCHAR(255) NOT NULL,
    EmployeeEmailAddress VARCHAR(255) UNIQUE,
    EmployeeOnboardDate DATE,
    OfficerID INT, -- Supervising Officer
    FOREIGN KEY (OfficerID) REFERENCES AdminOfficer(OfficerID) ON DELETE SET NULL
);

-- Specialization & Junction Tables
CREATE TABLE Standalone (
    BUnitID INT PRIMARY KEY,
    RentDueDate DATE,
    FOREIGN KEY (BUnitID) REFERENCES BusinessUnit(BUnitID) ON DELETE CASCADE
);

CREATE TABLE SBUSection (
    BUnitID INT PRIMARY KEY,
    SBUType VARCHAR(255),
    FOREIGN KEY (BUnitID) REFERENCES BusinessUnit(BUnitID) ON DELETE CASCADE
);

CREATE TABLE VendorBusinessUnitRegistration (
    RegistrationID INT AUTO_INCREMENT PRIMARY KEY,
    VendorID INT,
    BUnitID INT,
    OfficerID INT,
    RegistrationDate DATE,
    FOREIGN KEY (VendorID) REFERENCES Vendor(VendorID) ON DELETE CASCADE,
    FOREIGN KEY (BUnitID) REFERENCES BusinessUnit(BUnitID) ON DELETE CASCADE,
    FOREIGN KEY (OfficerID) REFERENCES AdminOfficer(OfficerID) ON DELETE SET NULL
);

-- New table for managing user sessions
CREATE TABLE Sessions (
    SessionToken VARCHAR(255) PRIMARY KEY,
    UserID INT NOT NULL,
    UserRole ENUM('admin', 'vendor') NOT NULL,
    ExpiresAt DATETIME NOT NULL
);

-- Users table for authentication (retained and adapted)
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL, -- Note: Passwords should be hashed
    Role ENUM('admin', 'vendor') NOT NULL,
    VendorID INT,
    FOREIGN KEY (VendorID) REFERENCES Vendor(VendorID) ON DELETE SET NULL
);

-- -- Vendors table
-- CREATE TABLE Vendors (
--     VendorID INT AUTO_INCREMENT PRIMARY KEY,
--     VendorName VARCHAR(255) NOT NULL,
--     Email VARCHAR(255) UNIQUE NOT NULL,
--     PhoneNumber VARCHAR(20)
-- );

-- -- Business Units table, linked to Vendors
-- CREATE TABLE BusinessUnit (
--     BUnitID INT AUTO_INCREMENT PRIMARY KEY,
--     BUnitName VARCHAR(255) NOT NULL,
--     Location VARCHAR(255),
--     VendorID INT,
--     FOREIGN KEY (VendorID) REFERENCES Vendors(VendorID) ON DELETE CASCADE
-- );

-- -- Products table, linked to Business Units
-- CREATE TABLE Product (
--     ProductID INT AUTO_INCREMENT PRIMARY KEY,
--     ProductName VARCHAR(255) NOT NULL,
--     Price DECIMAL(10, 2),
--     Category VARCHAR(255),
--     BUnitID INT NOT NULL,
--     FOREIGN KEY (BUnitID) REFERENCES BusinessUnit(BUnitID) ON DELETE CASCADE
-- );

-- -- Managers table, linked to Business Units
-- CREATE TABLE Manager (
--     ManagerID INT AUTO_INCREMENT PRIMARY KEY,
--     ManagerName VARCHAR(255) NOT NULL,
--     BUnitID INT,
--     FOREIGN KEY (BUnitID) REFERENCES BusinessUnit(BUnitID) ON DELETE SET NULL
-- ); 