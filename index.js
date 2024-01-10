import express from "express";
import bodyParser from "body-parser"; //for req.body
// for directory name
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var userIsAuthorized = false;

app.use(bodyParser.urlencoded({ extended: true }));

function check(req, res, next){
    if(req.body["password"] === "ILoveProgramming"){
        userIsAuthorized = true;
    }
    next();
};

app.use(check);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/check', (req, res) =>{
    if(userIsAuthorized){
        res.sendFile(__dirname + '/public/secret.html');
    }else{
        res.sendFile(__dirname + '/public/index.html');
    }
});

app.listen(port, ()=>{
    console.log(`The server is listening to port: ${port}.`);
});