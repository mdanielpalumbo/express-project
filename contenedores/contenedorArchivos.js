import * as fs from 'fs'

export default class Contenedor {
    constructor (nombre){
        this.nombre = nombre
    }

    getAll = async () => {
        try{
            const content = await fs.promises.readFile(`./files/${this.nombre}.txt`, 'utf-8')
            return JSON.parse(content)
        }catch(err){
            console.log('archivo no se encontró y se creó uno. ')
            await fs.promises.writeFile(`./files/${this.nombre}.txt`, JSON.stringify([]))
        }
    }

    getById = async (id) => {
        try{
            const content = await this.getAll()
            const searchedCont = content.filter(p => p == p.id)
            console.log(`Se encontró el elemento de id: ${id}`)
            return searchedCont
        }catch(err){
            console.log(err)
        }
    }

    deleteById = async (id) => {
        try{
            const content = await this.getAll()
            const deletedCont =  content.filter(p => p.id != id)
            deletedCont = deletedCont.map(p => {
                if(p.id > id){
                    p.id = p.id - 1
                }
                return p
            })
            await fs.promises.writeFile(`./files/${this.nombre}.txt`)
            console.log(`Se eliminó el elemento de id: ${id}`)
        }catch(err){
            console.log(err)
        }
    }

    deleteAll = async () => {
        await fs.promises.writeFile(`./files/${this.nombre}.txt`, JSON.stringify([]))
        console.log('Todos los elementos han sido elminados')
    }

    save = async (obj) => {
        const content = await this.getAll()
        const i = content.length
        obj.id = i + 1
        content.push(obj)
        try {
            await fs.promises.writeFile(`./files/${this.nombre}.txt`)
            console.log(`Elemento guardado con id: ${obj.id}`)
            return obj.id
        }catch(err){
            console.log('No se pudo guardar' + err)
        }
    }

    actById = async (obj, id) => {
        let content = await this.getAll()
        obj.id = parseInt(id)
        content = content.map(p => {
            if(p.id == id){
                p = {...obj}
            }
            return p
        })
        await fs.promises.writeFile(`./files/${this.nombre}.txt`, JSON.stringify(content))
    }
}