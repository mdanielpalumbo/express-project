import contenedorArchivos from "../../contenedores/contenedorMongo.js";

class daoCarritosArch extends contenedorArchivos {
    constructor() {
        super('carts')
    }
}

export default daoCarritosArch