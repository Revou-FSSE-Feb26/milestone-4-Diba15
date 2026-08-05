# API SMOKE TEST & ERROR HANDLING DOCUMENTATION

### INTRODUCTION

Dokumentasi ini berisi panduan **Smoke Testing** dan referensi **Error Handling** untuk seluruh endpoint REST API pada
aplikasi **Fintrack**. Pengujian smoke test bertujuan memastikan seluruh endpoint utama dapat diakses, merespon dalam
batas waktu yang ditentukan, dan mengembalikan struktur data yang sesuai.

Setiap endpoint pada koleksi Postman
([fintrack.postman_collection.json](file:///d:/Revou/Assignment/milestone-4-Diba15/docs/fintrack.postman_collection.json))
telah dilengkapi dengan contoh *Saved Response* untuk skenario **Sukses (200/201)** maupun skenario **Error (400, 401,
403, 404, 409, 429)** sesuai dengan exception handling bawaan backend NestJS.

---

### COLLECTION VARIABLES

| **Variable Name** | **Description / Default Value**                            |
|-------------------|------------------------------------------------------------|
| `deploy-link`     | `http://localhost:3000/api`                                |
| `baseUrl`         | `https://milestone-4-diba15-production.up.railway.app/api` |
| `baseId`          | `99` (ID acuan untuk pengujian smoke test)                 |
| `access_token`    | Auto-saved pada saat Login                                 |
| `refresh_token`   | Auto-saved pada saat Login                                 |

---

### DAFTAR ENDPOINT & EXAMPLE ERROR RESPONSES PER MODUL

#### 1. Auths (`/auth`)

* **`POST /auth/login`**
    * `201 Created`: Login sukses mengembalikan `access_token` & `user`.
    * `400 Bad Request`: Validasi payload gagal (format email salah atau password kosong).
    * `401 Unauthorized`: Kredensial tidak valid (`"Invalid credentials"`).
    * `429 Too Many Requests`: Batas percobaan login terlampaui (`"ThrottlerException: Too Many Requests"`).
* **`POST /auth/register`**
    * `201 Created`: Registrasi pengguna baru berhasil.
    * `400 Bad Request`: Format email/password tidak memenuhi kriteria DTO.
    * `409 Conflict`: Email sudah terdaftar (`"User already exists"`).
* **`GET /users/me`**
    * `200 OK`: Profile user login berhasil diambil.
    * `401 Unauthorized`: Token JWT tidak disertakan atau kedaluwarsa.
* **`POST /auth/refresh-token`**
    * `201 Created`: Memperbarui token akses.
    * `401 Unauthorized`: Token tidak ada atau kedaluwarsa.
    * `403 Forbidden`: Refresh token tidak valid atau tidak cocok (`"Akses ditolak"`).
* **`POST /auth/logout`**
    * `201 Created`: Logout berhasil (`{"message": "Berhasil logout"}`).
    * `401 Unauthorized`: Token tidak ada.

---

#### 2. Users (`/users`)

* **`GET /users` (Admin Only)**
    * `200 OK`: Daftar seluruh pengguna.
    * `401 Unauthorized`: Belum login.
    * `403 Forbidden`: Akses ditolak jika peran bukan ADMIN (`"Akses ditolak: Anda tidak memiliki izin admin"`).
* **`GET /users/:id`**
    * `200 OK`: Detail pengguna berdasarkan ID.
    * `401 Unauthorized`: Belum login.
    * `403 Forbidden`: Mengakses data milik user lain (`"Akses ditolak: Anda hanya dapat mengakses data Anda sendiri"`).
    * `404 Not Found`: User tidak ditemukan (`"User #99 not found"`).
* **`PATCH /users/:id`**
    * `200 OK`: Update nama/data user berhasil.
    * `400 Bad Request`: Format DTO salah.
    * `401 Unauthorized`: Belum login.
    * `403 Forbidden`: Tidak memiliki hak edit user lain.
    * `404 Not Found`: User tidak ditemukan.
* **`DELETE /users/:id`**
    * `200 OK`: User berhasil dihapus.
    * `401 Unauthorized`: Belum login.
    * `403 Forbidden`: Tidak memiliki hak hapus user lain.
    * `404 Not Found`: User tidak ditemukan.

---

#### 3. Accounts (`/accounts`)

* **`POST /accounts`**
    * `201 Created`: Akun berhasil dibuat (`BANK`, `E_WALLET`, `CASH`).
    * `400 Bad Request`: Field nama/tipe tidak valid.
    * `401 Unauthorized`: Belum login.
* **`GET /accounts`**
    * `200 OK`: Memuat daftar akun milik pengguna.
    * `401 Unauthorized`: Belum login.
* **`GET /accounts/:id`**
    * `200 OK`: Detail akun.
    * `401 Unauthorized`: Belum login.
    * `404 Not Found`: Akun tidak ditemukan (`"Account #99 not found"`).
* **`PATCH /accounts/:id`**
    * `200 OK`: Update nama atau saldo akun.
    * `400 Bad Request`: Saldo tidak valid.
    * `401 Unauthorized`: Belum login.
    * `404 Not Found`: Akun tidak ditemukan.
* **`DELETE /accounts/:id`**
    * `200 OK`: Akun berhasil dihapus.
    * `401 Unauthorized`: Belum login.
    * `404 Not Found`: Akun tidak ditemukan.

---

#### 4. Categories (`/categories`)

* **`POST /categories`**
    * `201 Created`: Kategori berhasil dibuat (`INCOME`, `EXPENSE`).
    * `400 Bad Request`: Nama kategori kosong.
    * `401 Unauthorized`: Belum login.
* **`GET /categories`**
    * `200 OK`: Daftar seluruh kategori.
    * `401 Unauthorized`: Belum login.
* **`GET /categories/:id`**
    * `200 OK`: Detail kategori.
    * `401 Unauthorized`: Belum login.
    * `404 Not Found`: Kategori tidak ditemukan (`"Category #99 not found"`).
* **`PATCH /categories/:id`**
    * `200 OK`: Update nama kategori.
    * `400 Bad Request`: Format DTO salah.
    * `401 Unauthorized`: Belum login.
    * `404 Not Found`: Kategori tidak ditemukan.
* **`DELETE /categories/:id`**
    * `200 OK`: Kategori berhasil dihapus.
    * `401 Unauthorized`: Belum login.
    * `404 Not Found`: Kategori tidak ditemukan.

---

#### 5. Transactions (`/transactions`)

* **`POST /transactions`**
    * `201 Created`: Transaksi berhasil dicatat.
    * `400 Bad Request (Saldo)`: Saldo akun tidak mencukupi (`"Insufficient funds"`).
    * `400 Bad Request (DTO)`: Amount negatif atau tipe transaksi salah.
    * `404 Not Found`: Akun tujuan tidak ditemukan / bukan milik user (`"Account not found or invalid permission"`).
* **`GET /transactions`**
    * `200 OK`: Memuat daftar transaksi milik pengguna.
* **`GET /transactions/:id`**
    * `200 OK`: Detail transaksi.
    * `404 Not Found`: Transaksi tidak ditemukan (`"Transaction #99 not found"`).
* **`PATCH /transactions/:id`**
    * `200 OK`: Perubahan jumlah/deskripsi transaksi.
    * `404 Not Found`: Transaksi tidak ditemukan.
* **`DELETE /transactions/:id`**
    * `200 OK`: Transaksi dihapus dan saldo akun disesuaikan kembali (reverse balance).
    * `404 Not Found`: Transaksi tidak ditemukan.

---

### CARA MENJALANKAN SMOKE TEST DI POSTMAN

1. Import
   file [fintrack.postman_collection.json](file:///d:/Revou/Assignment/milestone-4-Diba15/docs/fintrack.postman_collection.json)
   di Postman.
2. Atur variabel `deploy-link` ke URL API Anda (misal: `http://localhost:3000/api`).
3. Anda dapat menjalankan setiap request secara mandiri atau menjalankan seluruh folder modul (misal folder `Accounts`
   atau `Transactions`) menggunakan Postman Collection Runner.