// documents/services/DocumentService.ts

import { Venta } from "../models/Venta";

export interface VentaDocument {

    generarReporteVentas(idTienda: number): Promise<any>;

}