import { Request, Response } from 'express';
import pool from '../database';

class IngresoController {
  public async list(req: Request, res: Response): Promise<void> {
    const { idUser } = req.params;
    try {
      const ingresos = await pool.query('SELECT * FROM Ingreso WHERE IdUsuario = ?', [idUser]);
      res.json({ ingresos });
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener los ingresos' });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { idUser } = req.params;
    const ingreso = req.body;
  
    console.log('IdUsuario:', idUser);
    console.log('Ingreso:', ingreso);
  
    // Asignar el idUser al ingreso
    ingreso.IdUsuario = idUser;
  
    try {
      const result = await pool.query('INSERT INTO Ingreso SET ?', [ingreso]);
  
      console.log('Resultado de la inserción:', result);  // Log detallado del resultado
  
      // Verificar que la inserción fue exitosa (affectedRows > 0)
     
        res.json({ message: 'Ingreso guardado' });
      
    } catch (err) {
      console.error('Error al crear el ingreso:', err);  // Log detallado del error
      res.status(500).json({ error: 'Error al crear el ingreso' });
    }
  }
  
  

  public async delete(req: Request, res: Response): Promise<void> {
    const { id, idUser } = req.params;
    try {
      await pool.query('DELETE FROM Ingreso WHERE IdIngreso = ? AND IdUsuario = ?', [id, idUser]);
      res.json({ message: 'El ingreso fue eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar el ingreso' });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id, idUser } = req.params;
    const ingreso = req.body;
    
    console.log('IdIngreso:', id);
    console.log('IdUsuario:', idUser);
    console.log('Ingreso:', ingreso);
    
    try {
      const result = await pool.query(`UPDATE Ingreso SET TipoIngreso = ?, OrigenIngreso = ?, Categoria = ?, Monto = ?, FechaIngreso = ? WHERE IdIngreso = ? AND IdUsuario = ?`,
        [ingreso.TipoIngreso, ingreso.OrigenIngreso, ingreso.Categoria, ingreso.Monto, ingreso.FechaIngreso, id, idUser]
      );
       
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar el ingreso' });
    }
  }
  

  public async getOne(req: Request, res: Response): Promise<void> {
    const { id, idUser } = req.params;
    try {
      const ingreso = await pool.query('SELECT * FROM Ingreso WHERE IdIngreso = ? AND IdUsuario = ?', [id, idUser]);
      if (ingreso.length > 0) {
        res.json(ingreso[0]);
      } else {
        res.status(404).json({ text: 'El ingreso no existe' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener el ingreso' });
    }
  }
}

export const ingresoController = new IngresoController();
export default ingresoController;
