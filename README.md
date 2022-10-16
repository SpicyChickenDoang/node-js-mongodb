# nodejs-mongodb-jwt
### API using nodeJS, express, bcrypt. Using MongoDB as the database and JWT for authorization

### 1. Project Setup
```
npm install
```

Add .env file to the root folder of your project
and then copy the 'DB_CONNECTION' into your .env file and use your own credentials

>DB_CONNECTION=mongodb+srv://<'username'>:<'password'>@atlascluster.cxj27hm.mongodb.net/<database_name>

>ACCESS_TOKEN_KEY=whatever_key_you_want


### 2. Run
```
node server.js
```

### 3. Home
```
http://localhost:8080/home
```

### 4. Create User/Sign Up
```
http://localhost:8080/signup

body = {
  name: "your name",
  email: "your email",
  password: "your password"
}
```

### 5. Login
```
http://localhost:8080/login

body = {
  email: "your email",
  password: "your password"
}
```
Login will respond with an ACCESS_TOKEN that is needed for further routes

### 6. Post Notes
```
http://localhost:8080/postNotesById
Authorization: Bearer ACESS_TOKEN

body = {
  title: "your email",
  description: "your password"
}
```

### 7. View a User Notes
```
http://localhost:8080/viewNotesByUserId
Authorization: Bearer ACESS_TOKEN
```

### 8. Edit User Details/Similar to forget password
this routes uses HTTP PATCH. So editing one or two user details is possible
```
http://localhost:8080/user/edit/:id

body = {
  name: "your name"
  email: "your email"
  password: "your password"
}
```

### 9. Delete user own notes
```
http://localhost:8080/deleteById/:notesId
Authorization: Bearer ACESS_TOKEN
```

### 10. Edit user own notes
this routes uses HTTP PATCH. So editing one or both notes details is possible
```
http://localhost:8080/editById/:notesId
Authorization: Bearer ACESS_TOKEN

body = {
  title: "your title"
   description: "your description"
}
```












