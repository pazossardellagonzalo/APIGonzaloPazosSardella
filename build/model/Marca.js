"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Marcas = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;
const marcaSchema = new Schema({
    _id: {
        type: ObjectIdSchema, default: function () { return new ObjectId(); },
        auto: true
    },
    _marca: String,
    _precioExtra: Number,
    _descuento: Number,
    _tipo: String,
    _talla: Number,
    _color: String,
    _precio: Number
});
exports.Marcas = (0, mongoose_1.model)('marcas', marcaSchema);
