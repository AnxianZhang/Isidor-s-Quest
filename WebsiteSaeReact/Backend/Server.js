const express = require('express');
const app = express();
const cors = require('cors');
const {Inscription, Connexion} = require("./Controller/userController");
app.use(cors({
    allowedHeaders: ['Content-Type'] 
  }));
  
app.use(express.json());
app.post("/inscription", Inscription);
app.post("/connexion", Connexion)
const port = 3005

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

