import { model } from 'mongoose'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;


const calzadosSchema = new Schema({
    _id: { 
        type: ObjectIdSchema, default: function () { return new ObjectId()},
        auto: true 
    },
    _marca: String,
    _tipo: String,
    _talla: Number,
    _color: String,
    _precio: Number,
    _cBarra: Number
})

export type oCalzado = {
    _id: null
    _tipo: string | null
    _marca: string | null
    _precioExtra: number | null
    _descuento: number | null
    _talla: number | null
    _color: string | null
    _precio: number | null
    _cBarra: number | null
}

export const Calzados = model('calzados', calzadosSchema)