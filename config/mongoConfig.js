import mongoose from 'mongoose'

export const mongoConfig = () => {
    const rta = mongoose.connect("mongodb://localhost:27017/project", {
        serverSelectionTimeoutMS: 2000,
    }).then(() => {
        console.log('conectado a base de datos mongo')
    })
    
}

