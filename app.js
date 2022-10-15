require('./utils/dbSql');

const express = require('express')


const cowsay = require('cowsay2');
const owl = require('cowsay2/cows/owl');
const path = require('path');


const apiRoutes = require('./routes/apiRoutes')


const app = express()


const port = process.env.PORT ||  5000
app.use(express.static('public'));


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// Handles any requests that don't match the ones above.
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


//Owl say you if server works
app.listen(port, () => {
    console.log(cowsay.say(`Server working on http://localhost:${port}`, { cow: owl }))
  });
