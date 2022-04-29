import express from 'express'
import prodsRouter  from './routes/prodsRouter.js'
import cartsRouter from './routes/cartsRouter.js'

const app = express()

app.use(
    express.json(),
    express.urlencoded({extended:true}),
)

app.use('/api/productos/', prodsRouter)
app.use('/api/carritos/', cartsRouter)

app.listen(8080, () => {
    console.log('servidor conectado correctamente y escuchando el puerto 8080')
})