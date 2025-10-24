import jsPDF from 'jspdf';

export const generatePDF = (userData) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const pageHeight = 297;
  let yPosition = 20;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  // Helper function to add text with automatic page breaks
  const addText = (text, fontSize = 12, fontWeight = 'normal', color = '#000000', isBold = false) => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', fontWeight);
    pdf.setTextColor(color);
    
    const lines = pdf.splitTextToSize(text, contentWidth);
    
    for (let i = 0; i < lines.length; i++) {
      if (yPosition > pageHeight - 20) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text(lines[i], margin, yPosition);
      yPosition += fontSize * 0.4;
    }
    yPosition += 5;
  };

  // Helper function to add section headers
  const addSectionHeader = (title) => {
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }
    yPosition += 10;
    addText(title, 18, 'bold', '#2C3E50');
    yPosition += 5;
  };

  // Helper function to add horizontal line
  const addLine = () => {
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
  };

  // 1. HEADER SECTION
  addText(`${userData.firstName} ${userData.lastName}`, 24, 'bold', '#2C3E50');
  addText(userData.title, 16, 'normal', '#7F8C8D');
  addText(userData.email, 12, 'normal', '#34495E');
  addText(userData.phone, 12, 'normal', '#34495E');
  addText(userData.address, 12, 'normal', '#34495E');
  addLine();

  // 2. PROFESSIONAL SUMMARY
  addSectionHeader('PROFESSIONAL SUMMARY');
  addText(userData.summary, 12, 'normal', '#2C3E50');
  addLine();

  // 3. PERSONAL INFORMATION
  addSectionHeader('PERSONAL INFORMATION');
  addText(`Full Name: ${userData.firstName} ${userData.lastName}`, 12, 'normal', '#2C3E50');
  addText(`Date of Birth: ${userData.dateOfBirth}`, 12, 'normal', '#2C3E50');
  addText(`Nationality: ${userData.nationality}`, 12, 'normal', '#2C3E50');
  addText(`Languages: ${userData.languages}`, 12, 'normal', '#2C3E50');
  addLine();

  // 4. ABOUT SECTION
  addSectionHeader('ABOUT ME');
  addText(`Hello, I'm ${userData.firstName} ${userData.lastName}`, 14, 'bold', '#2C3E50');
  addText(userData.summary, 12, 'normal', '#2C3E50');
  
  addText('Professional Experience:', 12, 'bold', '#2C3E50');
  addText('With years of experience in the industry, I have developed a strong foundation in design principles and user experience. My journey has been marked by continuous learning and adaptation to new technologies and design trends.', 12, 'normal', '#2C3E50');
  
  addText('Skills & Expertise:', 12, 'bold', '#2C3E50');
  addText('• UI/UX Design (90% proficiency)', 12, 'normal', '#2C3E50');
  addText('• Web Development (85% proficiency)', 12, 'normal', '#2C3E50');
  addText('• Mobile App Design (80% proficiency)', 12, 'normal', '#2C3E50');
  addText('• User Research (75% proficiency)', 12, 'normal', '#2C3E50');
  addText('• Project Management (70% proficiency)', 12, 'normal', '#2C3E50');
  addLine();

  // 5. SERVICES SECTION
  addSectionHeader('SERVICES');
  
  addText('UI/UX Design', 14, 'bold', '#2C3E50');
  addText('Creating beautiful and intuitive user interfaces that provide exceptional user experiences.', 12, 'normal', '#2C3E50');
  addText('Features: User Research, Wireframing, Prototyping, Visual Design', 11, 'italic', '#7F8C8D');
  yPosition += 5;
  
  addText('Web Development', 14, 'bold', '#2C3E50');
  addText('Building responsive and modern websites using the latest technologies and best practices.', 12, 'normal', '#2C3E50');
  addText('Features: Frontend Development, Backend Integration, Responsive Design, Performance Optimization', 11, 'italic', '#7F8C8D');
  yPosition += 5;
  
  addText('Mobile App Design', 14, 'bold', '#2C3E50');
  addText('Designing mobile applications that are both functional and visually appealing across all devices.', 12, 'normal', '#2C3E50');
  addText('Features: iOS Design, Android Design, Cross-platform, App Store Optimization', 11, 'italic', '#7F8C8D');
  yPosition += 5;
  
  addText('User Research', 14, 'bold', '#2C3E50');
  addText('Conducting thorough research to understand user needs and improve product usability.', 12, 'normal', '#2C3E50');
  addText('Features: User Interviews, Usability Testing, Analytics, Persona Development', 11, 'italic', '#7F8C8D');
  addLine();

  // 6. PORTFOLIO SECTION
  addSectionHeader('PORTFOLIO');
  
  addText('E-Commerce Platform', 14, 'bold', '#2C3E50');
  addText('A modern e-commerce platform with intuitive user interface and seamless shopping experience.', 12, 'normal', '#2C3E50');
  addText('Technologies: React, Node.js, MongoDB, Stripe', 11, 'italic', '#7F8C8D');
  yPosition += 5;
  
  addText('Mobile Banking App', 14, 'bold', '#2C3E50');
  addText('Secure and user-friendly mobile banking application with advanced security features.', 12, 'normal', '#2C3E50');
  addText('Technologies: Figma, Adobe XD, Sketch', 11, 'italic', '#7F8C8D');
  yPosition += 5;
  
  addText('SaaS Dashboard', 14, 'bold', '#2C3E50');
  addText('Comprehensive dashboard for SaaS application with real-time analytics and user management.', 12, 'normal', '#2C3E50');
  addText('Technologies: Vue.js, D3.js, Chart.js, Firebase', 11, 'italic', '#7F8C8D');
  yPosition += 5;
  
  addText('Healthcare Management System', 14, 'bold', '#2C3E50');
  addText('Complete healthcare management solution for hospitals and clinics with patient records and scheduling.', 12, 'normal', '#2C3E50');
  addText('Technologies: React, Express.js, PostgreSQL, Docker', 11, 'italic', '#7F8C8D');
  addLine();

  // 7. CONTACT INFORMATION
  addSectionHeader('CONTACT INFORMATION');
  addText(`Email: ${userData.email}`, 12, 'normal', '#2C3E50');
  addText(`Phone: ${userData.phone}`, 12, 'normal', '#2C3E50');
  addText(`Address: ${userData.address}`, 12, 'normal', '#2C3E50');
  addText(`Languages: ${userData.languages}`, 12, 'normal', '#2C3E50');
  addLine();

  // 8. FOOTER
  yPosition += 20;
  addText(`© 2024 ${userData.firstName} ${userData.lastName}. All Rights Reserved.`, 10, 'normal', '#7F8C8D');

  // Download the PDF
  pdf.save(`${userData.firstName}_${userData.lastName}_Complete_CV.pdf`);
};

