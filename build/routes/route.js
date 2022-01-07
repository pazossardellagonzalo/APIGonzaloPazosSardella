"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const database_1 = require("../database/database");
const Calzado_1 = require("../model/Calzado");
const Cliente_1 = require("../model/Cliente");
const Marca_1 = require("../model/Marca");
const Pedidos_1 = require("../model/Pedidos");
class DatoRoutes {
    constructor() {
        this.getMarca = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                // const query = await Calzados.find({})
                const query = yield Marca_1.Marcas.aggregate([
                    {
                        $lookup: {
                            from: 'calzados',
                            localField: '_marca',
                            foreignField: '_marca',
                            as: "Marcas"
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getPedidos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const query = yield Pedidos_1.Pedidos.find({});
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getPedido = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const nPedido = req.params.nPedido;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const query = yield Pedidos_1.Pedidos.findOne({ _nPedido: nPedido });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getMarcas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { _marca } = req.params;
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                // const query = await Calzados.find({})
                const query = yield Marca_1.Marcas.aggregate([
                    {
                        $lookup: {
                            from: 'calzados',
                            localField: '_marca',
                            foreignField: '_marca',
                            as: "Marcas"
                        }
                    }, {
                        $match: {
                            _marca: _marca
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.postCalzado = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { marca, tipo, talla, color, precio, cBarra } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                _marca: marca,
                _tipo: tipo,
                _talla: talla,
                _color: color,
                _precio: precio,
                _cBarra: cBarra
            };
            const oSchema = new Calzado_1.Calzados(dSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.putCliente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db
                .conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                const { DNI, nombre, apellidos, pais, extranjero, socio } = req.body;
                yield Cliente_1.Clientes.findOneAndUpdate({
                    _id: id,
                }, {
                    _DNI: DNI,
                    _nombre: nombre,
                    _apellidos: apellidos,
                    _pais: pais,
                    _extranjero: extranjero,
                    _socio: socio
                }, {
                    new: true,
                })
                    .then((docu) => res.send(docu))
                    .catch((fail) => res.send(fail));
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.deleteCalzado = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { marca, cBarra } = req.params;
            yield database_1.db.conectarBD();
            yield Calzado_1.Calzados.findOneAndDelete({ _marca: marca, _cBarra: cBarra })
                .then((doc) => {
                if (doc == null) {
                    res.send(`No encontrado`);
                }
                else {
                    res.send('Borrado correcto: ' + doc);
                }
            })
                .catch((err) => res.send('Error: ' + err));
            database_1.db.desconectarBD();
        });
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/marcas', this.getMarcas),
            this._router.get('/marcas/:_marca', this.getMarca),
            this._router.get('/pedidos', this.getPedidos),
            this._router.get('/pedido/:nPedido', this.getPedido),
            this._router.post('/calzado', this.postCalzado),
            this._router.put("/cliente/:id", this.putCliente);
        this._router.delete("/calzado/:marca/:cBarra", this.deleteCalzado);
    }
}
const obj = new DatoRoutes();
obj.misRutas();
exports.routes = obj.router;
