IF NOT EXISTS (SELECT 1 FROM Productos)
BEGIN
    INSERT INTO Productos (Nombre, Precio, Imagen, Tipo, Color, Descripcion, Activo, CreatedAt, UpdatedAt)
    VALUES
        ('Remera Básica Blanca', 5999.99, NULL, 'remera', 'Blanco', 'Remera de algodón 100%, corte clásico, ideal para el día a día', 1, GETDATE(), GETDATE()),
        ('Remera Deportiva Negra', 7499.99, NULL, 'remera', 'Negro', 'Remera técnica con tecnología dry-fit, perfecta para deportes', 1, GETDATE(), GETDATE()),
        ('Remera Estampada Azul', 6999.99, NULL, 'remera', 'Azul', 'Remera con estampado moderno, 100% algodón premium', 1, GETDATE(), GETDATE()),
        ('Pantalón Jean Clásico', 15999.99, NULL, 'pantalon', 'Azul Oscuro', 'Jean de corte recto, mezclilla de alta calidad, bolsillos funcionales', 1, GETDATE(), GETDATE()),
        ('Pantalón Jogger Negro', 12999.99, NULL, 'pantalon', 'Negro', 'Pantalón jogger de algodón con elastano, cintura elástica con cordón', 1, GETDATE(), GETDATE()),
        ('Pantalón Cargo Beige', 18999.99, NULL, 'pantalon', 'Beige', 'Pantalón cargo con múltiples bolsillos, tela resistente', 1, GETDATE(), GETDATE());
    
END
ELSE
BEGIN
    DELETE FROM ProductosVentas
    DELETE FROM Productos
    DELETE FROM Ventas
END
GO