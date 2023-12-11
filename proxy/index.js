require('dotenv').config();
const express = require('express');
const affiliationRoutes = require('./routes');
const app = express();

app.use(express.json());

app.use('/proxy', affiliationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});