const express = require("express")
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"))
app.get("/",async (req,res)=>{
    let fetchUser= await fetch("https://ipinfo.io/json?token=2e500a64745608");
    const user = await fetchUser.json();
    const userCity = user.city;
    console.log(userCity);
    const fetchWeather = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=c53863ec3574c2f30336dbcf7bef0d50")
    const weatherInfo = await fetchWeather.json();
    console.log(weatherInfo);
    res.render("home",{Location : weatherInfo.name,     WindSpeed : weatherInfo.wind.speed,
        Pressure : weatherInfo.main.pressure,
        temp : Math.round(weatherInfo.main.temp - 273),
        tempMin : Math.round(weatherInfo.main.temp_min - 273),
        feelslike : Math.round(weatherInfo.main.feels_like -273),
        tempMax : Math.round(weatherInfo.main.temp_max -273),
        Humidity : weatherInfo.main.humidity,
        visibility : weatherInfo.visibility,
        Icon : weatherInfo.weather[0].icon,
        Description : _.capitalize(weatherInfo.weather[0].description)
    });
});

app.post("/",async (req,res)=>{
    const City=  _.capitalize(req.body.city);
    const fetchWeather = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + City + "&appid=c53863ec3574c2f30336dbcf7bef0d50")
    const weatherInfo = await fetchWeather.json();
    console.log(weatherInfo);
    res.render("home",{Location : weatherInfo.name,     WindSpeed : weatherInfo.wind.speed,
        Pressure : weatherInfo.main.pressure,
        temp : Math.round(weatherInfo.main.temp - 273),
        tempMin : Math.round(weatherInfo.main.temp_min - 273),
        feelslike : Math.round(weatherInfo.main.feels_like -273),
        tempMax : Math.round(weatherInfo.main.temp_max -273),
        Humidity : weatherInfo.main.humidity,
        visibility : weatherInfo.visibility,
        Icon : weatherInfo.weather[0].icon,
        Description : weatherInfo.weather[0].description
    });
})

app.listen(3000,()=>{
    console.log("server running.. ");
});


// https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=c53863ec3574c2f30336dbcf7bef0d50

// https://openweathermap.org/img/wn
// 2e500a64745608
// https://ipinfo.io/json?token=2e500a64745608