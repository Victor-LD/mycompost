const express = require('express')
const {MongoClient} = require('mongodb');
const dbo = require("./conn.js")
const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser');
app.use(bodyParser.json());

dbo.connectToServer(() => null)

// View all listings
app.get('/listings', (req, res) => {

  const dbConnect = dbo.getDb();

  dbConnect
    .collection("listings")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });
})

// C
app.post('/listings', (req, res) => {

  const dbConnect = dbo.getDb();

  console.log("Req is: " + req);

  dbConnect
    .collection("listings")
    .insertOne(req.body, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting listing!");
      } else {
        console.log("Added a new listing");
        res.status(204).send();
      }
    })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})