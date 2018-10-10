const mongoose = require('mongoose');
const Product = require('../models/Product');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        } else {
            next({ message: 'That filetype isn\'t allowed!' }, false);
        }
    }
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
    if (!req.file) {
        next();
        return;
    };
    const extension = req.file.mimetype.split('/')[1];
    req.body.image = `${uuid.v4()}.${extension}`;
    const image = await jimp.read(req.file.buffer);
    await image.resize(320, 320);
    await image.write(`../public/images/${req.body.image}`);
    next();
};

exports.createProduct = async (req, res) => {
    const product = await (new Product(req.body)).save();
    res.send(product);
};

exports.getProducts = async (req, res) => {
    const query = (req.params.id) ? { _id: req.params.id, } : {};
    const productsPromise = Product.find(query, {
        low: 0,
        createdAt: 0,
        updatedAt: 0
    })
        .where({ low: null });
    const countPromise = Product.count();

    const [products, count] = await Promise.all([productsPromise, countPromise]);
    console.log('products', products);
    console.log('count', count);
    const result = {
        products,
        count
    }
    res.send(result);
};

exports.updateProduct = async (req, res) => {
    console.log('*/*/*/*/*/*');
    console.log(req.params.id);
    const product = await Product.findOneAndupdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    }).exec();
    console.log('product', product);
    res.send(product);
};

exports.deleteProduct = async (req, res) => {
    const product = await Product.findOneAndUpdate({ _id: req.params.id }, { low: Date.now() }).exec();
    res.send(true);
};