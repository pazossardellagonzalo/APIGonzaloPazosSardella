import { model } from 'mongoose'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;


const marcaSchema = new Schema({
    _id: { 
        type: ObjectIdSchema, default: function () { return new ObjectId()},
        auto: true 
    },
    _marca : String,
    _precioExtra : Number,
    _descuento : Number,
    _tipo : String,
    _talla : Number,
    _color : String,
    _precio : Number
})

export type oMarca = {
    _id : null
    _marca : string | null
    _precioExtra : number | null
    _descuento : number | null
}

export const Marcas = model('marcas', marcaSchema)