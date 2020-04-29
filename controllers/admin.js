const Product = require('../models/product');

exports.postAddProduct = async (req, res, next) => {
    const title = req.body.title;
    const category = req.body.category;
    const description = req.body.description;
    const in_stock = req.body.in_stock;
    try {
        let product = new Product({
            title:title,
            category: category,
            description: description,
            in_stock: in_stock
        });
        product = await product.save();

        console.log('Created Product');
        res.status(200).send(product);
    } catch{ err => {
        console.log(err)
        res.send(400).send('Product is not added') 
    }}

};
exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).send(products)
    } catch{ err =>{
        console.log(err)
        res.status(400).send('Cannot get data')
     } }
};
exports.putEditProduct = async (req, res, next) => {
    const prodId = req.params.productId;
    try{    
        let product = await Product.findById(prodId)
        
        product.title = req.body.title;
        product.category = req.body.category;
        product.description = req.body.description;
        product.in_stock = req.body.in_stock;
        
        product.save();
        console.log('Updated Product!');
        res.status(200).send('Product Updated')
    }catch{err =>{
         console.log(err)
         res.status(400).send('Product cannot update')
        }}
    };

exports.getEditProduct = async (req, res, next) => {
    const prodId = req.params.productId;
    try {
        const product = await Product.findById(prodId);
        if (!product) res.status(400).send('Product is not found');

        res.status(200).send(product)

    } catch{ err => console.log(err) }
};

exports.postDeleteProduct = async (req, res, next) => {
    const prodId = req.params.productId;
    try {
        const product = await Product.findByIdAndRemove(prodId);

        if (!product) return res.status(404).send('The product was not found.');

        console.log('Product Deleted!')
        res.status(200).send(' Product Deleted.');
    } catch{ err => console.log(err) }

};


exports.postCart = async (req, res, next) => {
    const prodId = req.params.productId;
    try {
        const product = await Product.findById(prodId);
        console.log(req.user)
        req.user.addToCart(product);
        console.log('Product added. ')
        res.status(200).send('Product added to Cart');
    } catch{ err => console.log(err) }
};

exports.return = async (req, res, next) => {
    const prodId = req.body.productId;
    try {
        const result = await req.user.removeFromActivity(prodId);
        console.log('Product removed. ')
        res.status(200).send('Product removed from Cart');
    } catch{ err => console.log(err) }
};