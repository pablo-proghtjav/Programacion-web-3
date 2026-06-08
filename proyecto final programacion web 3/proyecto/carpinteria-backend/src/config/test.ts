import mysql from 'mysql2/promise';
async function test() {
    const pool = mysql.createPool({
        host: "localhost",
        user: "admin",
        password: "1234",
        database: "carpinteria",
    });
    const [rows] = await pool.query("select 1 as test");
    console.log("conexion exitosa"+rows);
}

test();