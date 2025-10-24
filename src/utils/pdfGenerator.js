import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = (userData) => {
  // Create a temporary div to hold the CV content
  const cvContent = document.createElement('div');
  cvContent.style.cssText = `
    width: 210mm;
    min-height: 297mm;
    padding: 20mm;
    background-color: #ffffff;
    color: #333333;
    font-family: 'Arial', sans-serif;
    position: absolute;
    top: -9999px;
    left: -9999px;
    line-height: 1.4;
  `;

  cvContent.innerHTML = `
    <!-- Header Section -->
    <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #2563eb; padding-bottom: 20px;">
      <h1 style="font-size: 32px; font-weight: 700; color: #1f2937; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">
        ${userData.firstName} ${userData.lastName}
      </h1>
      <p style="font-size: 18px; color: #2563eb; margin-bottom: 15px; font-weight: 600;">${userData.title}</p>
      <div style="display: flex; justify-content: center; gap: 30px; font-size: 14px; color: #6b7280;">
        <span>📧 ${userData.email}</span>
        <span>📱 ${userData.phone}</span>
        <span>📍 ${userData.address}</span>
      </div>
    </div>

    <!-- Professional Summary -->
    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 18px; color: #1f2937; margin-bottom: 15px; border-bottom: 2px solid #2563eb; padding-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">Professional Summary</h2>
      <p style="font-size: 14px; color: #374151; line-height: 1.6; text-align: justify;">
        ${userData.summary}
      </p>
    </div>

    <!-- Personal Information -->
    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 18px; color: #1f2937; margin-bottom: 15px; border-bottom: 2px solid #2563eb; padding-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">Personal Information</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #e5e7eb;">
          <span style="color: #6b7280; font-weight: 500;">Full Name:</span>
          <span style="color: #1f2937; font-weight: 600;">${userData.firstName} ${userData.lastName}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #e5e7eb;">
          <span style="color: #6b7280; font-weight: 500;">Date of Birth:</span>
          <span style="color: #1f2937; font-weight: 600;">${userData.dateOfBirth}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #e5e7eb;">
          <span style="color: #6b7280; font-weight: 500;">Nationality:</span>
          <span style="color: #1f2937; font-weight: 600;">${userData.nationality}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #e5e7eb;">
          <span style="color: #6b7280; font-weight: 500;">Languages:</span>
          <span style="color: #1f2937; font-weight: 600;">${userData.languages}</span>
        </div>
      </div>
    </div>

    <!-- Skills & Expertise -->
    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 18px; color: #1f2937; margin-bottom: 15px; border-bottom: 2px solid #2563eb; padding-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">Skills & Expertise</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
          <h3 style="font-size: 14px; color: #374151; margin-bottom: 8px; font-weight: 600;">Technical Skills</h3>
          <ul style="font-size: 13px; color: #6b7280; line-height: 1.5; margin: 0; padding-left: 15px;">
            <li>UI/UX Design (90%)</li>
            <li>Frontend Development (85%)</li>
            <li>User Research (80%)</li>
            <li>Prototyping (85%)</li>
            <li>Responsive Design (90%)</li>
          </ul>
        </div>
        <div>
          <h3 style="font-size: 14px; color: #374151; margin-bottom: 8px; font-weight: 600;">Tools & Technologies</h3>
          <ul style="font-size: 13px; color: #6b7280; line-height: 1.5; margin: 0; padding-left: 15px;">
            <li>Figma, Adobe XD, Sketch</li>
            <li>React, JavaScript, HTML/CSS</li>
            <li>Node.js, MongoDB</li>
            <li>Git, GitHub</li>
            <li>Photoshop, Illustrator</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Services -->
    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 18px; color: #1f2937; margin-bottom: 15px; border-bottom: 2px solid #2563eb; padding-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">Services</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
        <div style="border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px;">
          <h3 style="font-size: 14px; color: #1f2937; margin-bottom: 8px; font-weight: 600;">UI/UX Design</h3>
          <p style="font-size: 12px; color: #6b7280; line-height: 1.4; margin: 0;">Creating beautiful and intuitive user interfaces that provide exceptional user experiences.</p>
        </div>
        <div style="border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px;">
          <h3 style="font-size: 14px; color: #1f2937; margin-bottom: 8px; font-weight: 600;">Web Development</h3>
          <p style="font-size: 12px; color: #6b7280; line-height: 1.4; margin: 0;">Building responsive and modern websites using the latest technologies and best practices.</p>
        </div>
        <div style="border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px;">
          <h3 style="font-size: 14px; color: #1f2937; margin-bottom: 8px; font-weight: 600;">Mobile App Design</h3>
          <p style="font-size: 12px; color: #6b7280; line-height: 1.4; margin: 0;">Designing mobile applications that are both functional and visually appealing across all devices.</p>
        </div>
        <div style="border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px;">
          <h3 style="font-size: 14px; color: #1f2937; margin-bottom: 8px; font-weight: 600;">User Research</h3>
          <p style="font-size: 12px; color: #6b7280; line-height: 1.4; margin: 0;">Conducting thorough research to understand user needs and improve product usability.</p>
        </div>
      </div>
    </div>

    <!-- Portfolio Projects -->
    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 18px; color: #1f2937; margin-bottom: 15px; border-bottom: 2px solid #2563eb; padding-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">Portfolio Projects</h2>
      <div style="display: grid; grid-template-columns: 1fr; gap: 15px;">
        <div style="border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px;">
          <h3 style="font-size: 14px; color: #1f2937; margin-bottom: 8px; font-weight: 600;">E-Commerce Platform</h3>
          <p style="font-size: 12px; color: #6b7280; line-height: 1.4; margin-bottom: 8px;">A modern e-commerce platform with intuitive user interface and seamless shopping experience.</p>
          <p style="font-size: 11px; color: #9ca3af; margin: 0;"><strong>Technologies:</strong> React, Node.js, MongoDB, Stripe</p>
        </div>
        <div style="border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px;">
          <h3 style="font-size: 14px; color: #1f2937; margin-bottom: 8px; font-weight: 600;">Mobile Banking App</h3>
          <p style="font-size: 12px; color: #6b7280; line-height: 1.4; margin-bottom: 8px;">Secure and user-friendly mobile banking application with advanced security features.</p>
          <p style="font-size: 11px; color: #9ca3af; margin: 0;"><strong>Technologies:</strong> Figma, Adobe XD, Sketch</p>
        </div>
        <div style="border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px;">
          <h3 style="font-size: 14px; color: #1f2937; margin-bottom: 8px; font-weight: 600;">SaaS Dashboard</h3>
          <p style="font-size: 12px; color: #6b7280; line-height: 1.4; margin-bottom: 8px;">Comprehensive dashboard for SaaS application with advanced analytics and user management.</p>
          <p style="font-size: 11px; color: #9ca3af; margin: 0;"><strong>Technologies:</strong> React, TypeScript, Chart.js</p>
        </div>
      </div>
    </div>

    <!-- Experience -->
    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 18px; color: #1f2937; margin-bottom: 15px; border-bottom: 2px solid #2563eb; padding-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">Professional Experience</h2>
      <div style="border-left: 3px solid #2563eb; padding-left: 15px;">
        <div style="margin-bottom: 20px;">
          <h3 style="font-size: 14px; color: #1f2937; margin-bottom: 5px; font-weight: 600;">Senior UI/UX Designer</h3>
          <p style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">Tech Company Inc. | 2022 - Present</p>
          <ul style="font-size: 12px; color: #374151; line-height: 1.4; margin: 0; padding-left: 15px;">
            <li>Led design team of 5 designers and improved user experience by 40%</li>
            <li>Created comprehensive design systems for web and mobile applications</li>
            <li>Conducted user research and usability testing for major product launches</li>
          </ul>
        </div>
        <div>
          <h3 style="font-size: 14px; color: #1f2937; margin-bottom: 5px; font-weight: 600;">UI/UX Designer</h3>
          <p style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">Design Studio | 2020 - 2022</p>
          <ul style="font-size: 12px; color: #374151; line-height: 1.4; margin: 0; padding-left: 15px;">
            <li>Designed user interfaces for 20+ client projects</li>
            <li>Collaborated with developers to ensure pixel-perfect implementation</li>
            <li>Mentored junior designers and conducted design workshops</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Education -->
    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 18px; color: #1f2937; margin-bottom: 15px; border-bottom: 2px solid #2563eb; padding-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px;">Education</h2>
      <div style="border-left: 3px solid #2563eb; padding-left: 15px;">
        <h3 style="font-size: 14px; color: #1f2937; margin-bottom: 5px; font-weight: 600;">Bachelor of Design</h3>
        <p style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">University of Design | 2018 - 2022</p>
        <p style="font-size: 12px; color: #374151; line-height: 1.4; margin: 0;">Specialized in User Experience Design and Human-Computer Interaction</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="margin-top: 40px; text-align: center; color: #9ca3af; font-size: 11px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
      © 2024 ${userData.firstName} ${userData.lastName}. All Rights Reserved. | Generated from Professional Portfolio
    </div>
  `;

  document.body.appendChild(cvContent);

  // Generate PDF
  html2canvas(cvContent, {
    backgroundColor: '#ffffff',
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

