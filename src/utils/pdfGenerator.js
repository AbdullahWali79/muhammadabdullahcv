import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = (userData) => {
  // Create a temporary div to hold the CV content
  const cvContent = document.createElement('div');
  cvContent.style.cssText = `
    width: 210mm;
    min-height: 297mm;
    padding: 20mm;
    background-color: #1A2B2E;
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    position: absolute;
    top: -9999px;
    left: -9999px;
  `;

  cvContent.innerHTML = `
    <div style="display: flex; margin-bottom: 30px;">
      <div style="flex: 1;">
        <h1 style="font-size: 36px; font-weight: 700; color: #ffffff; margin-bottom: 10px;">
          ${userData.firstName} ${userData.lastName}
        </h1>
        <p style="font-size: 18px; color: #00CED1; margin-bottom: 20px;">${userData.title}</p>
        <p style="font-size: 14px; color: #B0B0B0; line-height: 1.6;">
          ${userData.summary}
        </p>
      </div>
      <div style="width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, #00CED1, #008B8B); display: flex; align-items: center; justify-content: center; font-size: 36px; font-weight: bold; color: white; margin-left: 20px;">
        ${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}
      </div>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 20px; color: #00CED1; margin-bottom: 15px; border-bottom: 2px solid #00CED1; padding-bottom: 5px;">Personal Information</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #2A3B3E;">
          <span style="color: #B0B0B0;">First Name:</span>
          <span style="color: #ffffff; font-weight: 600;">${userData.firstName}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #2A3B3E;">
          <span style="color: #B0B0B0;">Last Name:</span>
          <span style="color: #ffffff; font-weight: 600;">${userData.lastName}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #2A3B3E;">
          <span style="color: #B0B0B0;">Date of Birth:</span>
          <span style="color: #ffffff; font-weight: 600;">${userData.dateOfBirth}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #2A3B3E;">
          <span style="color: #B0B0B0;">Nationality:</span>
          <span style="color: #ffffff; font-weight: 600;">${userData.nationality}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #2A3B3E;">
          <span style="color: #B0B0B0;">Phone:</span>
          <span style="color: #ffffff; font-weight: 600;">${userData.phone}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #2A3B3E;">
          <span style="color: #B0B0B0;">Email:</span>
          <span style="color: #ffffff; font-weight: 600;">${userData.email}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #2A3B3E;">
          <span style="color: #B0B0B0;">Address:</span>
          <span style="color: #ffffff; font-weight: 600;">${userData.address}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #2A3B3E;">
          <span style="color: #B0B0B0;">Languages:</span>
          <span style="color: #ffffff; font-weight: 600;">${userData.languages}</span>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 20px; color: #00CED1; margin-bottom: 15px; border-bottom: 2px solid #00CED1; padding-bottom: 5px;">Professional Summary</h2>
      <p style="font-size: 14px; color: #B0B0B0; line-height: 1.6;">
        ${userData.summary}
      </p>
    </div>

    <div style="margin-top: 40px; text-align: center; color: #B0B0B0; font-size: 12px;">
      © 2024 ${userData.firstName} ${userData.lastName}. All Rights Reserved.
    </div>
  `;

  document.body.appendChild(cvContent);

  // Generate PDF
  html2canvas(cvContent, {
    backgroundColor: '#1A2B2E',
    scale: 2,
    useCORS: true,
    allowTaint: true
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Clean up
    document.body.removeChild(cvContent);
    
    // Download the PDF
    pdf.save(`${userData.firstName}_${userData.lastName}_CV.pdf`);
  }).catch(error => {
    console.error('Error generating PDF:', error);
    document.body.removeChild(cvContent);
    alert('Error generating PDF. Please try again.');
  });
};

