
CREATE SEQUENCE transaction_type_id_seq;

CREATE TABLE transaction_type (
   id          INTEGER          NOT NULL DEFAULT nextval('transaction_type_id_seq'),
   name        VARCHAR(10)      NOT NULL,
   createdAt   TIMESTAMP        NOT NULL,
   updatedAt   TIMESTAMP        NOT NULL,
   PRIMARY KEY (id)
);


ALTER SEQUENCE transaction_type_id_seq OWNED BY transaction_type.id;

INSERT INTO transaction_type(name, "createdAt", "updatedAt")
VALUES('Type 1', NOW(), NOW()),
      ('Type 2', NOW(), NOW());

CREATE SEQUENCE transaction_status_id_seq;

CREATE TABLE transaction_status (
   id          INTEGER          NOT NULL DEFAULT nextval('transaction_status_id_seq'),
   name        VARCHAR(10)      NOT NULL,
   createdAt   TIMESTAMP        NOT NULL,
   updatedAt   TIMESTAMP        NOT NULL,
   PRIMARY KEY (id)
);

ALTER SEQUENCE transaction_status_id_seq OWNED BY transaction_status.id;

INSERT INTO transaction_status(name, "createdAt", "updatedAt")
VALUES('Pendiente', NOW(), NOW()),
      ('Aprobado', NOW(), NOW()),
      ('Rechazado', NOW(), NOW());

CREATE SEQUENCE transaction_id_seq;

CREATE TABLE transaction (
   id                   INTEGER       NOT NULL DEFAULT nextval('transaction_id_seq'),
   value                INTEGER       NOT NULL,
   credit               VARCHAR(5)    NOT NULL,
   debit                VARCHAR(5)    NOT NULL,
   transactionTypeId    INTEGER       NOT NULL,
   transactionStatusId  INTEGER       NOT NULL,
   createdAt            TIMESTAMP     NOT NULL,
   updatedAt            TIMESTAMP     NOT NULL,
   PRIMARY KEY (id),
   CONSTRAINT fk_transaction_type_id
      FOREIGN KEY(transactionTypeId)
         REFERENCES transaction_type(id),
   CONSTRAINT fk_transaction_status_id
      FOREIGN KEY(transactionStatusId)
         REFERENCES transaction_status(id)
);

ALTER SEQUENCE transaction_id_seq OWNED BY transaction.id;
