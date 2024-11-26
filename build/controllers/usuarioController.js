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
exports.usuarioController = void 0;
const database_1 = __importDefault(require("../database"));
class UsuarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.query('SELECT * FROM Usuario');
            res.json({ usuarios });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                yield database_1.default.query('INSERT INTO Usuario set ?', [req.body]);
                res.json({ message: 'User Saved' });
            }
            catch (err) {
                res.status(500).json({ error: 'Error al crear usuario' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            yield database_1.default.query('DELETE FROM Usuario WHERE IdUsuario = ?', [idUser]);
            res.json({ message: 'The user was deleted' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            yield database_1.default.query('UPDATE Usuario set ? WHERE IdUsuario = ?', [req.body, idUser]);
            res.json({ message: 'The user was updated' });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = req.params;
            const usuario = yield database_1.default.query('SELECT * FROM Usuario WHERE IdUsuario = ?', [idUser]);
            if (usuario.length > 0) {
                res.json(usuario[0]);
            }
            else {
                res.status(404).json({ text: 'The user doesn\'t exist' });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
exports.default = exports.usuarioController;
