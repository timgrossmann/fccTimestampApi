const express = require("express");
'use strict';

const app = express();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

app.get('/', (req, res) => {
    res.send(`
    <h1>FCC-Timestamp-API</h1>
    <h4>Example usage:</h4>
    <p>http:foo.com/December-2015-15</p>
    <p>http:foo.com/1450137600</p>
    <br />
    <h4>Result:</h4>
    <p>{ "unix": 1450137600, "natural": "December 15, 2015" }</p>
    `);
    res.end();
});

app.get('/:time', (req, res) => {
    const input = req.params.time;
    const output = {};
    var time;
    
    if (/^\d+$/.test(input)) {
        time = new Date(input * 1000);
        
        output.unix = input;
        output.natural = `${monthNames[time.getMonth()]}-${time.getFullYear()}-${time.getDate()}`;
    } else {
        time = new Date(input);
        const parts = input.split('-')
        
        output.unix = time.getTime() / 1000;
        output.natural = parts.length === 3 ? `${parts[0]}-${parts[1]}-${parts[2]}` : NaN;
    }
    
    res.send(output);
    res.end();
});

app.listen(process.env.PORT);