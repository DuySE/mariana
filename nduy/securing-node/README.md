# Securing Node App
**1. Data validation – never trust your users**

We must always validate or sanitize the data coming from the user or other entity of the system. The bad validation or no validation at all is a threat to the working system and can lead to a security exploit. We should also escape the output. We can use a node module called validator to perform the data validation.

Example:
```js
const validator = require('validator')
validator.isEmail('ngduy@yahoo-corp.jp') // true
validator.isEmail('ngduy.jp') // false
```
**2. SQL Injection Attack**

SQL injection is an exploit where malicious users can pass unexpected data and change the SQL queries. Assume your SQL query looks like this:
```sql
UPDATE users SET first_name = "' + req.body.first_name +  '" WHERE id = 123;
```
In a normal scenario, we would expect that this query will look like this:
```sql
UPDATE users SET first_name = "Duy" WHERE id = 123;
```
Now, if someone passes the first_name as the value shown below:
```
Duy", last_name = "Nguyen"; --
```
Then, your SQL query will look like this:
```sql
UPDATE users SET first_name = "Duy", last_name = "Nguyen"; --" WHERE id = 123;
```
The WHERE condition is commented out and now the query will update the users table and sets every user's first name as "Duy" and last name as "Nguyen". This will eventually lead to system failure and if our database has no backup.

**_How to prevent SQL Injection attack_**

The most useful way to prevent SQL injection attacks is to sanitize input data.
Example
```js
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'secret',
  database : 'my_db'
});

connection.connect();

connection.query(
    'UPDATE users SET ?? = ? WHERE ?? = ?',
    ['first_name', req.body.first_name, , 'id', 123],
    function(err, result) {
    //...
});
```
The double question mark is replaced with the field name and the single question mark is replaced with the value. This will make sure that input is safe.

**3. Typecasting**

JavaScript is a dynamic typed language i.e a value can be of any type. We can use the typecasting method to verify the type of data so that only the intended type of value should go into the database.
Example
```js
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'secret',
  database : 'my_db'
});

connection.connect();

connection.query(
    'UPDATE users SET ?? = ? WHERE ?? = ?',
    ['first_name', req.body.first_name, , 'id', Number(req.body.ID)],
    function(err, result) {
    //...
});
```
We used Number(req.body.ID) to ensure that ID is always the number.

**4. Application authentication and authorization**

Sensitive data such as passwords should be stored in the system in a secure way that malicious users don't misuse sensitive information.

**_Password Hashing_**

Hashing is a function that generates a fixed-size string from input. The output from the hashing function cannot be decrypted hence it's "one-way" in nature. For data such as passwords, we must always use hashing algorithms to generate a hash version of the input password string which is a plaintext string.
The Hashing algorithm is BCrypt. In Node.js, we can use bcyrpt node module to perform the hashing.
Example
```js
const bcrypt = require('bcrypt');

const saltRounds = 10;
const password = "Example@2021";

bcrypt.hash(
    password,
    saltRounds,
    (err, passwordHash) => {
    console.log("Hashed Password:", passwordHash);
});
```
The SaltRounds function is the cost of the hash function. The higher the cost, the more secure hash would be generated.

**_Password Storage_**

Whether we use the database, files to store passwords, we must not store a plain text version. As we studied above, we should generate the hash and store the hash in the system. It would be better to use varchar(255) data type in case of a password.

**5. Cross Site Request Forgery (CSRF) Attack Prevention**

CSRF is an attack where that manipulates a trusted user of a system to execute unwanted malicious actions on a web application. In Node.js, we can use csurf module to mitigate CSRF attack. This module requires either express-session or cookie-parser to be initialized first. We can check out the example code below.
```js
const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');

// setup route middlewares
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

// create express app
const app = express();

// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());

app.get('/form', csrfProtection, function(req, res) {
  // pass the csrfToken to the view
  res.render('send', { csrfToken: req.csrfToken() });
});

app.post('/process', parseForm, csrfProtection, function(req, res) {
  res.send('data is being processed');
});

app.listen(3000);
```
On the web page, we need to create a hidden input type with the value of the CSRF token.
Example
```html
<form action="/process" method="POST">
  <input type="hidden" name="_csrf" value="{{csrfToken}}">

  Favorite color: <input type="text" name="favoriteColor">
  <button type="submit">Submit</button>
</form>
```
In the case of AJAX requests, we can pass the CSRF token in the header.
```js
const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  headers: {
    'CSRF-Token': token
  }
```