const express = require('express')
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;
const dbo = require("./conn.js")
const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
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

// View a listing
app.get('/listings/:id', (req, res) => {

  const dbConnect = dbo.getDb();

  dbConnect
    .collection("listings")
    .findOne({"_id": new ObjectId(req.params.id)}, function (err, result) {
      if (err) {
        res.status(400).send(`Error fetching listing with id: ${req.params.id}!`);
     } else {
       console.log("Result is " + result)
        res.json(result);
      }
    });
})

// Creates a listing
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