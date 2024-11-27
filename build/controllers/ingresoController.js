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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingresoController = void 0;
const database_1 = __importDefault(require("../database"));
class IngresoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            try {
                const ingresos = yield database_1.default.query('SELECT * FROM Ingreso WHERE IdUsuario = ?', [idUser]);
                res.json({ ingresos });
            }
            catch (err) {
                res.status(500).json({ error: 'Error al obtener los ingresos' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            const ingreso = req.body;
            console.log('IdUsuario:', idUser);
            console.log('Ingreso:', ingreso);
            // Asignar el idUser al ingreso
            ingreso.IdUsuario = idUser;
            try {
                const result = yield database_1.default.query('INSERT INTO Ingreso SET ?', [ingreso]);
                console.log('Resultado de la inserción:', result); // Log detallado del resultado
                // Verificar que la inserción fue exitosa (affectedRows > 0)
                res.json({ message: 'Ingreso guardado' });
            }
            catch (err) {
                console.error('Error al crear el ingreso:', err); // Log detallado del error
                res.status(500).json({ error: 'Error al crear el ingreso' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, idUser } = req.params;
            try {
                yield database_1.default.query('DELETE FROM Ingreso WHERE IdIngreso = ? AND IdUsuario = ?', [id, idUser]);
                res.json({ message: 'El ingreso fue eliminado' });
            }
            catch (err) {
                res.status(500).json({ error: 'Error al eliminar el ingreso' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, idUser } = req.params;
            const ingreso = req.body;
            console.log('IdIngreso:', id);
            console.log('IdUsuario:', idUser);
            console.log('Ingreso:', ingreso);
            try {
                const result = yield database_1.default.query(`UPDATE Ingreso SET TipoIngreso = ?, OrigenIngreso = ?, Categoria = ?, Monto = ?, FechaIngreso = ? WHERE IdIngreso = ? AND IdUsuario = ?`, [ingreso.TipoIngreso, ingreso.OrigenIngreso, ingreso.Categoria, ingreso.Monto, ingreso.FechaIngreso, id, idUser]);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al actualizar el ingreso' });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, idUser } = req.params;
            try {
                const ingreso = yield database_1.default.query('SELECT * FROM Ingreso WHERE IdIngreso = ? AND IdUsuario = ?', [id, idUser]);
                if (ingreso.length > 0) {
                    res.json(ingreso[0]);
                }
                else {
                    res.status(404).json({ text: 'El ingreso no existe' });
                }
            }
            catch (err) {
                res.status(500).json({ error: 'Error al obtener el ingreso' });
            }
        });
    }
}
exports.ingresoController = new IngresoController();
exports.default = exports.ingresoController;
