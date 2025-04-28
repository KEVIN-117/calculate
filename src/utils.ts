import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function exportDetailedReportToPDF(tableId: string, filename: string, reportTitle: string, reportInfo: any): void {
    const table = document.getElementById(tableId);
    if (!table) return;

    // Guardar los estilos originales para restaurarlos después
    const originalStyles = {
        width: table.style.width,
        border: table.style.border,
        fontFamily: table.style.fontFamily,
        color: table.style.color,
        borderCollapse: table.style.borderCollapse
    };

    // Aplicar estilos temporales para mejorar la visualización en el PDF
    table.style.width = '100%';
    table.style.color = '#333333';
    table.style.borderCollapse = 'collapse';
    table.style.fontFamily = 'Arial, sans-serif';

    // Aplicar estilos a los encabezados y celdas de la tabla
    const headers = table.querySelectorAll('th');
    const cells = table.querySelectorAll('td');

    headers.forEach((header: HTMLElement) => {
        header.style.backgroundColor = '#4472C4';
        header.style.color = 'white';
        header.style.padding = '8px';
        header.style.textAlign = 'center';
        header.style.fontWeight = 'bold';
        header.style.border = '1px solid #dddddd';
    });

    cells.forEach((cell: HTMLElement) => {
        cell.style.padding = '6px';
        cell.style.border = '1px solid #dddddd';
        cell.style.textAlign = 'right';
    });

    // Alternar colores de filas
    const rows = table.querySelectorAll('tr');
    rows.forEach((row: HTMLElement, index: number) => {
        if (index > 0) { // Omitir la fila de encabezados
            row.style.backgroundColor = index % 2 === 0 ? '#f2f2f2' : 'white';
        }
    });

    // Configurar el PDF
    const pdf = new jsPDF('p', 'mm', 'letter');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;

    // Añadir una cabecera con un rectángulo de color
    pdf.setFillColor(65, 105, 225); // Azul real
    pdf.rect(0, 0, pdfWidth, 25, 'F');

    // Añadir título en la cabecera
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(255, 255, 255); // Blanco
    pdf.text(reportTitle, pdfWidth / 2, 15, { align: 'center' });

    // Configurar sección de información
    pdf.setTextColor(50, 50, 50); // Gris oscuro
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');

    // Crear una caja para información del préstamo
    pdf.setFillColor(240, 240, 240); // Gris claro
    pdf.roundedRect(margin, 30, pdfWidth - (margin * 2), 25, 3, 3, 'F');

    // Añadir información del préstamo con mejor formato
    pdf.setFontSize(10);
    pdf.text(`Préstamo: ${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'BOB' }).format(reportInfo.loan)}`, margin + 5, 38);
    pdf.text(`Interés anual: ${reportInfo.interest}%`, margin + 5, 43);
    pdf.text(`Plazo: ${reportInfo.term} meses`, pdfWidth / 2 + 5, 38);
    pdf.text(`Sistema: ${reportInfo.system}`, pdfWidth / 2 + 5, 43);
    pdf.text(`Fecha: ${new Date().toLocaleDateString()}`, margin + 5, 48);

    // Convertir tabla a imagen con mejor calidad
    html2canvas(table, {
        scale: 2, // Mayor resolución
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const imgWidth = pdfWidth - (margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const imgData = canvas.toDataURL('image/png', 1.0);

        // Añadir tabla como imagen
        pdf.addImage(imgData, 'PNG', margin, 60, imgWidth, imgHeight);

        // Añadir pie de página
        const pageCount = pdf.getNumberOfPages();
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Generado el ${new Date().toLocaleString()}`, margin, pdfHeight - 10);
        pdf.text(`Página 1 de ${pageCount}`, pdfWidth - margin, pdfHeight - 10, { align: 'right' });

        // Guardar PDF
        pdf.save(`${filename}.pdf`);

        // Restaurar los estilos originales de la tabla
        table.style.width = originalStyles.width;
        table.style.border = originalStyles.border;
        table.style.fontFamily = originalStyles.fontFamily;
        table.style.color = originalStyles.color;
        table.style.borderCollapse = originalStyles.borderCollapse;

        headers.forEach((header: HTMLElement) => {
            header.style.backgroundColor = '';
            header.style.color = '';
            header.style.padding = '';
            header.style.textAlign = '';
            header.style.fontWeight = '';
            header.style.border = '';
        });

        cells.forEach((cell: HTMLElement) => {
            cell.style.padding = '';
            cell.style.border = '';
            cell.style.textAlign = '';
        });

        rows.forEach((row: HTMLElement) => {
            row.style.backgroundColor = '';
        });
    });
}