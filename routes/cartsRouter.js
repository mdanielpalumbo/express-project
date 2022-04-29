import express from 'express'
import dao from '../daos/index.js'
import { prods } from './prodsRouter.js'

const cartsRouter = express.Router()

let carts = await dao.daoCarts
carts = new carts.default()

cartsRouter.post('/', async(req, res) => {
    let cart = {
        timestamp: Date.now(),
        productos: []
    }
    try{
        await carts.save(cart)
        res.json(cart)
    }catch(err){
        res.json({
            error: err
        })
    }
})

cartsRouter.get('/:id?', async(req,res) => {
    let { id } = req.params

    if(!id){
        try{
            let cartsArr = await carts.getAll()
            res.json(cartsArr)
        }catch(err){
            console.log(err)
            res.json({
                error: err
            })
        }
    }else{
        try{
            let cart = await carts.getById(id)
            res.json(cart)
        }catch(err){
            res.json({
                error: err
            })
        }
    }
})

cartsRouter.get('/:id/productos', async (req,res) => {
    let { id } = req.params
    try{
        let cart = await carts.getById(id)
        res.json(cart.productos)
    }catch(err){
        res.json({
            error: err
        })
    }
})

cartsRouter.post('/:id/productos/:prod_id', async (req,res) => {
    let prodId = req.params.prod_id
    let cartId = req.params.id
    let prod = await prods.getById(prodId)
    let cart = await carts.getById(cartId)
    if(prod && cart){
        let pre = cart.productos.findIndex(p => p.id == prod.id)
        if(pre != -1){
            cart.productos[pre].cantidad += 1
            try{
                await carts.actById(cart, cartId)
                res.json({
                    status: 'cantidad de producto +1',
                    cart: cart
                })
            }catch(err){
                res.json({
                    error: err
                })
            }
        }else{
            prod.cantidad = 1
            cart.productos.push(prod)
            try{
                await carts.actById(cart, cartId)
                res.json({
                    status: 'producto agregado al carrito',
                    cart: cart
                })
            }catch(err){
                res.json({
                    error: err
                })
            }
        }
    }else{
        res.json({
            error: 'Parametros enviados incorrectos'
        })
    }
})

cartsRouter.delete('/:id/productos/:id_prod', async (req,res) => {
    let prodId = req.params.id_prod
    let cartId = req.params.id
    let prod;
    let cart;
    try{
        prod = await prods.getById(prodId)
        cart = await carts.getById(cartId)
    }catch(err){
        res.json({
            error:err
        })
    }
    if(prod && cart){
        let pre = cart.productos.findIndex(p => p.id == prod.id)
        if(pre != -1){
            if(cart.productos[pre].cantidad == 1){
                cart.productos.splice(pre, 1)
                try{
                    await carts.actById(cart, cartId)
                    res.json({
                        status: 'producto eliminado del carrito',
                        cart: cart})
                }catch(err){
                    res.json({error:err})
                }
            }else{
                cart.productos[pre].cantidad -= 1
                try{
                    await carts.actById(cart, cartId)
                }catch(error){
                    res.json({error: err})
                }
                res.json({
                    status: 'cantidad de producto -1',
                    cart: cart
                })
            }
        }
    }else{
        res.json({error: 'Parametros enviados incorrectos'})
    }  
})


export default cartsRouter