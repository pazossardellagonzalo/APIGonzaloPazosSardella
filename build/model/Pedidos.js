"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedidos = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;
const pedidoSchema = new Schema({
    _id: {
        type: ObjectIdSchema, default: function () { return new ObjectId(); },
        auto: true
    },
    _nPedido: Number,
    _objetos: {
        type: Array
    },
    _fecha: Date,
    _idCliente: String,
    _importeTotal: Number
});
exports.Pedidos = (0, mongoose_1.model)('Pedidos', pedidoSchema);
