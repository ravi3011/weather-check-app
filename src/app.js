const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
// define paths for express config
const publicPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templets/views');
const partialPath = path.join(__dirname, '../templets/partials');


// setup handlers engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);


// setup static directory to serve
app.use(express.static(publicPath))

// home page 

app.get('',(req,res) => {

    res.render('index',{
        title:'Weather app',
        name:'Ravi kushwaha'
    });
});

// about page
app.get('/about',(req,res) => {

    res.render('about',{
        title:'About Me',
        info:'This image is 2 year old',
        name:"About kushwaha"
    });
});

// help page
app.get('/help',(req,res) => {

    res.render('help',{
        title:'This is help page',
        info:'Here you can ask questions and post you slutions also for any doubt',
        name:'From kushwaha'
    });
});


app.get('/weather',(req,res) =>{
    if(! req.query.address){
        res.send({
            error:"You must provide a address"
        });
    }

    geocode(req.query.address, (error, { latitude,longitude, location}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude,longitude, (error,forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })

});


app.get('/products',(req,res) =>{
    console.log(req.query);
    res.send({
        products:[]
    });
});


app.get('*',(req, res) =>{
    res.send('<h1>Page not found 404!</h1>')
});

app.listen(port,()=>{
    console.log("Server is up on port "+port);
});

