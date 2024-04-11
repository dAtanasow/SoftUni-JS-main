const express = require('express');
const app = express();
const PORT = 3030;

app.get('/', (req, res) => {
    res.send('index.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});