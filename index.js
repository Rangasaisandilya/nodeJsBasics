const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');


const user = {
    name: 'sai',
    age: 25,
    password: 'password@123'
}

let salt = bcrypt.genSaltSync(10);
console.log(salt);

let hashedPassword = bcrypt.hashSync(user.password, salt);

const protectedUser = {
    name: user.name,
    age: user.age,
    password: hashedPassword
}

console.log(protectedUser)

//check user with correct password or not

let attempt1 = bcrypt.compareSync('Password@123', hashedPassword)

console.log(attempt1);

let attempt2 = bcrypt.compareSync('password@123', hashedPassword)
console.log(attempt2)


// configuration of dotenv variable and used path module for uts

dotenv.config({ path: path.join(__dirname, 'config.env') })

console.log(process.env.SECRET_KEY)

//json web token example

const generateToken = jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: 60 * 60
});

console.log(generateToken)

const verifyToken = jwt.verify(generateToken, process.env.SECRET_KEY, (err, decoded) => {
    if (err) throw err;
    return decoded
});

console.log(verifyToken)

const hostname = process.env.HOST_NAME;
const port = process.env.PORT;

// create a server
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const server = http.createServer((request, response) => {
    response.statusCode = 200; // successful response
    response.setHeader('Content-Type', 'text/html');
    response.end(`<h2 style="color: white;background-color: limegreen">Welcome to Node JS</h2>`);
});

// listen
server.listen(port, () => {
    console.log(`Node JS server is started at http://${hostname}:${port}`);
});


