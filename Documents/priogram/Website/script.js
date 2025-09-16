const express = require('express');
const { connect } = require('http2');
const mysql = require('mysql');
const path = require('path');
const app = express();
app.use(express.urlencoded());
const con = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '123456',
 database: 'db'
});
con.connect();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html.html'));
});

app.post('/users', (req, res) => {
  con.query(
    'INSERT INTO students (name, email) VALUES (?,?)',
    [req.body.name, req.body.email],
    () => {
      res.send('User saved!');
    }
  );
});

app.listen(3000);