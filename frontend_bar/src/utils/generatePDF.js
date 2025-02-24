import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Genera un archivo PDF a partir del contenido de un elemento HTML con el ID "pdf-content".
 * Utiliza las bibliotecas html2canvas y jsPDF para capturar el contenido y generar el PDF.
 */
const generatePDF = () => {
  const input = document.getElementById("pdf-content"); // ID del contenedor a capturar
  html2canvas(input, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png"); // Convierte el canvas a una imagen en formato PNG
    const pdf = new jsPDF("p", "mm", "a4"); // Crea un nuevo documento PDF en formato A4
    const imgWidth = 210; // Ancho de A4 en mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Ajuste de altura proporcional

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight); // Agrega la imagen al PDF
    pdf.save("documento.pdf"); // Guarda el PDF con el nombre "documento.pdf"
  });
};

export default generatePDF;