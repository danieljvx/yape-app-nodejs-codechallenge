INSERT INTO transaction_type(name, "createdAt", "updatedAt")
VALUES('Type 1', NOW(), NOW()),
      ('Type 2', NOW(), NOW());


INSERT INTO transaction_status(name, "createdAt", "updatedAt")
VALUES('Pendiente', NOW(), NOW()),
      ('Aprobado', NOW(), NOW()),
      ('Rechazado', NOW(), NOW());