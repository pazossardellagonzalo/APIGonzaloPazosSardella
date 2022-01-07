"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tiposCalzados = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;
const tipocalzadoSchema = new Schema({
    _id: {
        type: ObjectIdSchema, default: function () { return new ObjectId(); },
        auto: true
    },
    _marca: String,
    _precioExtra: Number,
    _descuento: Number,
    _tipo: String
});
exports.tiposCalzados = (0, mongoose_1.model)('tiposCalzados', tipocalzadoSchema);
