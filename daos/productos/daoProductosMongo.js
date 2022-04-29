import contenedorMongo from "../../contenedores/contenedorMongo.js";

class daoProductosMongo extends contenedorMongo {
    constructor() {
        super('prods')
    }
}

export default daoProductosMongo