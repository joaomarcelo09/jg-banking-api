-- CreateTable
CREATE TABLE "balance" (
    "id_balance" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER
);

-- CreateTable
CREATE TABLE "people" (
    "id_people" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '0',
    "cpf" TEXT NOT NULL DEFAULT '0',
    "telephone" TEXT NOT NULL DEFAULT '0',
    "email" TEXT NOT NULL DEFAULT '0',
    "date_birth" TEXT
);

-- CreateTable
CREATE TABLE "users" (
    "id_user" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_people" INTEGER NOT NULL DEFAULT 0,
    "id_balance" INTEGER NOT NULL DEFAULT 0,
    "password" TEXT NOT NULL,
    CONSTRAINT "users_id_balance_fkey" FOREIGN KEY ("id_balance") REFERENCES "balance" ("id_balance") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "users_id_people_fkey" FOREIGN KEY ("id_people") REFERENCES "people" ("id_people") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pix_key" (
    "id_pix_key" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER,
    "key" TEXT,
    "key_type" TEXT,
    CONSTRAINT "pix_key_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id_user") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pix_transaction" (
    "id_pix_transaction" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_pix_sender" INTEGER,
    "id_pix_recipient" INTEGER,
    "amount_sent" INTEGER,
    "transiction_date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pix_transaction_id_pix_sender_fkey" FOREIGN KEY ("id_pix_sender") REFERENCES "users" ("id_user") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "pix_transaction_id_pix_recipient_fkey" FOREIGN KEY ("id_pix_recipient") REFERENCES "users" ("id_user") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "withdrawal_record" (
    "id_withdrawal_record" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_withdrawal_user" INTEGER,
    "withdrawal_amount" INTEGER,
    "withdrawal_date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "withdrawal_record_id_withdrawal_user_fkey" FOREIGN KEY ("id_withdrawal_user") REFERENCES "users" ("id_user") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "deposit_record" (
    "id_deposit_record" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_deposit_user" INTEGER,
    "deposit_amount" INTEGER,
    "deposit_date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "deposit_record_id_deposit_user_fkey" FOREIGN KEY ("id_deposit_user") REFERENCES "users" ("id_user") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_people_key" ON "users"("id_people");

-- CreateIndex
CREATE INDEX "users_id_balance_idx" ON "users"("id_balance");

-- CreateIndex
CREATE INDEX "users_id_people_idx" ON "users"("id_people");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_balance_id_people_key" ON "users"("id_balance", "id_people");

-- CreateIndex
CREATE INDEX "pix_key_id_user_idx" ON "pix_key"("id_user");

-- CreateIndex
CREATE INDEX "pix_transaction_id_pix_recipient_idx" ON "pix_transaction"("id_pix_recipient");

-- CreateIndex
CREATE INDEX "pix_transaction_id_pix_sender_idx" ON "pix_transaction"("id_pix_sender");

-- CreateIndex
CREATE INDEX "withdrawal_record_id_withdrawal_user_idx" ON "withdrawal_record"("id_withdrawal_user");

-- CreateIndex
CREATE INDEX "deposit_record_id_deposit_user_idx" ON "deposit_record"("id_deposit_user");
