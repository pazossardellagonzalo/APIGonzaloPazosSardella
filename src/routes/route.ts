import { Request, Response, Router } from 'express'
import { Dirent } from 'fs'
import { db } from '../database/database'
import { Calzados, oCalzado } from '../model/Calzado'
import { Clientes, iCliente, iExtranjero, iSocio } from '../model/Cliente'
import { Marcas, oMarca } from '../model/Marca'
import { Pedidos, iPedido } from '../model/Pedidos'
import { tiposCalzados, otipoCalzado } from '../model/tipoCalzado'

class DatoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router() {
        return this._router
    }

    private getMarca = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then(async (mensaje) => {
            // const query = await Calzados.find({})
            const query = await Marcas.aggregate([
                {
                    $lookup: {
                        from: 'calzados',
                        localField: '_marca',
                        foreignField: '_marca',
                        as: "Marcas"
                    }
                }
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }
    
    private getPedidos = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then(async (mensaje) => {
            const query = await Pedidos.find({})
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private getPedido = async (req:Request, res: Response) => {
        const nPedido = req.params.nPedido
        await db.conectarBD()
        .then(async (mensaje) => {
            const query = await Pedidos.findOne({_nPedido: nPedido})
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }


    private getMarcas = async (req:Request, res: Response) => {
        const { _marca } = req.params
        await db.conectarBD()
        .then(async (mensaje) => {
            // const query = await Calzados.find({})
            const query = await Marcas.aggregate([
                {
                    $lookup: {
                        from: 'calzados',
                        localField: '_marca',
                        foreignField: '_marca',
                        as: "Marcas"
                    }
                }, {
                    $match: {
                        _marca:_marca
                    }
                }
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private postCalzado = async (req: Request, res: Response) => {
        const { marca, tipo, talla, color, precio, cBarra} = req.body
        await db.conectarBD()
        const dSchema=
        {
            _marca:marca,
            _tipo:tipo,
            _talla:talla,
            _color:color,
            _precio:precio,
            _cBarra:cBarra
        }
        const oSchema = new Calzados(dSchema)
        await oSchema.save()
            .then( (doc: any) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }

    private putCliente = async (req: Request, res: Response) => {
        await db
          .conectarBD()
          .then(async (mensaje) => {
            const {id} = req.params
            const { DNI, nombre, apellidos, pais, extranjero, socio } = req.body
            await Clientes.findOneAndUpdate(
              {
                _id: id,
              },
              {
                _DNI: DNI,
                _nombre: nombre,
                _apellidos: apellidos,
                _pais : pais,
                _extranjero: extranjero,
                _socio: socio
              },
              {
                new: true,
              }
            )
              .then((docu: any) => res.send(docu))
              .catch((fail: any) => res.send(fail));
          })
          .catch((mensaje) => {
            res.send(mensaje);
          });
    
        db.desconectarBD();
    }

    private deleteCalzado = async (req: Request, res: Response) => {
        const { marca, cBarra } = req.params
        await db.conectarBD()
        await Calzados.findOneAndDelete(
                { _marca: marca, _cBarra: cBarra }
            )
            .then( (doc: any) => {
                    if (doc == null) {
                        res.send(`No encontrado`)
                    }else {
                        res.send('Borrado correcto: '+ doc)
                    }
            })
            .catch( (err: any) => res.send('Error: '+ err)) 
        db.desconectarBD()
    }

    misRutas() {
        this._router.get('/marcas', this.getMarcas),
        this._router.get('/marcas/:_marca', this.getMarca),
        this._router.get('/pedidos', this.getPedidos),
        this._router.get('/pedido/:nPedido', this.getPedido),
        this._router.post('/calzado', this.postCalzado),
        this._router.put("/cliente/:id", this.putCliente)
        this._router.delete("/calzado/:marca/:cBarra", this.deleteCalzado)
    }

}

const obj = new DatoRoutes()
obj.misRutas()
export const routes = obj.router