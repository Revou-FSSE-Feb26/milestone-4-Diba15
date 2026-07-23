-- Filtered Data SELECT
-- QUERY 1
SELECT * FROM users WHERE role = 'user';
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
HAVING SUM(amount) > 1000
ORDER BY account_id;

-- SUBQUERY
-- QUERY 6
-- Menampilkan akun yang saldonya di bawah rata-rata saldo semua akun
SELECT * FROM accounts 
WHERE balance < (SELECT AVG(balance) FROM accounts);

-- CTE
-- QUERY 7
-- Menampilkan transaksi yang termasuk akun dengan total transaksi di atas 1000
WITH high_value_accounts AS (
    SELECT account_id FROM transactions
    GROUP BY account_id
    HAVING SUM(amount) > 1000
)
SELECT * FROM transactions
WHERE account_id IN (SELECT account_id FROM high_value_accounts);

-- LEFT JOIN DATA KOSONG
-- QUERY 8
SELECT * FROM categories
LEFT JOIN transactions ON categories.id = transactions.category_id
WHERE transactions.id IS NULL;

-- TRANSACTIONS UPDATE transactions table
-- QUERY 9
-- Mengurangi saldo akun karena ada transaksi pengeluaran baru
BEGIN;
  UPDATE accounts SET balance = balance - 50000 WHERE id = 1;
  INSERT INTO transactions (account_id, category_id, type, amount, description, transaction_date)
  VALUES (1, 3, 'expense', 50000, 'Beli Kopi Sore', NOW());
COMMIT;

-- Pencarian Teks tertentu dari description
-- QUERY 10
SELECT * FROM transactions
WHERE description LIKE '%Kopi%';