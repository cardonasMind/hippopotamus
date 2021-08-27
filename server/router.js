const express = require('express');
const router = express.Router();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://hippopotamus-client.vercel.app/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', (req, res) => {
    res.send("Server is running!");
});

module.exports = router;