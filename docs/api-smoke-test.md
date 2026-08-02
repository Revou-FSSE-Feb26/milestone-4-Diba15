# API SMOKE TEST DOCUMENTATION

### INTRODUCTION

This documentation is for smoke testing the API endpoints of the Fintrack application. The smoke test is a basic test to
ensure that the API is working correctly and that all endpoints are accessible.

### LIMITATIONS

Current smoke tests do not cover all edge cases, such as **missing JSON data** or **insufficient balance** during
account creation.

### COLLECTION VARIABLES

Don't change this after you import the collection in postman.

| **Name**   | **Value**                                                |
|------------|----------------------------------------------------------|
| local-link | http://localhost:3000/api                                |
| baseUrl    | https://milestone-4-diba15-production.up.railway.app/api |
| baseId     | 99                                                       |

### TEST RUN

|             |                                                          |
|-------------|----------------------------------------------------------|
| Date        | 2026-08-02 12:41 WIB                                     |
| Environment | Collection Variable / none                               |
| baseUrl     | https://milestone-4-diba15-production.up.railway.app/api |

### ENDPOINT SMOKE TEST IN POSTMAN

| **#** | **METHOD**  | **DESCRIPTION**                                                                                                                                       | **EXPECTATION**                                                                                                            | **RESULT** |
|-------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|------------|
| 1     | GET /       | For all endpoint in getAll method.  <br>Use iteration some for found item with ID 99, and use name or description because return data not include ID. | Status 200 and  <br>Item with ID 99 Found                                                                                  | ✅         |
| 2     | GET /:id    | For all endpoint in getWithId method.                                                                                                                 | Status 200                                                                                                                 | ✅         |
| 3     | POST /      | For all endpoint in postItem method.                                                                                                                  | Status code is 201 or 200  <br>Response time is less than 3000ms  <br>Response body is not empty  <br>Content-Type is JSON | ✅         |
| 4     | PATCH /:id  | For all endpoint in patchItem / editItem method.                                                                                                      | Status code is 200  <br>Response time is less than 3000ms  <br>Response body is not empty  <br>Content-Type is JSON        | ✅         |
| 5     | DELETE /:id | For all endpoint in deleteItem method.                                                                                                                | Status code is 200 or 204  <br>Response time is less than 3000ms                                                           | ✅         |

### HOW TO RUN THE TEST IN POSTMAN JSON COLLECTION

1. Open Postman
2. Import the collection from the file `fintrack.postman_collection.json`
3. Don't change the variable in collections
4. Right click and Run the collection with name Scenario Test E2E
5. Click start run and wait until finish

### CONCLUSION

All 51/51 test pass. Deployed backend don't have a problem with all endpoint and transaction scenarios. 