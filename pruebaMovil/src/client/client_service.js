import { response } from "express";
import { connection } from "../common/connection.js";
import "dotenv/config.js"

// Función para obtener todos los clientes de la base de datos
const find = (req, res = response) => {
  connection.query(
    // Realiza una consulta SQL para seleccionar todos los campos de los clientes y sus condiciones y medios de pago asociados
    `SELECT c.Documento,
    c.Documento, c.Nombre, c.Apellido1, c.Apellido2, c.Dirección, c.Teléfono, c.CorreoElectrónico, 
    c.Ciudad, cp.Nombre AS CondicionPago, c.ValorCupo, mp.Nombre AS MedioPago, c.Estado, c.FechaHoraAuditoria
    FROM CLIENTES c
    INNER JOIN CONDICION_PAGO cp ON c.CondicionPagoID = cp.ID
    INNER JOIN MEDIO_PAGO mp ON c.MedioPagoID = mp.ID;
    `,
    // Los parámetros para la consulta están vacíos, ya que esta consulta no necesita valores específicos
    [],
    function (err, result, fields) {
      // Si no se encuentran resultados, devuelve un código de estado 404 y un mensaje de error
      result.length == 0
      ? res.status(404).json({ response: process.env.DEFAULT })
      : res.json(result);
    }
  );
};

// Función para obtener un cliente por su número de documento
const findone = (req, res = response) => {
  connection.query(
    // Realiza una consulta SQL para seleccionar los campos del cliente y sus condiciones y medios de pago asociados
    `SELECT c.Documento, c.Nombre, c.Apellido1, c.Apellido2, c.Dirección, c.Teléfono, c.CorreoElectrónico, c.Ciudad, cp.Nombre AS CondicionPago, c.ValorCupo, mp.Nombre AS MedioPago, c.Estado, c.FechaHoraAuditoria 
    FROM CLIENTES c 
    INNER JOIN CONDICION_PAGO cp ON c.CondicionPagoID = cp.ID 
    INNER JOIN MEDIO_PAGO mp ON c.MedioPagoID = mp.ID WHERE c.Documento = ?;
    `,
    // Los parámetros para la consulta se obtienen del parámetro de ruta 'documento' de la solicitud
    [req.params.documento],
    function (err, result, fields) {
      // Si no se encuentra el cliente, devuelve un código de estado 404 y un mensaje de error
      result.length == 0
      ? res.status(404).json({ response: process.env.DEFAULT })
      : res.json(result);
    }
  );
};

// Función para crear un nuevo cliente en la base de datos
const create = (req, res = response) => {
  // Extraer los datos del nuevo cliente del cuerpo de la solicitud
  const { Documento, Nombre, Apellido1, Apellido2, Dirección, Teléfono, CorreoElectrónico, Ciudad, CondicionPagoID, ValorCupo, MedioPagoID, Estado } = req.body;
 
  connection.query(
    // Realiza una consulta SQL para insertar un nuevo cliente en la tabla CLIENTES con NOW() para FechaHoraAuditoria
    `INSERT INTO CLIENTES (Documento, Nombre, Apellido1, Apellido2, Dirección, Teléfono, CorreoElectrónico, Ciudad, CondicionPagoID, ValorCupo, MedioPagoID, Estado, FechaHoraAuditoria)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW());
    `,
    // Los valores para la consulta se obtienen de las variables extraídas del cuerpo de la solicitud
    [Documento, Nombre, Apellido1, Apellido2, Dirección, Teléfono, CorreoElectrónico, Ciudad, CondicionPagoID, ValorCupo, MedioPagoID, Estado],
    function (err, result, fields) {
      // Si ocurre un error, devuelve el mensaje de error; de lo contrario, devuelve el resultado de la inserción
      err 
      ? res.status(500).json({ error: err.message }) 
      : res.status(200).json({ message: 'Cliente creado exitosamente' });
    }
  );
};

// Función para eliminar un cliente de la base de datos por su número de documento
const remove = (req, res = response) => {
  // Extraer el número de documento del parámetro de ruta
  const { documento } = req.params;
  connection.query (
    // Realiza una consulta SQL para eliminar un cliente de la tabla CLIENTES
    `DELETE FROM CLIENTES
    WHERE Documento = ?;
    `,
    // El valor para la consulta se obtiene del parámetro de ruta 'documento' de la solicitud
    [documento],
    function(err, result, fields) {
      // Si ocurre un error, devuelve el mensaje de error; de lo contrario, devuelve el resultado de la eliminación
      err ? res.json(err) : res.json(result);
    }
  );
};


// Función para actualizar un cliente en la base de datos
const update = (Documento, newData) => {
  const { Nombre, Apellido1, Apellido2, Dirección, Teléfono, CorreoElectrónico, Ciudad, ValorCupo, Estado } = newData;

  return new Promise((resolve, reject) => {
    connection.query(
      `
      UPDATE CLIENTES SET Nombre = ?, Apellido1 = ?, Apellido2 = ?, Dirección = ?, Teléfono = ?,
      CorreoElectrónico = ?, Ciudad = ?, ValorCupo = ?, Estado = ?, FechaHoraAuditoria = NOW()
      WHERE Documento = ?;
      `,
      [Nombre, Apellido1, Apellido2, Dirección, Teléfono, CorreoElectrónico, Ciudad, ValorCupo, Estado, Documento],
      (error, result) => {
        if (error) {
          reject(new Error('Error al actualizar el cliente: ' + error.message));
        } else {
          if (result.affectedRows > 0) {
            resolve('Cliente actualizado correctamente');
          } else {
            resolve('No se pudo encontrar el cliente para actualizar');
          }
        }
      }
    );
  });
};


export { find,create,remove, findone ,update };