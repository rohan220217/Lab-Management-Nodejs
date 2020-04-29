const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Product = require('../models/product')
exports.getProduct = async (req, res, next) => {
    const prodId = req.params.productId;
    try {
        const product = await Product.findById(prodId);
        res.status(200).send(product)
    
    } catch{ err => console.log(err) };

};
exports.postSignup = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const userdoc = await User.findOne({ email: email });
        if (userdoc) {
            return res.status(400).send('User already Exist')
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        let user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            activity: { items: [] }
        })
        user = await user.save();
        console.log('User Created!');
        res.status(200).send("User Created")

    } catch{ err => res.status(400).send(err) }

};
exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
           return res.status(400).send('User not exist');
        };
        const doMatch = await bcrypt.compare(password, user.password);
        if (doMatch) {
            const name = user.name
            req.user = user;
            res.status(200).send(name);
            console.log('User logged IN ')
        } else {
            return res.status(400).send('User not exist');
        }
    } catch{
        err => {
            console.log(err)
            res.status(400).send('User not exist');
        }
    };
}

exports.postLogout = (req, res, next) => {
    
    console.log('logout')
};


