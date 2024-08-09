import { client } from '../dbconfig.js'


//obtener todos los alumnos
const getalumnos = async (_, res) => {
  try {
    const { rows } = await client.query('SELECT * FROM public."Alumnos"');
    res.json(rows);
  } catch (err) {
    res.send("Alumnos obtenidos con exito")
    res.status(500).json({ error: err.message });
  }
}

// Obtener un alumno 
const getalumnosbyID = async (_, res) => {
  const { id } = req.body.id;
  try {
    const { rows } = await client.query('SELECT * FROM alumnos WHERE ID = ?', [id]);
    if (rows.length === 1) {
      res.send("Alumno obtenido con exito: ")
      res.json(rows[0]);
    }
  } catch (err) {
    res.status(404).json({ error: 'alumno no encontrado' });
  }
};

const createAlumno = async (req, res) => {
  const { ID, nombre, apellido, username, clave, fecha_de_nacimiento, foto, Email, telefono, pais, idiomas } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO alumnos (ID, nombre, apellido, username, clave, fecha_de_nacimiento, foto, E-mail, telefono, pais, idiomas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *',
      [ID, nombre, apellido, username, clave, fecha_de_nacimiento, foto, E - mail, telefono, pais, idiomas]
    );
    res.send("Alumno creado con exito")
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  
  
}

const alumnos = {
  getalumnos,
  getalumnosbyID,
  createAlumno
}

export default alumnos;