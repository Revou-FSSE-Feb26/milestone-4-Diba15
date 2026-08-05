# Smoke Test — FinTrack API

| Metadata                 | Detail                                                   |
|--------------------------|----------------------------------------------------------|
| **Tanggal**              | 2026-08-05 11:15 WIB                                     |
| **Collection Variables** | Fintrack                                                 |
| **base_url**             | https://milestone-4-diba15-production.up.railway.app/api |
| **Commit**               | main (latest)                                            |
| **Dijalankan oleh**      | Dimas Bagas Saputro                                      |

---

## 🔧 Collection & Environment Variables

| **Variable Name** | **Description / Default Value**                                                     |
|-------------------|-------------------------------------------------------------------------------------|
| `deploy-link`     | `http://localhost:3000/api` (Local Environment)                                     |
| `baseUrl`         | `https://milestone-4-diba15-production.up.railway.app/api` (Production Environment) |
| `baseId`          | `99` (ID acuan untuk pengujian smoke test)                                          |
| `access_token`    | Auto-saved pada saat Login / `Bearer {{access_token}}`                              |
| `refresh_token`   | Auto-saved pada saat Login / `Bearer {{refresh_token}}`                             |

---

## 📊 Hasil Pengujian Smoke Test

| #  | Endpoint           | Method                        | Ekspektasi                                      | Hasil | Catatan                          |
|----|--------------------|-------------------------------|-------------------------------------------------|-------|----------------------------------|
| 1  | `/docs`            | GET                           | 200, server merespons (Swagger UI aktif)        | ✅    | API Dokumentasi                  |
| 2  | `/accounts`        | GET                           | 200, body array, panjang ≥ 1 (bukti seed jalan) | ✅    | Memuat 6 data akun               |
| 3  | `/accounts/1`      | GET                           | 200, body punya `id`, `name`, `balance`         | ✅    | Detail akun id 1                 |
| 4  | `/accounts/9999`   | GET                           | 404, bukan 200 dengan body kosong               | ✅    | Handled 404 Not Found            |
| 5  | `/categories`      | GET                           | 200, array, panjang ≥ 6                         | ✅    | Memuat 6 kategori master         |
| 6  | `/transactions`    | POST                          | 201, body punya `id` hasil generate DB          | ✅    | Berhasil mencatat transaksi      |
| 7  | `/transactions`    | POST (body `amount: -1000`)   | 400, pesan `amount must be a positive number`   | ✅    | Validasi DTO bekerja             |
| 8  | `/transactions`    | POST (body field asing `foo`) | 400 (`forbidNonWhitelisted` aktif)              | ✅    | Stripping / Blocking field liar  |
| 9  | `/accounts/1`      | GET                           | 200, item punya objek `user` & `transactions`   | ✅    | Bukti relational query `include` |
| 10 | `/transactions/99` | DELETE                        | 200, membersihkan data uji dari langkah 6       | ✅    | Data uji dibersihkan             |

---

## 🎯 Kesimpulan

**GO** — **10/10 PASS**. Deploy dinyatakan sehat dan layak beroperasi di lingkungan Production.

---

## 🔍 Temuan & Catatan Tambahan

- Seluruh endpoint terproteksi JWT mengembalikan **401 Unauthorized** jika token tidak disertakan.
- Endpoint khusus Admin (`GET /users`) merespons **403 Forbidden** bagi role non-admin.

---

## 📚 Referensi Endpoint & Contoh Error Handling

### 1. Auths (`/auth`)

* **`POST /auth/login`**
    * `201 Created`: Login sukses mengembalikan `access_token` & `user`.
    * `400 Bad Request`: Validasi payload gagal.
    * `401 Unauthorized`: Kredensial tidak valid (`"Invalid credentials"`).
    * `429 Too Many Requests`: Batas login terlampaui (`"ThrottlerException"`).
* **`POST /auth/register`**
    * `201 Created`: Registrasi berhasil.
    * `400 Bad Request`: Format DTO salah.
    * `409 Conflict`: Email sudah terdaftar.
* **`GET /auth/me`**
    * `200 OK`: Profile user login diambil.
    * `401 Unauthorized`: Token tidak ada/kedaluwarsa.
* **`POST /auth/refresh-token`**
    * `201 Created`: Token baru diterbitkan.
    * `403 Forbidden`: Refresh token tidak valid.
* **`POST /auth/logout`**
    * `201 Created`: Logout berhasil (`{"message": "Berhasil logout"}`).

### 2. Users (`/users`)

* **`GET /users` (Admin Only)**
    * `200 OK`: Daftar seluruh pengguna.
    * `403 Forbidden`: Role bukan ADMIN.
* **`GET /users/:id`**
    * `200 OK`: Detail pengguna.
    * `403 Forbidden`: Akses data user lain.
    * `404 Not Found`: User tidak ditemukan.
* **`PATCH /users/:id`** & **`DELETE /users/:id`**
    * `200 OK`: User diubah / dihapus.

### 3. Accounts (`/accounts`)

* **`POST /accounts`**: `201 Created`
* **`GET /accounts`**: `200 OK` (Per-user ownership filter)
* **`GET /accounts/:id`**: `200 OK` / `404 Not Found`
* **`PATCH /accounts/:id`**: `200 OK` / `400 Bad Request`
* **`DELETE /accounts/:id`**: `200 OK` / `404 Not Found`

### 4. Categories (`/categories`)

* **`POST /categories`**: `201 Created`
* **`GET /categories`**: `200 OK`
* **`GET /categories/:id`**: `200 OK` / `404 Not Found`
* **`PATCH /categories/:id`**: `200 OK` / `404 Not Found`
* **`DELETE /categories/:id`**: `200 OK` / `404 Not Found`

### 5. Transactions (`/transactions`)

* **`POST /transactions`**: `201 Created` / `400 Insufficient funds`
* **`GET /transactions`**: `200 OK`
* **`GET /transactions/:id`**: `200 OK` / `404 Not Found`
* **`PATCH /transactions/:id`**: `200 OK` / `400 Bad Request`
* **`DELETE /transactions/:id`**: `200 OK` / `404 Not Found` (Reverse balance)