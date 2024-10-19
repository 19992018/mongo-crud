// open folder
// initialize node: npm init -y
//      package.json file is created automatically
// make an index.js file :-)
//      console.log something
//      To run it type node index.js
//      Alternatively, in package.json scripts add:
//             "serve": "node index.js"
//      The best option is to install nodemon.
//              npm i nodemon -D
//       Now nodemon will be in the dev dependencies in package.json
//       In package.json add the line:
//              "dev": "nodemon index.js"
// Install express (used to build the api* server)
//      package-lock.json file is created automatically
//      In package.json under dependencies we have express
//          copy paste from express website
//          (require express and add an app.listen
//          Later on you can do the app.get method)
//
// At this point, when testing your app, you can use:
//      thunderclient or postman or insomnia
//
// Now that we have a node modules folder, it's a good time to add gitignore
//      In gitignore simply add the line
//          node_modules
//
// From here we can start thinking Mongo DB.
// We started off by going to cloud.mongodb.com
// We then went through sign in procedures, created a cluster and connected our to db successfully!
// You may need some training wheels for this cloud.mongodb.com section.
// See this tutorial: https://www.youtube.com/watch?v=_7UQPve99r4&list=PLEyuti7kEAPeWuBDB7IBwpEWmLj_tN-Xt&index=1
// from min 20:30
// To connect to your database, install mongoose and mongo db
// Get your connection string from cloud.mongodb.com
// Add the mongoose.connect code from npmjs.com (search up mongoose over here)

// Create a models folder
// create a file(js: here we called it products.models.js)
// go to mongoose documentation(on npmjs.org). It'll give you some guidance
// create your schema and model and export your model

// come back to index.js
// create a post request and test it out on postman or insomnia
// This would be a good time to add
//      app.use(express.json())
//          to index.js

// Now it's actual MongoDB implementaion Time
// Import your (Products) model from where it was located
// Still in index.js under a post function, do a create method on the Products object:
//    app.post("/api/products", async (req, res) => {
//      try {
//        const product = await Product.create(req.body);
//        res.status(200).json(product);
//      } catch (error) {
//        res.status(500).json({ message: error.message });
//      }
//    });

// Test on insomnia by creating a new product and making a post request
// Go to cloud.mongodb.com and check if your product is in the database <3

//Take it up from 29:20
//Create a .env file and place your connection string there ()

//

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const { Product } = require("./models/product.model.js");
const MONGO_URL = process.env.MONGO_URL;

const app = express();
app.use(express.json());

app.get("/", function (req, res) {
  res.send(
    "Welcome to Maggie's database app.</br> Added nodemon.</br>Testing break(br) :). </br> It works"
  );
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // const newProduct = req.body;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    // I dont think check is necessary here
    if (!product) {
      res.status(404).json({ message: "product not found" });
    }

    await Product.findById(id);
    res.status(200).json({ message: "Product deleted successfully" });

    // const deletedProduct = await Product.findById(id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Successfully connected to database. Woohoo!");
    app.listen(3000, () => {
      console.log("App is running on port 3000. Yeey!");
    });
  })
  .catch(() => console.log("Failed to connect :-(..."));
