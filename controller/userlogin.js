import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

let products = [];

export const getAllProducts = (req, res) => {
    fs.readFile('./data/logindata.json', (err, data) => {    
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            // console.log(data)

            res.send(data.toString())
        }
    })
}

// export const getProductImage = (req, res) => {
//     console.log(req.params.image);
//     let filePath = path.join(__dirname, `../uploads/${req.params.image}`);
//     console.log(filePath);
//     console.log(req.params.reqType);
//     if (fs.existsSync(filePath)) {
//         if (req.params.reqType === 'path') {
//             res.send(filePath);
//         }
//         else if (req.params.reqType === 'image') {
//             res.sendFile(filePath);
//         }
//         else {
//             res.send({
//                 error: 'Please Enter Valid Parameter'
//             })
//         }
//     }
//     else {
//         res.send({
//             error: 'File not found'
//         })
//     }
// }

export const addProduct = (req, res) => {
    if (req.body.name && req.body.email && req.body.password && req.body.Organisation) {
        fs.readFile('./data/logindata.json', (err, data) => {
            if (err) console.log(err)
            else {
                data = JSON.parse(data.toString());
                products = [...data];

                products.push({ ...req.body, uid: uuidv4() });
                fs.writeFile("./data/logindata.json", JSON.stringify(products), (err) => {
                    if (err)
                        console.log(err);
                    else {
                        console.log("File written successfully\n");
                        res.send({ msg: "User  added successfully!" })
                    }
                });
            }
        })
    }
    else {
        res.send("this request should contain Username Password")
    }
}

export const updateProduct = (req, res) => {
    console.log(req)
    if (req.params.id) {
        fs.readFile('./data/logindata.json', (err, data) => {
            if (err) console.log(err)
            else {
                data = JSON.parse(data.toString());
                products = [...data];
                const { id } = req.params;
                console.log(products)
                console.log(id)

                let selectedProduct = products.find(product => product.uid === id);
                console.log(selectedProduct);
                if (selectedProduct) {
                    if (req.body.password) selectedProduct.quantity = req.body.password
                    if (req.body.name) selectedProduct.name = req.body.name
                    if (req.body.repassword) selectedProduct.price = req.body.Organisation
                    if (req.body.email) selectedProduct.manufacturer = req.body.email
                
                    console.log(products);
                    fs.writeFile("./data/logindata.json", JSON.stringify(products), (err) => {
                        if (err)
                            console.log(err);
                        else {
                            console.log("File written successfully\n");
                            res.send({ msg: "your product updated successfully!", products })
                        }
                    });
                }
                else {
                    res.send({ error: "Id not found" })
                }
            }
        })
    }
    else {
        res.send({ error: "Please Provide Unique Id" })
    }
}

export const removeProduct = (req, res) => {

    fs.readFile('./data/logindata.json', (err, data) => {
        if (err) console.log(err)
        else {
            data = JSON.parse(data.toString());
            products = [...data];
            const { id } = req.params;
            console.log(products)
            console.log(id)
            products = products.filter(product => product.uid !== id);
            console.log(products);
            fs.writeFile("./data/logindata.json", JSON.stringify(products), (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully\n");
                    res.send({ msg: " User deleted successfully!", products })
                }
            });
        }
    })
}