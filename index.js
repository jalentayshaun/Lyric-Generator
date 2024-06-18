import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.lyrics.ovh/v1/";

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})