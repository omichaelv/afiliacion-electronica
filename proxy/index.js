require('dotenv').config();
const express = require('express');
const affiliationRoutes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(express.json({limit: '50mb', extended: true,parameterLimit: 9000000000000000 }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true,parameterLimit: 9000000000000000  }));
app.use(cors());


app.use('', affiliationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});