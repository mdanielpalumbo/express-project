import mongoose from 'mongoose'
import { mongoConfig } from '../config/mongoConfig.js'
///// Ya testeado y funcionando /////
export default class contenedorMongo {
    constructor(type) {
        try{
            mongoConfig()
            if(type == "prods"){
                this.sch = new mongoose.Schema({
                    nombre: {type: String, required: true, max: 100},
                    descripcion: {type: String, required: true, maxLength: 100},
                    precio: {type: Number, required: true},
                    thumbnail: {type: String, required: true, maxLength: 150},
                    codigo: {type: String, required:true, maxLength: 10},
                    stock: {type: Number, required: true, maxLength: 200}
                })
                this.collection = mongoose.model(type, this.sch)
                console.log('productos conectada')
            }else if(type == "carts"){
                this.sch = new mongoose.Schema({
                    timestamp: {type: String, required: true, max: 50},
                    productos: {type: Array, required:true}
                })
                this.collection = mongoose.model(type, this.sch)
                console.log('carrito conectada')
            }else{
                throw new Error('tipo incorrecto')
            }
        }catch(err){
            console.error(err)
        }
    }

    getAll = async () => {
        try{
            let content = await this.collection.find({})
            return content
        }catch(err){
            console.log(err)
        }
    }

    getById = async (id) => {
        try{
            let content = await this.collection.find({id: id})
            return content
        }catch(err){
            console.log(err)
        }
    }

    deleteById = async (id) => {
        try{
            let prod = await this.collection.findOne({__id:id})
            if(prod){
                await this.collection.deleteOne({__id: id})
                console.log(`elemento eliminado: ${prod}`)
                return true
            }else{
                console.log('no hay producto que eliminar')
                return false
            }
        }catch(err){
            console.log(err)
        }
    }

    deleteAll = async () => {
        try{
            await this.collection.deleteMany({})
            console.log('Elementos eliminados')
        }catch(err){
            console.log(err)
        }
    }

    save = async (obj) => {
        try{
            let prod = await this.collection.create(obj)
            console.log(prod)
        }catch(err){
            console.log(err)
        }
    }

    actById = async (obj, id) => {
        try{
            let resp = await this.collection.findOneAndUpdate({__id: id},obj)
            console.log(resp)
        }catch(err){
            console.log(err)
        }
    }
}