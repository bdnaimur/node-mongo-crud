const express = require('express');
const bodyParser = require('body-parser');

const password = 'XsUA5wXM4nptjwm';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://organicUser:XsUA5wXM4nptjwm@cluster0.esvfp.mongodb.net/organicDb?retryWrites=true&w=majority";


app.get('/',(req, res) => {
    res.sendFile(__dirname+ '/index.html')
})



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("organicDb").collection("products");
//   const product = {name: "madhu", price:25, quantity:50}
    app.post("/addProduct", (req, res) =>{
        const product = req.body;
        console.log(product);
        collection.insertOne(product)
        .then(ressult => {
        console.log("One product Added");
        res.send("Success");

  })
    })
//   collection.insertOne(product)
//   .then(res => {
//       console.log("One product Added");
//   })
  // perform actions on the collection object
  console.log("Data base connected");
//   client.close();
});

app.listen(3000);