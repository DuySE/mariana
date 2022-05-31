# Introduction
This project is a server-side of platform that hosts contest problems.
# Evaluation
Tested using Postman.

1. Login
POST /login `{ username: "admin", password: "123" }`
2. Register
POST /register `{ username: "ngduy", password: "456" }`
3. Get all problems
GET /problems
4. Create new problem
POST /problem `{ id: "1282E", name: "Pangram string", type: "Programming", rating: 1200, tags: ["string"] }`

5. Retrieve one problem by ID
GET /problem/:id `{ id: "1287B" }`
6. Update one problem
PUT /problems/:id `{ id: "1287B" }`
7. Delete one problem
DELETE /problem/:id `{ id: "1287B" }`
8. Upload photo
POST /photos/upload