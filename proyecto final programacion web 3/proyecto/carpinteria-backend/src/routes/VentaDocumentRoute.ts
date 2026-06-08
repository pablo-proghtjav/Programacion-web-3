import { Router } from "express";

import { VentaDocumentController } from "../controller/VentaDocumentController";

import { VentaDocument } from "../document/VentaDocument";
import { VentaDocumentImpl } from "../document/Implements/VentaDocumentImpl";

import { VentaDaoImpl } from "../dao/implements/VentaDaoImpl";

const router = Router();

// DAO
const ventaDao = new VentaDaoImpl();

// DOCUMENT SERVICE
const ventaDocument: VentaDocument = new VentaDocumentImpl(ventaDao);

// CONTROLLER
const documentController = new VentaDocumentController(ventaDocument);

// RUTA
router.get("/ventas/:idTienda",documentController.generarReporteVentas);

export default router;