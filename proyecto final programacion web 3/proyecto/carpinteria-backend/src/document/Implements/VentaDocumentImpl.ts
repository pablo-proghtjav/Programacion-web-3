// documents/services/impl/DocumentServiceImpl.ts

import { VentaDocument } from "../VentaDocument";
import { VentaDao } from "../../dao/VentaDao";
import { Venta } from "../../models/Venta";
import { VentaDocumentPdf } from "../generator/VentaDocumentPdf";

export class VentaDocumentImpl implements VentaDocument {

    private ventaDao: VentaDao;

    constructor(ventaDao: VentaDao) {
        this.ventaDao = ventaDao;
    }
    async generarReporteVentas(idTienda: number): Promise<any> {
        const ventas = await this.ventaDao.mostrarPorTienda(idTienda);
        const pdf = VentaDocumentPdf.generar(ventas);
        return pdf;
    }


}