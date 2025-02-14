import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const generatePDF = () => {
  const input = document.getElementById("pdf-content"); // ID del contenedor a capturar
  html2canvas(input, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Ajuste de altura proporcional

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("documento.pdf");
  });
};

export default generatePDF;