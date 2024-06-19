import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.lyrics.ovh/v1/";
const GENRENATOR_URL = "https://binaryjazz.us/wp-json/genrenator/v1/story";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    const genreStory = await axios.get(GENRENATOR_URL);
    // console.log(genreStory.data);
    res.render("index.ejs", { 
        story: JSON.stringify(genreStory.data), 
        content: "Lets find a song!" 
    });
});

app.post("/search-lyrics", async (req, res) => {
    try {
        const artistName = req.body.artist;
        const songName = req.body.song;
        const result = await axios.get(
            API_URL + artistName + "/" + songName
        );
        const genreStory = await axios.get(GENRENATOR_URL);
        
        res.render("index.ejs", { 
            story: JSON.stringify(genreStory.data),
            content: result.data.lyrics });
    } catch (error) {
        res.render("index.ejs", { 
            story: JSON.stringify(genreStory.data), 
            content: JSON.stringify(error.response.data) });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})