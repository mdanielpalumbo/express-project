import contenedorMongo from "../../contenedores/contenedorMongo.js";

class daoCarritosMongo extends contenedorMongo {
    constructor() {
        super('carts')
    }
}

export default daoCarritosMongo