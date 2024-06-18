import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.lyrics.ovh/v1/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "Lets find a song!" })
})

app.get("/search-lyrics", async (req, res) => {
    try {
        const artistName = req.body.artist;
        const songName = req.body.song;
        const result = await axios.get(
            API_URL + 
            artistName + "/" + 
            songName
        );
        res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})