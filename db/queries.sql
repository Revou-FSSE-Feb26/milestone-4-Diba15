-- Filtered Data SELECT
-- QUERY 1 (Disesuaikan enum uppercase 'USER')
SELECT * FROM users WHERE role = 'USER';

-- QUERY 2
SELECT * FROM accounts WHERE user_id = 1;

-- QUERY 3
SELECT * FROM transactions WHERE account_id = 1;


-- Join 3 TABLE dengan WHERE clause
-- QUERY 4
SELECT
    users.name AS nama_user,
    accounts.name AS nama_akun,
    categories.name AS nama_kategori,
    transactions.amount AS jumlah_transaksi
FROM transactions
         JOIN accounts ON transactions.account_id = accounts.id
         JOIN categories ON transactions.category_id = categories.id
         JOIN users ON accounts.user_id = users.id
WHERE users.id = 1;


-- GROUP BY AGGREGATE
-- QUERY 5
SELECT account_id, SUM(amount) AS total_transaksi
FROM transactions
GROUP BY account_id
HAVING SUM(amount) > 1000000
ORDER BY account_id;


-- SUBQUERY
-- QUERY 6
-- Menampilkan akun yang saldonya di bawah rata-rata saldo semua akun
SELECT * FROM accounts
WHERE balance < (SELECT AVG(balance) FROM accounts);


-- CTE
-- QUERY 7
-- Menampilkan transaksi yang termasuk akun dengan total transaksi di atas 1.000.000
WITH high_value_accounts AS (
    SELECT account_id FROM transactions
    GROUP BY account_id
    HAVING SUM(amount) > 1000000
)
SELECT * FROM transactions
WHERE account_id IN (SELECT account_id FROM high_value_accounts);


-- LEFT JOIN DATA KOSONG
-- QUERY 8
-- Menampilkan kategori yang belum pernah dipakai di transaksi manapun
SELECT categories.* FROM categories
                             LEFT JOIN transactions ON categories.id = transactions.category_id
WHERE transactions.id IS NULL;


-- TRANSACTIONS UPDATE transactions table
-- QUERY 9 (Disesuaikan enum 'EXPENSE' & nama kolom 'created_at')
BEGIN;
UPDATE accounts SET balance = balance - 50000.00 WHERE id = 1;

INSERT INTO transactions (account_id, category_id, type, amount, description, created_at)
VALUES (1, 3, 'EXPENSE', 50000.00, 'Beli Kopi Sore', NOW());
COMMIT;


-- Pencarian Teks tertentu dari description
-- QUERY 10
-- Pencarian case-insensitive menggunakan ILIKE (agar 'kopi', 'KOPI', 'Kopi' tetap terdeteksi)
SELECT * FROM transactions
WHERE description ILIKE '%Kopi%';