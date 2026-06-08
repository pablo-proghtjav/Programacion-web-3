import mysql from 'mysql2/promise';
import type { Pool } from 'mysql2/promise';
// Configuramos la conexión
export const pool:Pool = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: '1234',
    database: 'carpinteria',
});
//export default pool;