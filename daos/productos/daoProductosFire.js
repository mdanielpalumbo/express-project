import contenedorFirebase from "../../contenedores/contenedorFirebase.js"

class daoProductosFire extends contenedorFirebase {
    constructor() {
        super('prods')
    }
}

export default daoProductosFire