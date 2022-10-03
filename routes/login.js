import express from 'express';
const router = express.Router();
import * as products from "../controller/userlogin.js"
import multer from 'multer';
import path from "path"
import fs from "fs"

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

var storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, './public/uploads/')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb(null, false);
    }
}

const upload = multer({
    storage, fileFilter
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


router.get('/', products.getAllProducts)

router.post('/', products.addProduct)


router.patch('/:id', products.updateProduct)
router.delete('/:id', products.removeProduct)

export default router;