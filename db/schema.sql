-- Buat ENUM untuk tipe data
CREATE TYPE user_role AS ENUM ('admin', 'user');
CREATE TYPE account_type AS ENUM ('cash', 'bank', 'e-wallet');
CREATE TYPE category_type AS ENUM ('income', 'expense');
CREATE TYPE transaction_type AS ENUM ('income', 'expense', 'transfer');

-- Buat tabel users 
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Buat tabel accounts
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    type account_type NOT NULL,
    balance NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_account_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Menggunakan CASCADE untuk menghapus akun saat pengguna dihapus
);

-- Buat tabel categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type category_type NOT NULL
);

-- Buat tabel transactions
-- 
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    account_id INT NOT NULL,
    category_id INT NOT NULL,
    type transaction_type NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    description TEXT,
    transaction_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_transaction_account FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE, -- Menggunakan CASCADE untuk menghapus transaksi saat akun dihapus
    CONSTRAINT fk_transaction_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT -- Menggunakan Restrict untuk menghindari penghapusan kategori yang digunakan dalam transaksi
);