import { model } from 'mongoose'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;


const pedidoSchema = new Schema({
    _id: { 
        type: ObjectIdSchema, default: function () { return new ObjectId()},
        auto: true 
    },
    _nPedido: Number,
    _objetos:{
        type: Array
    },
    _fecha: Date,
    _idCliente: String,
    _importeTotal: Number
})

export type iPedido = {
    _ID: number | null
    _nPedido: number | null
    _objetos: Array<any> | null
    _fecha: Date | null
    _DNICliente: string | null
    _importeTotal: number | null
}

export const Pedidos = model ('Pedidos', pedidoSchema)