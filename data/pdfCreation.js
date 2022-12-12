const fs = require("fs");
const PDFDocument = require("pdfkit");

async function createInvoice(flightDetails,travelersDetails, totalPrice ,path,dataCallback,endCallback) {
    let doc = new PDFDocument({ size: "A4", margin: 50 });
    doc.on('data',dataCallback);
    doc.on('end',endCallback);  
    await generateHeader(doc,flightDetails);
    generateTicketTable(doc, travelersDetails,totalPrice);  
    doc.end();    
}

async function generateHeader(doc,flightDetails) {
    doc
      .fontSize(20)
      .text("37 Airlines", 50, 20,{ align: "left" })
      .fontSize(10)
      .text(`Flight Code : ${flightDetails.flightCode}`, 50, 75,{ align: "left" })
      .text(`Departure : ${flightDetails.departure}`, 50, 90,{ align: "left" })
      .text(`Destination : ${flightDetails.arrival}`, 50, 105,{ align: "left" })
      .text(`Date : ${flightDetails.departureDate}`, 50, 120,{ align: "left" })
      .text(`Time : ${flightDetails.departureTime}`, 50, 135,{ align: "left" })
      .moveDown();
}

function generateTicketTable(doc, travelersDetails,totalPrice) {
    let i;
    const TableTop = 200;
  
    doc.font("Helvetica-Bold");
    generateTableRow(
      doc,
      TableTop,
      "Sr No.",
      "First Name",
      "Last Name",
      "Passport No.",
      "Booked Class",
      "Food Choice"
    );
    generateline(doc, TableTop + 20);
    doc.font("Helvetica");
  
    for (i = 0; i < travelersDetails.length; i++) {
      const position = TableTop + (i + 1) * 30;
      generateTableRow(
        doc,
        position,
        i,
        travelersDetails[i].firstName,
        travelersDetails[i].lastName,
        travelersDetails[i].passportNumber,
        travelersDetails[i].bookedClass,
        travelersDetails[i].food
      );  
      generateline(doc, position + 20);
    }
    
    doc.font("Helvetica-Bold");
    const subtotalPosition = TableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      subtotalPosition,
      "",
      "",
      "",
      "",
      "",
      `Total Price : ${totalPrice}`
    );
    doc.font("Helvetica-Bold");
  }

  function generateTableRow(
    doc,
    y,
    srNo,
    firstName,
    lastName,
    passportNumber,
    bookedClass,
    food
  ) {
    doc
      .fontSize(10)
      .text(srNo, 50, y)
      .text(firstName, 100, y)
      .text(lastName, 175, y)
      .text(passportNumber, 250, y)      
      .text(bookedClass, 325, y,{ width: 70, align: "right" })
      .text(food, 375, y,{ align: "right" });      
  }
  
  function generateline(doc, y) {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
  }
module.exports={createInvoice};