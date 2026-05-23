CREATE TABLE categorias(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    createAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updateAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP()
);

INSERT INTO categorias(nombre,descripcion)VALUES
('Electronica','Dispositivos electronicos y gadgest'),
('Oficina','Material y accesorios de oficina');