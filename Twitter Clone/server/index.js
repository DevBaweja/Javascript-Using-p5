const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

//  apply to all requests
const app = express();
const db = monk('localhost/meower');
const mews = db.get('mews');
const filter = new Filter();

// Basic Config
app.use(cors());
app.use(bodyParser.json());

// app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Meower ! 😹',
    });
});

const limiter = rateLimit({
    windowMs: 30 * 1000, // 30 second
    max: 10, // limit each IP to 1 requests per windowMs
});
app.use(limiter);


app.get('/mews', (req, res) => {
    mews.find().then((mews) => {
        setTimeout(() => {
            res.json(mews);
        }, 1000);
    });
});

function isValidMew(mew) {
    return mew.name && mew.toString().trim() !== '' && mew.content && mew.content.toString().trim() !== '';
}

app.post('/mews', async (req, res) => {
    // Server side Validation
    if (isValidMew(req.body)) {
        // Insert into db
        const mew = {
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date(),
        };

        await mews
            .insert(mew)
            .then((createdMew) => {
                setTimeout(() => {
                    res.json(createdMew);
                }, 1000);
            })
            .catch((error) => console.log('Server side Error'));
    } else {
        res.status(422);
        setTimeout(() => {
            res.json({
                message: 'Hey Name and Content are required',
            });
        }, 1000);
    }
});

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});

/*
For validator of inputs 

express validator
joi 
yup
*/

/*
const db = monk(process.env.MONGO_URI || 'localhost/meower')
For Deployment
mLab
now secrets add meower-db url

zelt.co
now -e MONGO_URI=@meower-db

now alias url meower-api
*/