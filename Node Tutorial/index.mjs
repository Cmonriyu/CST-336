import express from 'express';
import solarsystem from 'npm-solarsystem';

const app = express();
app.set("view engine", "ejs");

let solarsystemdata = solarsystem;

app.use(express.static("public"));

app.get('/', async (req, res) => {
    try {
        let url = 'https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&per_page=50&orientation=horizontal&q=solar%20system';
        let response = await fetch(url);
        if (!response.ok){

            throw new Error('error status: ${response.status}');
        }

        let data = await response.json();
        
        let images = [];
        for (let i = 0; i < 4; i++) {
            let randomIndex = Math.floor(Math.random() * data.hits.length);
            let pic = data.hits[randomIndex].webformatURL;
            if (!images.includes(pic)) {
                images.push(pic);
            }
        }

        res.render('home.ejs', { images: images });
    } catch (error) {
            
        res.render('home.ejs', { images: [] });
    }

});

app.get('/planetInfo', (req, res) => {
    let planet = req.query.planet;
    let planetData;

    if (planet === 'Mercury') {
        planetData = solarsystemdata.getMercury();
    } else if (planet === 'Venus') {
        planetData = solarsystemdata.getVenus();
    } else if (planet === 'Earth') {
        planetData = solarsystemdata.getEarth();
    } else if (planet === 'Mars') {
        planetData = solarsystemdata.getMars();
    } else if (planet === 'Jupiter') {
        planetData = solarsystemdata.getJupiter();
    } else if (planet === 'Saturn') {
        planetData = solarsystemdata.getSaturn();
    } else if (planet === 'Uranus') {
        planetData = solarsystemdata.getUranus();
    } else if (planet === 'Neptune') {
        planetData = solarsystemdata.getNeptune();
    } else if (planet === 'Pluto') {
        planetData = solarsystemdata.getPluto();
    }

    res.render('planet.ejs', { data: planetData, planetName: planet });
});
app.listen(3000, () => {
    console.log('server started');
});
