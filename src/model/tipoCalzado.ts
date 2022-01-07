import { model } from 'mongoose'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;


const tipocalzadoSchema = new Schema({
    _id: { 
        type: ObjectIdSchema, default: function () { return new ObjectId()},
        auto: true 
    },
    _marca : String,
    _precioExtra: Number,
    _descuento: Number,
    _tipo : String
})

export type otipoCalzado = {
    _id : null
    _marca : string | null
    _precioExtra : number | null
    _descuento : number | null
    _tipo : string | null
}

export const tiposCalzados = model('tiposCalzados', tipocalzadoSchema)