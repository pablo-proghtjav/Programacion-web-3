import PDFDocument from "pdfkit";
import { Venta } from "../../models/Venta";

export class VentaDocumentPdf {

    static generar(ventas: Venta[]) {

        const doc = new PDFDocument({
            margin: 50,
            size: "A4"
        });

        // Título
        doc
            .fontSize(18)
            .text("REPORTE DE VENTAS", {
                align: "center"
            });

        doc.moveDown();

        doc
            .fontSize(12)
            .text(
                `Fecha de emisión: ${new Date().toLocaleDateString()}`
            );

        doc.moveDown();

        // Encabezados
        doc.fontSize(12).font("Helvetica-Bold");

        doc.text("ID", 50, doc.y);
        doc.text("Fecha", 100, doc.y - 15);
        doc.text("Total", 250, doc.y - 15);
        doc.text("Cliente", 350, doc.y - 15);

        doc.moveDown();

        // Línea separadora
        doc.moveTo(50, doc.y)
           .lineTo(550, doc.y)
           .stroke();

        doc.moveDown();

        // Datos
        doc.font("Helvetica");

        ventas.forEach((venta) => {

            doc.text(
                venta.idVenta.toString(),
                50,
                doc.y
            );

            doc.text(
                venta.fechaV,
                100,
                doc.y - 15
            );

            doc.text(
                venta.total.toFixed(2),
                250,
                doc.y - 15
            );

            doc.text(
                venta.idCliente.toString(),
                350,
                doc.y - 15
            );

            doc.moveDown();
        });

        const totalGeneral = ventas.reduce(
            (suma, venta) => suma + venta.total,
            0
        );

        doc.moveDown();

        doc.font("Helvetica-Bold");

        doc.text(
            `TOTAL GENERAL: Bs ${totalGeneral.toFixed(2)}`
        );

        return doc;
    }
}