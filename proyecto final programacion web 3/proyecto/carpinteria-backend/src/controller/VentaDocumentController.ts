import { Request, Response } from "express";
import { VentaDocument } from "../document/VentaDocument";

export class VentaDocumentController {

    private ventaDocument: VentaDocument;

    constructor(ventaDocument: VentaDocument) {
        this.ventaDocument = ventaDocument;
    }

    public generarReporteVentas = async (req: Request,res: Response): Promise<void> => {

        try {

            const idTienda = Number(req.params.idTienda);

            if (!idTienda) {
                throw {
                    status: 400,
                    message: "El idTienda es obligatorio"
                };
            }

            const pdf = await this.ventaDocument.generarReporteVentas(idTienda);

            res.setHeader(
                "Content-Type",
                "application/pdf"
            );

            res.setHeader(
                "Content-Disposition",
                "attachment; filename=reporte_ventas.pdf"
            );

            pdf.pipe(res);

            pdf.end();

        } catch (error: any) {

            res.status(error.status || 500).json({
                error:
                    error.message || "Error interno"
            });

        }

    };

}