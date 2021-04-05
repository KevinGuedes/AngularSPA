const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Database = require('./database/database')
const app = express()
const port = 3001
const {
    jsonProductToDTO,
} = require('./mapping/productMapper')
const {
    jsonCategoryToDTO
} = require('./mapping/categoryMapper')
const {
    insertProduct,
    updateProduct,
    readProduct,
    deleteProduct,
    readProductById,
    searchProduct
} = require('./database/productProcedures')
const {
    insertCategory,
    updateCategory,
    readCategoryById,
    readCategory,
    deleteCategory,
} = require('./database/categoryProcedures')

// Middlewares
app
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))

//#region Product CRUD
app.post('/products', (req, res) => {
    try {
        Database
            .then(
                async (db) => {
                    await insertProduct(db, jsonProductToDTO(req.body))
                    res.send({
                        success: true,
                    })
                },
                (error) => {
                    res.send(error.message)
                }
            )
    } catch (err) {
        console.log(err.message)
        res.send({
            success: false,
        })
    }
})

app.put('/products/:id', (req, res) => {
    try {
        Database
            .then(
                async (db) => {
                    const product = jsonProductToDTO(req.body)
                    await updateProduct(db, product, req.params.id)
                    res.send(product)
                },
                (error) => {
                    res.send(error.message)
                }
            )
    } catch (err) {
        console.log(err.message)
        res.send({
            success: false,
        })
    }
})

app.get('/products', (req, res) => {
    Database
        .then(
            async (db) => {
                const products = await readProduct(db)
                res.json(products)
            },
            (error) => {
                res.send(error.message)
            }
        )
})

app.delete('/products/:id', (req, res) => {
    Database
        .then(
            async (db) => {
                await deleteProduct(db, req.params.id)
                res.send({
                    success: true,
                })
            },
            (error) => {
                res.status(200).send(error.message)
            }
        )
})
//#endregion

//#region Category CRUD
app.post('/category', (req, res) => {
    try {
        Database
            .then(
                async (db) => {
                    await insertCategory(db, jsonCategoryToDTO(req.body))
                    res.send({
                        success: true,
                    })
                },
                (error) => {
                    res.send(error.message)
                }
            )
    } catch (err) {
        console.log(err.message)
        res.send({
            success: false,
        })
    }
})

app.put('/category/:id', (req, res) => {
    try {
        Database
            .then(
                async (db) => {
                    const category = jsonCategoryToDTO(req.body)
                    await updateCategory(db, category, req.params.id)
                    res.send(category)
                },
                (error) => {
                    res.send(error.message)
                }
            )
    } catch (err) {
        console.log(err.message)
        res.send({
            success: false,
        })
    }
})

app.get('/category', (req, res) => {
    Database
        .then(
            async (db) => {
                const categories = await readCategory(db)
                res.json(categories)
            },
            (error) => {
                res.send(error.message)
            }
        )
})

app.delete('/category/:id', (req, res) => {
    Database
        .then(
            async (db) => {
                await deleteCategory(db, req.params.id)
                res.send({
                    success: true,
                })
            },
            (error) => {
                res.status(200).send(error.message)
            }
        )
})
//#endregion

app.get('/products/:id', (req, res) => {
    Database
        .then(
            async (db) => {
                const product = await readProductById(db, req.params.id)
                res.json(product)
            },
            (error) => {
                res.status(200).send(error.message)
            }
        )
})

app.post('/products/search', (req, res) => {
    Database
        .then(
            async (db) => {
                const products = await searchProduct(db, req.body.minPrice, req.body.maxPrice, req.body.categoryId, req.body.productName)
                res.json(products)
            },
            (error) => {
                res.status(200).send(error.message)
            }
        )
})

app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
})
