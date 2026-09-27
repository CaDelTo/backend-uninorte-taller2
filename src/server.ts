import express, { Request, Response } from "express";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const products: Product[] = [
  { id: 1, name: "Teclado mecánico", price: 250000, stock: 15 },
  { id: 2, name: "Mouse inalámbrico", price: 90000, stock: 40 },
  { id: 3, name: "Monitor 27 pulgadas", price: 1200000, stock: 8 },
  { id: 4, name: "Audífonos", price: 180000, stock: 25 },
];

const port = Number(process.env.PORT);

if (!Number.isInteger(port) || port <= 0) {
  console.error("La variable de entorno PORT es obligatoria y debe ser un número válido");
  process.exit(1);
}

const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.json({
    name: "backend-api",
    version: "1.0.0",
    description: "API REST de productos",
    endpoints: ["GET /", "GET /health", "GET /api/products", "GET /api/products/:id"],
  });
});

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "backend-api" });
});

app.get("/api/products", (_req: Request, res: Response) => {
  res.json(products);
});

app.get("/api/products/:id", (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({ error: "El id debe ser un número entero" });
    return;
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    res.status(404).json({ error: `Producto con id ${id} no encontrado` });
    return;
  }

  res.json(product);
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(port, () => {
  console.log(`backend-api escuchando en el puerto ${port}`);
});
