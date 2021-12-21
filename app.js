const express = require('express')
const {MongoClient} = require('mongodb');
const dbo = require("./conn.js")
const app = express()
const port = process.env.port || 3000

dbo.connectToServer((er) => console.log(er))

app.get('/', (req, res) => {

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


  // res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})