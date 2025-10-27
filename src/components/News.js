import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaTag } from 'react-icons/fa';
import './News.css';

const News = () => {
  const navigate = useNavigate();

  const handleReadMore = (newsId) => {
    navigate(`/news/${newsId}`);
  };

  const newsItems = [
    {
      id: 1,
      title: 'The Future of UI/UX Design in 2024',
      excerpt: 'Exploring the latest trends and technologies that are shaping the future of user interface and user experience design.',
      content: 'As we move further into 2024, the landscape of UI/UX design continues to evolve at a rapid pace. New technologies like AI, AR, and VR are creating unprecedented opportunities for designers to create more immersive and intuitive user experiences...',
      date: 'March 15, 2024',
      author: 'Design Team',
      category: 'Design Trends',
      readTime: '5 min read',
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      title: 'Building Accessible Web Applications',
      excerpt: 'A comprehensive guide to creating web applications that are inclusive and accessible to all users.',
      content: 'Accessibility in web design is not just a nice-to-have feature—it\'s a fundamental requirement for creating inclusive digital experiences. In this article, we explore the key principles and techniques for building accessible web applications...',
      date: 'March 10, 2024',
      author: 'Development Team',
      category: 'Web Development',
      readTime: '7 min read',
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      title: 'Mobile-First Design Strategy',
      excerpt: 'Why mobile-first design is crucial for modern web applications and how to implement it effectively.',
      content: 'With mobile devices accounting for over 50% of web traffic, adopting a mobile-first design strategy has become essential for creating successful digital products. This approach ensures that your application works seamlessly across all devices...',
      date: 'March 5, 2024',
      author: 'UX Team',
      category: 'Mobile Design',
      readTime: '6 min read',
      image: '/api/placeholder/400/250'
    },
    {
      id: 4,
      title: 'The Psychology of Color in Design',
      excerpt: 'Understanding how color choices impact user behavior and emotional responses in digital products.',
      content: 'Color is one of the most powerful tools in a designer\'s arsenal. It can evoke emotions, guide user attention, and create memorable experiences. In this deep dive, we explore the psychological effects of different colors and how to use them effectively...',
      date: 'February 28, 2024',
      author: 'Design Team',
      category: 'Design Psychology',
      readTime: '8 min read',
      image: '/api/placeholder/400/250'
    },
    {
      id: 5,
      title: 'Microinteractions: The Secret to Great UX',
      excerpt: 'How small animations and interactions can significantly improve user experience and engagement.',
      content: 'Microinteractions are the small, often overlooked details that make a big difference in user experience. From button hover effects to loading animations, these subtle interactions can transform a good design into a great one...',
      date: 'February 20, 2024',
      author: 'UX Team',
      category: 'User Experience',
      readTime: '4 min read',
      image: '/api/placeholder/400/250'
    },
    {
      id: 6,
      title: 'Design Systems: Building for Scale',
      excerpt: 'Creating and maintaining design systems that grow with your product and team.',
      content: 'As products and teams grow, maintaining consistency becomes increasingly challenging. Design systems provide a structured approach to scaling design across large organizations while ensuring consistency and efficiency...',
      date: 'February 15, 2024',
      author: 'Design Team',
      category: 'Design Systems',
      readTime: '9 min read',
      image: '/api/placeholder/400/250'
    }
  ];

  return (
    <div className="news">
      <div className="news-container">
        <div className="news-header">
          <h1>Latest News & Articles</h1>
          <p>Stay updated with the latest trends and insights in design and development</p>
        </div>
        
        <div className="news-grid">
          {newsItems.map((item) => (
            <article key={item.id} className="news-item">
              <div className="news-image">
                <div className="placeholder-image">
                  <span>Article Image</span>
                </div>
                <div className="news-category">{item.category}</div>
              </div>
              
              <div className="news-content">
                <div className="news-meta">
                  <div className="meta-item">
                    <FaCalendarAlt className="meta-icon" />
                    <span>{item.date}</span>
                  </div>
                  <div className="meta-item">
                    <FaUser className="meta-icon" />
                    <span>{item.author}</span>
                  </div>
                  <div className="meta-item">
                    <FaTag className="meta-icon" />
                    <span>{item.readTime}</span>
                  </div>
                </div>
                
                <h2 className="news-title">{item.title}</h2>
                <p className="news-excerpt">{item.excerpt}</p>
                
                <button 
                  className="read-more-btn"
                  onClick={() => handleReadMore(item.id)}
                >
                  Read More
                </button>
              </div>
            </article>
          ))}
        </div>
        
        <div className="news-cta">
          <h2>Want to stay updated?</h2>
          <p>Subscribe to our newsletter for the latest design insights and industry news.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;

