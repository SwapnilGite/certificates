const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const map = new Map();
map.set('gitesmait@gmail.com','Swapnil Gite');
map.set('pratikpatil@gmail.com','Pratik Patil');
map.set('ashwinigite007@gmail.com','Ashwini Gite');
const { PDFDocument, rgb, degrees } = PDFLib;


const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
   if(map.has(userName.value))
  { 
     $('#fader').show();
    const val = map.get(userName.value);
    // alert(val);
    // val = capitalize(val);

  //check if the text is empty or not
  if (val.trim() !== "" && userName.checkValidity()) {
    // console.log(val);

    generatePDF(val);
    // alert(val);
  } else {
    userName.reportValidity();
    $('#fader').hide();
  }
}
else
{
  alert("Invalid Mail ID");
}
});

const generatePDF = async (name) => {
  const existingPdfBytes = await fetch("./cert.pdf").then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch("./Sanchez-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );

  // Embed our custom font in the document
  const SanChezFont = await pdfDoc.embedFont(fontBytes);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: 350,
    y: 278,
    size: 25,
    font: SanChezFont,
    color: rgb(0.2, 0.84, 0.67),
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");
  $('#fader').hide();

  // this was for creating uri and showing in iframe

  // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  // document.getElementById("pdf").src = pdfDataUri;

  var file = new File(
    [pdfBytes],
    "The Kingslayer Certificate.pdf",
    {
      type: "application/pdf;charset=utf-8",
    }
  );
 saveAs(file);
};

// init();
