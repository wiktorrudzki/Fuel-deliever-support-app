CREATE TABLE Drivers (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(MAX),
    Station NVARCHAR(MAX)
);

CREATE TABLE Stations (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(MAX)
);

CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(MAX),
    LastName NVARCHAR(MAX)
);

CREATE TABLE CurrentFuelVolume (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Pb95 INT NOT NULL,
    Diesel INT NOT NULL,
    Pb98 INT NOT NULL,
    TurboDiesel INT NOT NULL,
    StationId INT NOT NULL,
    FOREIGN KEY (StationId) REFERENCES Stations(Id) ON DELETE CASCADE
);

CREATE TABLE Deliveries (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Pb95 INT NOT NULL,
    Diesel INT NOT NULL,
    Pb98 INT NOT NULL,
    TurboDiesel INT NOT NULL,
    DepartureTime DATETIME2 NOT NULL,
    DriverId INT NOT NULL,
    StationId INT NOT NULL,
    FOREIGN KEY (DriverId) REFERENCES Drivers(Id) ON DELETE CASCADE,
    FOREIGN KEY (StationId) REFERENCES Stations(Id) ON DELETE CASCADE
);

CREATE TABLE DeliveriesPrediction (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    DepartureTime DATETIME2 NOT NULL,
    Pb95 INT NOT NULL,
    Diesel INT NOT NULL,
    Pb98 INT NOT NULL,
    TurboDiesel INT NOT NULL,
    StationId INT NOT NULL,
    FOREIGN KEY (StationId) REFERENCES Stations(Id) ON DELETE CASCADE
);

CREATE TABLE StationsCapacity (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Pb95 INT NOT NULL,
    Diesel INT NOT NULL,
    Pb98 INT NOT NULL,
    TurboDiesel INT NOT NULL,
    StationId INT NOT NULL,
    FOREIGN KEY (StationId) REFERENCES Stations(Id) ON DELETE CASCADE
);

CREATE TABLE Auth (
    UserId INT PRIMARY KEY,
    Login NVARCHAR(MAX),
    Password NVARCHAR(MAX),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- Create Indexes
CREATE UNIQUE INDEX IX_CurrentFuelVolume_StationId ON CurrentFuelVolume (StationId);
CREATE INDEX IX_Deliveries_DriverId ON Deliveries (DriverId);
CREATE INDEX IX_Deliveries_StationId ON Deliveries (StationId);
CREATE UNIQUE INDEX IX_DeliveriesPrediction_StationId ON DeliveriesPrediction (StationId);
CREATE UNIQUE INDEX IX_StationsCapacity_StationId ON StationsCapacity (StationId);

-- Insert stations if not exists
INSERT INTO Stations (Name)
SELECT 'Station A'
WHERE NOT EXISTS (SELECT 1 FROM Stations WHERE Name = 'Station A');

INSERT INTO Stations (Name)
SELECT 'Station B'
WHERE NOT EXISTS (SELECT 1 FROM Stations WHERE Name = 'Station B');

INSERT INTO Stations (Name)
SELECT 'Station C'
WHERE NOT EXISTS (SELECT 1 FROM Stations WHERE Name = 'Station C');

-- Insert drivers if not exists
INSERT INTO Drivers (Name, Station)
SELECT 'John', 'Station A'
WHERE NOT EXISTS (SELECT 1 FROM Drivers WHERE Name = 'John' AND Station = 'Station A');

INSERT INTO Drivers (Name, Station)
SELECT 'Alice', 'Station B'
WHERE NOT EXISTS (SELECT 1 FROM Drivers WHERE Name = 'Alice' AND Station = 'Station B');

INSERT INTO Drivers (Name, Station)
SELECT 'Bob', 'Station C'
WHERE NOT EXISTS (SELECT 1 FROM Drivers WHERE Name = 'Bob' AND Station = 'Station C');

-- Insert users if not exists
INSERT INTO Users (Name, LastName, Email, Password)
SELECT 'John', 'Doe', 'john.doe@example.com', 'password123'
WHERE NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'john.doe@example.com');

INSERT INTO Users (Name, LastName, Email, Password)
SELECT 'Alice', 'Smith', 'alice.smith@example.com', 'qwerty456'
WHERE NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'alice.smith@example.com');

INSERT INTO Users (Name, LastName, Email, Password)
SELECT 'Bob', 'Johnson', 'bob.johnson@example.com', 'securepass789'
WHERE NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'bob.johnson@example.com');

-- Insert deliveries if not exists
INSERT INTO Deliveries (Pb95, Diesel, Pb98, TurboDiesel, DepartureTime, DriverId, StationId)
SELECT 1000, 1500, 800, 1200, GETDATE(), d.Id, s.Id
FROM Drivers d, Stations s
WHERE d.Name = 'John' AND s.Name = 'Station A'
AND NOT EXISTS (SELECT 1 FROM Deliveries WHERE DriverId = d.Id AND StationId = s.Id);

INSERT INTO Deliveries (Pb95, Diesel, Pb98, TurboDiesel, DepartureTime, DriverId, StationId)
SELECT 1000, 1500, 800, 1200, GETDATE(), d.Id, s.Id
FROM Drivers d, Stations s
WHERE d.Name = 'Alice' AND s.Name = 'Station B'
AND NOT EXISTS (SELECT 1 FROM Deliveries WHERE DriverId = d.Id AND StationId = s.Id);

INSERT INTO Deliveries (Pb95, Diesel, Pb98, TurboDiesel, DepartureTime, DriverId, StationId)
SELECT 1000, 1500, 800, 1200, GETDATE(), d.Id, s.Id
FROM Drivers d, Stations s
WHERE d.Name = 'Bob' AND s.Name = 'Station C'
AND NOT EXISTS (SELECT 1 FROM Deliveries WHERE DriverId = d.Id AND StationId = s.Id);

-- Insert delivery predictions if not exists
INSERT INTO DeliveriesPrediction (DepartureTime, Pb95, Diesel, Pb98, TurboDiesel, StationId)
SELECT DATEADD(hour, 3, GETDATE()), 2000, 2500, 1800, 2200, s.Id
FROM Stations s
WHERE s.Name = 'Station A'
AND NOT EXISTS (SELECT 1 FROM DeliveriesPrediction WHERE StationId = s.Id);

INSERT INTO DeliveriesPrediction (DepartureTime, Pb95, Diesel, Pb98, TurboDiesel, StationId)
SELECT DATEADD(hour, 3, GETDATE()), 2000, 2500, 1800, 2200, s.Id
FROM Stations s
WHERE s.Name = 'Station B'
AND NOT EXISTS (SELECT 1 FROM DeliveriesPrediction WHERE StationId = s.Id);

INSERT INTO DeliveriesPrediction (DepartureTime, Pb95, Diesel, Pb98, TurboDiesel, StationId)
SELECT DATEADD(hour, 3, GETDATE()), 2000, 2500, 1800, 2200, s.Id
FROM Stations s
WHERE s.Name = 'Station C'
AND NOT EXISTS (SELECT 1 FROM DeliveriesPrediction WHERE StationId = s.Id);

-- Insert station capacities if not exists
INSERT INTO StationsCapacity (Pb95, Diesel, Pb98, TurboDiesel, StationId)
SELECT 5000, 6000, 4000, 5500, s.Id
FROM Stations s
WHERE s.Name = 'Station A'
AND NOT EXISTS (SELECT 1 FROM StationsCapacity WHERE StationId = s.Id);

INSERT INTO StationsCapacity (Pb95, Diesel, Pb98, TurboDiesel, StationId)
SELECT 5000, 6000, 4000, 5500, s.Id
FROM Stations s
WHERE s.Name = 'Station B'
AND NOT EXISTS (SELECT 1 FROM StationsCapacity WHERE StationId = s.Id);

INSERT INTO StationsCapacity (Pb95, Diesel, Pb98, TurboDiesel, StationId)
SELECT 5000, 6000, 4000, 5500, s.Id
FROM Stations s
WHERE s.Name = 'Station C'
AND NOT EXISTS (SELECT 1 FROM StationsCapacity WHERE StationId = s.Id);

-- Insert current fuel volumes if not exists
INSERT INTO CurrentFuelVolume (Pb95, Diesel, Pb98, TurboDiesel, StationId)
SELECT 3000, 3500, 2500, 3200, s.Id
FROM Stations s
WHERE s.Name = 'Station A'
AND NOT EXISTS (SELECT 1 FROM CurrentFuelVolume WHERE StationId = s.Id);

INSERT INTO CurrentFuelVolume (Pb95, Diesel, Pb98, TurboDiesel, StationId)
SELECT 3000, 3500, 2500, 3200, s.Id
FROM Stations s
WHERE s.Name = 'Station B'
AND NOT EXISTS (SELECT 1 FROM CurrentFuelVolume WHERE StationId = s.Id);

INSERT INTO CurrentFuelVolume (Pb95, Diesel, Pb98, TurboDiesel, StationId)
SELECT 3000, 3500, 2500, 3200, s.Id
FROM Stations s
WHERE s.Name = 'Station C'
AND NOT EXISTS (SELECT 1 FROM CurrentFuelVolume WHERE StationId = s.Id);
