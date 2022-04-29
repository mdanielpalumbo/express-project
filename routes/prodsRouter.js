import express from 'express'
import dao from '../daos/index.js'

const prodsRouter = express.Router()
  
let prods = await dao.daoProds
prods = new prods.default('prods')


prodsRouter.get('/:id?', async (req, res) => {
    let { id } = req.params
    if(!id){
        try{
            const content = await prods.getAll()
            console.log(content.length)
            res.json(content)
        }catch(err){
            console.log(err)
            res.send('no products')
        }
    }else{
        try{
            const content = await prods.getById(id)
            res.send(content)
        }catch(error){
            res.send('error')
        }
    }
})

prodsRouter.post('/', async (req,res) =>{
    try{
        let prod = {...req.body}
        await prods.save(prod)
        res.json(prod)
    }catch(err){
        console.log(err)
    }
})

prodsRouter.put('/:id?', async (req,res) => {
    let { id } = req.params
    let prod = {...req.body}
    try{
        let response = await prods.actById(prod, id)
        if(response){
            res.json({
                status: 'updated',
                id: id
            })
        }else{
            res.json({
                status: 'error, not found',

            })
        }
    }catch(err){
        console.log(err)
    }
})

prodsRouter.delete('/:id?', async (req,res) => {
    let { id } = req.params
    try{
        let response = await prods.deleteById(id)
        if(response){
            res.json({
                status: 'deleted',
                id: id
            })
        }else{
            res.json({
                status: 'error, not found'
            })
        }
    }catch(error){
        console.log(error)
    }
})

export default prodsRouter

export { prods }