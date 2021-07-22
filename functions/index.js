const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const https = require('https');

// Server configuration
const token = "REPLACE ME WITH SECRET KEY";
 

const app = express();

app.use(express.json());
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));


app.post('/ValidationRequests/complete', function (req, res) {
    let data = JSON.stringify({})
    
    const options = {
      host: "dvs2.idware.net",
      port: 443,
      path: "/api/v3/Verify/" + req.body.requestId,
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        "Content-Length": data.length,
        Authorization: "Bearer " + token,
      },
    };

    let chunks = '';
    const httpreq = https.request(options, function (response) {
        
        response.setEncoding('utf8');
        
        response.on('data', function (chunk) {
            chunks = chunks + chunk
        });

        response.on('end', function() {
            let data = JSON.parse(chunks)
            res.json(data)
        })
    });
    httpreq.write(data);
    httpreq.end();
});

exports.api = functions.https.onRequest(app);
