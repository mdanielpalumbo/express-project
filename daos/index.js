import {config} from 'dotenv'
config()

const dao = (() => {
    if(process.env.NODE_ENV === 'production'){
        let daoProds = import('./productos/daoProductosFire.js')
        let daoCarts = import('./carrito/daoCarritoFire.js')
        return {
            daoProds: daoProds,
            daoCarts: daoCarts
        }
    }else{
        let daoProds = import ('./productos/daoProductosMongo.js')
        let daoCarts= import('./carrito/daoCarritosMongo.js')
        return {
            daoProds: daoProds,
            daoCarts: daoCarts
        }
    }
})()

export default dao