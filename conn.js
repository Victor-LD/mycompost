const { MongoClient } = require("mongodb");
const connectionString = "mongodb+srv://mycompost:compost1@cluster0.tlg6c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("mycompost");
      console.log("Successfully connected to MongoDB.");
      return callback();
    });
  },

  getDb: function () {
    console.log("test");
    return dbConnection;
  },
};