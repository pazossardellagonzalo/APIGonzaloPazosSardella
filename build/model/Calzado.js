"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calzados = void 0;
const mongoose_1 = require("mongoose");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;
const calzadosSchema = new Schema({
    _id: {
        type: ObjectIdSchema, default: function () { return new ObjectId(); },
        auto: true
    },
    _marca: String,
    _tipo: String,
    _talla: Number,
    _color: String,
    _precio: Number,
    _cBarra: Number
});
exports.Calzados = (0, mongoose_1.model)('calzados', calzadosSchema);
