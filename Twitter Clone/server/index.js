const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Basic Config
app.use(cors());
app.use(bodyParser.json());

// app.use(express.json());

app.get('/',(req,res) => {

    res.json({
        message : 'Meower ! 😹'
    });

}); 

app.post('/mews',(req,res) => {
    console.log(req);
});



app.listen(5000,() => {
    console.log('Listening on http://localhost:5000');
});