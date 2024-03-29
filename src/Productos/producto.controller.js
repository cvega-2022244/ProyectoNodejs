'use string'
import categoriasodel from "../categoria/categorias.model.js"
import productoModel from "./producto.model.js"

export const test = (req,res)=>{
    return res.send('Hello Word')
}

export const agregarProducto = async(req,res)=>{
    try {
        let data = req.body
        let producto = new productoModel(data)
        await producto.save()
        return res.send({message: `Se pudo agregar exitosamente el producto ${producto.nombreProducto} `})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'No se pudo agregar '})

    }
}

export const listar =async(req,res)=>{
    try {
        let producto = await productoModel.find().populate('categoria',['categoria','descripcion'])
        if(producto.length === 0) return res.status(400).send({message: 'No funciono el listar'})
        return res.send({producto})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'No hay productos para listar'})
        
    }
}

export const listaNombre = async(req,res)=>{
    try {
        let {nombreProducto} = req.body
        let producto = await productoModel.findOne({nombreProducto: nombreProducto})
        if(!producto)return res.status(404).send({message: 'Ningun producto tiene este nombre'})
        return res.send({message:'Producto encontrado',producto})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error al listar por nombre'})
    }
}

export const listarCategoria = async(req,res)=>{
    try {
        let {id} = req.params
        let producto = await productoModel.find({categoria: id}).populate('categoria',['categoria','descripcion'])
        if(producto.length === 0) return res.status(400).send({message: 'No se encotro productos en esta categoria'})
        return res.send({producto})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'No se encontro Productos'})
        
    }
}



export const actulizarProducto = async(req,res)=>{
           try {
            let {id}= req.params
            let datos = req.body
            let actulizarProducto = await productoModel.findOneAndUpdate(
                {_id: id},
                datos,
                {new: true}
            )
            if(!actulizarProducto) return res.status(401).send({message: 'No se pudo actualizar'})
            return res.send({message: 'Se actulizo', actulizarProducto})        
        } catch (err) {
            console.error(err)
            return res.status(500).send({message: 'Error al actualizar'})
        }
}

export const eliminarProducto = async(req,res)=>{
    try {
        let {id} = req.params
        let eliminarProducto = await productoModel.findOneAndDelete({_id: id})
        if(!eliminarProducto) return res.status(404).send({message: 'No se encontro el Producto y' })
        return res.send({message: `se elimino exitosamente ${eliminarProducto.nombreProducto} `})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error al eliminarlo'})
        
    }
}

