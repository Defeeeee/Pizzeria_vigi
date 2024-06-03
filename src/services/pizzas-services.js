import {config} from "../../dbconfig.js"
import {createPool} from "mysql2/promise"

const connection  = createPool(config)

export async function getAll() {
    const [rows, _] = await connection.query('SELECT * FROM Pizza')
    return rows
}

export async function getById(id) {
    const [rows, _] = await connection.query('SELECT * FROM Pizza WHERE id = ?', [id])
    if (rows.length === 0) {
        return null
    } else {
        return rows[0]
    }
}

export async function insert(pizza) {
    const [result, _] = await connection.query('INSERT INTO Pizza (nombre, libreGluten, importe, descripcion) VALUES (?, ?, ?, ?)', [pizza.nombre, pizza.libreGluten, pizza.importe, pizza.descripcion])
    return result
}

export async function update(pizza) {
    const [result, _] = await connection.query('UPDATE Pizza SET nombre = ?, libreGluten = ?, importe = ?, descripcion = ? WHERE id = ?', [pizza.nombre, pizza.libreGluten, pizza.importe, pizza.descripcion, pizza.id])
    return result
}

export async function deleteById(id) {
    const [result, _] = await connection.query('DELETE FROM Pizza WHERE id = ?', [id])
    return result
}