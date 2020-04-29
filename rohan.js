const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const MONGODB_URI = 'mongodb://localhost/vue';

const app = express();
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');


app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', authRoutes);
app.use('/admin', adminRoutes);

mongoose.set('useFindAndModify', false)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

        const port = process.env.PORT || 4000;
        app.listen(port, () => console.log(`Listening on port ${port}...`));
        console.log('Connected to MongoDB...');
    })
    .catch(err => console.error('Could not connect to MongoDB...'));