const express = require('express');
const path = require('path');

const server = express();
const PORT = process.env.PORT || 3000;

const shared = path.join(__dirname, "/dist");

server.use(express.static(shared));

server.get('/*', (req, res) => {
    res.sendFile(path.join(shared, 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Link to open project: http://localhost:${PORT}`);
});
