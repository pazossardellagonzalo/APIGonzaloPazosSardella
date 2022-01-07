import { model } from 'mongoose'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const clienteSchema = new Schema({
    _id: { 
        type: ObjectIdSchema, default: function () { return new ObjectId()},
        auto: true 
    },
    _DNI : Number,
    _nombre : String,
    _apellidos : String,
    _pais : String,
    _extranjero : Boolean,
    _socio : Boolean
})

export type iCliente = {
    _id : null
    _DNI : number | null
    _nombre : string | null
    _apellidos : string | null
    _pais : string | null
}

export type iExtranjero = {
    _id : null
    _DNI : number | null
    _nombre : string | null
    _apellidos : string | null
    _pais : string | null
    _extranjero : boolean | null
}

export type iSocio = {
    _id : null
    _DNI : number | null
    _nombre : string | null
    _apellidos : string | null
    _pais : string | null
    _socio : boolean | null
}

export const Clientes = model('clientes', clienteSchema)