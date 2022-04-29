import db from '../config/firebaseConfig.js'

export default class contenedorFirebase{
    constructor(type){
        if(type === 'prods'){
            this.query = db.collection('prods')
            console.log(`conectado a ${type}`)
        }else if(type === 'carts'){
            this.query = db.collection('carts')
            console.log(`conectado a ${type}`)
        }
    }
    
    getAll = async () => {
        try{   
            let content = await this.query.get()
            content = content.docs.map(doc => {
                return {...doc.data(), id: doc.id}
            })
            return content
        }catch(err){
            console.log(err)
        }
    }

    save = async (obj) => {
        try{
            let doc = this.query.doc()
            await doc.create(obj)
        }catch(err){
            console.log(err)
        }
    }

    getById = async (id) => {
        try{
            let doc = this.query.doc(`${id}`)
            let prod = await doc.get()
            prod = prod.data()
            return prod
        }catch(err){
            console.log(err)
        }
    }

    deleteById = async (id) => {
        try {
            let doc = this.query.doc(`${id}`)
            await doc.delete()
            return(true)
        } catch (error) {
            console.log(error)
            return(false)
        }
    }

    actById = async (obj, id) => {
        try{
            let doc = this.query.doc(`${id}`)
            await doc.update(obj)
            return(true)
        }catch(err){
            console.log(err)
            return(false)
        }
    }

}

