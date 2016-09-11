const express = require("express");
'use strict';

const app = express();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

app.set('port', (process.env.PORT || 3000));

app.get('/', (req, res) => {
    res.send(`
    <h1>FCC-Timestamp-API</h1>
    <h4>Example usage:</h4>
    <p>https://fcc-time-api.herokuapp.comDecember-2015-15</p>
    <p>https://fcc-time-api.herokuapp.com/1450137600</p>
    <br />
    <h4>Result:</h4>
    <p>{ "unix": 1450137600, "natural": "December 15, 2015" }</p>
    `);
    res.end();
});

app.get('/:time', (req, res) => {
    const input = req.params.time;
    const output = {};
    
    if (/^\d+$/.test(input)) {
        const unixDate = new Date(input * 1000);
        
        output.unix = input;
        output.natural = `${monthNames[unixDate.getMonth()]}-${unixDate.getFullYear()}-${unixDate.getDate()}`;
    } else {
        const naturalDate = new Date(input);
        const parts = input.split('-')
        
        output.unix = naturalDate.getTime() / 1000;
        output.natural = parts.length === 3 ? `${parts[0]}-${parts[1]}-${parts[2]}` : NaN;
    }
    
    res.send(output);
    res.end();
});


app.listen(app.get('port'));