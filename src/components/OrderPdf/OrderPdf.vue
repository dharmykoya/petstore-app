<template>
  <div id="pdfContent">
    <h1>Invoice</h1>
    <p>Customer: John Doe</p>
    <p>Date: {{ formattedDate }}</p>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Product 1</td>
          <td>2</td>
          <td>$10.00</td>
          <td>$20.00</td>
        </tr>
        <tr>
          <td>Product 2</td>
          <td>1</td>
          <td>$15.00</td>
          <td>$15.00</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <button @click="generatePDF">Generate PDF from HTML</button>
  </div>
</template>

<script setup lang="ts">
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const generatePDF = async () => {
  try {
    const pdf = new jsPDF()

    // Target HTML element to convert to PDF
    const element = document.getElementById('pdfContent')!

    // Convert HTML element to canvas using html2canvas
    const canvas = await html2canvas(element)

    // Add canvas to PDF
    const imageData = canvas.toDataURL('image/png')
    pdf.addImage(imageData, 'PNG', 0, 0, 210, 297) // A4 size: 210 x 297 mm

    // Save PDF
    pdf.save('generated_pdf.pdf')
  } catch (error) {
    console.error('Error generating PDF:', error)
  }
}

const formattedDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
</script>

<style scoped>
/* Add scoped styles as needed */
</style>
