# MERN CV Portfolio Website

A modern, responsive portfolio website built with React that allows users to create and download their CV in PDF format. The website features a clean, professional design with a dark theme and includes multiple sections for showcasing work and skills.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **CV Generation**: Create and download professional CVs in PDF format
- **Multiple Sections**: Home, About, Services, Portfolio, News, and Contact pages
- **Interactive Navigation**: Smooth scrolling and section-based navigation
- **Modern UI**: Clean, professional design with dark theme
- **Form Handling**: Complete CV form with image upload and preview functionality

## Technologies Used

- **React 18**: Modern React with hooks and functional components
- **CSS3**: Custom styling with responsive design
- **jsPDF**: PDF generation library
- **html2canvas**: HTML to canvas conversion for PDF
- **React Icons**: Beautiful icon library
- **Framer Motion**: Smooth animations (ready for implementation)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mern-cv-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. Follow the prompts to configure your deployment.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Upload the `build` folder to your hosting provider.

## Project Structure

```
src/
├── components/
│   ├── Sidebar.js          # Navigation sidebar
│   ├── Home.js             # Home page component
│   ├── About.js            # About page component
│   ├── Service.js          # Services page component
│   ├── Portfolio.js       # Portfolio page component
│   ├── News.js             # News/Blog page component
│   ├── Contact.js          # Contact page component
│   └── CVForm.js           # CV creation form
├── utils/
│   └── pdfGenerator.js     # PDF generation utility
├── App.js                  # Main app component
├── App.css                 # App styles
├── index.js                # Entry point
└── index.css               # Global styles
```

## Usage

### Creating a CV

1. Navigate to the "Make CV" section from the sidebar
2. Fill in your personal information, contact details, and professional summary
3. Upload a profile picture (optional)
4. Preview your CV before saving
5. Click "Download PDF" to generate and download your CV

### Navigation

- Use the sidebar navigation to move between different sections
- The website is fully responsive and works on all devices
- Smooth scrolling between sections

## Customization

### Colors

The website uses a consistent color scheme:
- Primary: #00CED1 (Cyan)
- Background: #1A2B2E (Dark Teal)
- Secondary: #2A3B3E (Lighter Teal)
- Text: #FFFFFF (White)
- Accent: #FF5733 (Coral)

### Adding New Sections

1. Create a new component in the `components` folder
2. Add the component to the `App.js` switch statement
3. Add navigation item to the `Sidebar.js` menu items
4. Style the component with CSS

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, email your-email@example.com or create an issue in the repository.

---

Built with ❤️ using React and modern web technologies.

