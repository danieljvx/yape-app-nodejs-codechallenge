CREATE SEQUENCE transaction_type_id_seq;

CREATE TABLE transaction_type (
   id           INTEGER          NOT NULL DEFAULT nextval('transaction_type_id_seq'),
   name         VARCHAR(10)      NOT NULL,
   created_at   TIMESTAMP        NOT NULL,
   updated_at   TIMESTAMP        NOT NULL,
   PRIMARY KEY (id)
);


ALTER SEQUENCE transaction_type_id_seq OWNED BY transaction_type.id;

INSERT INTO transaction_type(name, created_at, updated_at)
VALUES('Type 1', NOW(), NOW()),
      ('Type 2', NOW(), NOW());

CREATE SEQUENCE transaction_status_id_seq;

CREATE TABLE transaction_status (
   id           INTEGER          NOT NULL DEFAULT nextval('transaction_status_id_seq'),
   name         VARCHAR(10)      NOT NULL,
   created_at   TIMESTAMP        NOT NULL,
   updated_at   TIMESTAMP        NOT NULL,
   PRIMARY KEY (id)
);

ALTER SEQUENCE transaction_status_id_seq OWNED BY transaction_status.id;

INSERT INTO transaction_status(name, created_at, updated_at)
VALUES('Pendiente', NOW(), NOW()),
      ('Aprobado', NOW(), NOW()),
      ('Rechazado', NOW(), NOW());

CREATE SEQUENCE transaction_id_seq;

CREATE TABLE transaction (
   id           INTEGER       NOT NULL DEFAULT nextval('transaction_id_seq'),
   value        INTEGER       NOT NULL,
   credit       VARCHAR(5)    NOT NULL,
   debit        VARCHAR(5)    NOT NULL,
   type_id      INTEGER       NOT NULL,
   status_id    INTEGER       NOT NULL,
   created_at   TIMESTAMP     NOT NULL,
   updated_at   TIMESTAMP     NOT NULL,
   PRIMARY KEY (id),
   CONSTRAINT fk_transaction_type_id
      FOREIGN KEY(type_id)
         REFERENCES transaction_type(id),
   CONSTRAINT fk_transaction_status_id
      FOREIGN KEY(status_id)
         REFERENCES transaction_status(id)
);

ALTER SEQUENCE transaction_id_seq OWNED BY transaction.id;
