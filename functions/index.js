const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const https = require('https');

const token = "REPLACE ME WITH SECRET KEY";
 
const app = express();

app.use(express.json());
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.post("/Verify", function (req, res) {
  let requestData = JSON.stringify(req.body);

  const options = {
    host: "dvs2.idware.net",
    port: 443,
    path: "/api/v3/Verify",
    method: "POST",
    headers: {
      "Content-Type": "application/json-patch+json",
      "Authorization": "Bearer " + token,
    },
  };

  let chunks = "";
  const httpreq = https.request(options, function (response) {
    response.setEncoding("utf8");

    response.on("data", function (chunk) {
      chunks = chunks + chunk;
    });

    response.on("end", function () {
      let responseData = JSON.parse(chunks);
      res.json(responseData);
    });
  });

  httpreq.write(requestData);
  httpreq.end();
});


exports.api = functions.https.onRequest(app);
