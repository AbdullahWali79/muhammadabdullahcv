const Parser = require('rss-parser');
const { createClient } = require('@supabase/supabase-js');

// Initialize RSS Parser
const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: true }],
      ['media:thumbnail', 'mediaThumbnail', { keepArray: true }],
      ['content:encoded', 'contentEncoded'],
    ]
  }
});

// RSS Feed Sources
const RSS_FEEDS = [
  {
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    category: 'Technology'
  },
  {
    name: 'The Verge',
    url: 'https://www.theverge.com/rss/index.xml',
    category: 'Technology'
  },
  {
    name: 'Wired',
    url: 'https://www.wired.com/feed/rss',
    category: 'Technology'
  },
  {
    name: 'Ars Technica',
    url: 'https://feeds.arstechnica.com/arstechnica/index',
    category: 'Technology'
  },
  {
    name: 'Dev.to',
    url: 'https://dev.to/feed',
    category: 'Development'
  },
  {
    name: 'FreeCodeCamp',
    url: 'https://www.freecodecamp.org/news/rss/',
    category: 'Development'
  },
  {
    name: 'CSS-Tricks',
    url: 'https://css-tricks.com/feed/',
    category: 'Development'
  },
  {
    name: 'Smashing Magazine',
    url: 'https://www.smashingmagazine.com/feed/',
    category: 'Development'
  }
];

// Technology keywords to filter articles
const TECH_KEYWORDS = [
  'javascript', 'react', 'node', 'python', 'java', 'web development',
  'programming', 'coding', 'software', 'app development', 'mobile app',
  'flutter', 'react native', 'vue', 'angular', 'typescript', 'html', 'css',
  'api', 'database', 'cloud', 'aws', 'azure', 'docker', 'kubernetes',
  'machine learning', 'ai', 'artificial intelligence', 'data science',
  'blockchain', 'crypto', 'cybersecurity', 'devops', 'git', 'github'
];

// Extract image from article content
function extractImage(item) {
  // Try media:content first
  if (item.mediaContent && item.mediaContent.length > 0) {
    const media = item.mediaContent.find(m => m.$.url);
    if (media) return media.$.url;
  }
  
  // Try media:thumbnail
  if (item.mediaThumbnail && item.mediaThumbnail.length > 0) {
    const thumb = item.mediaThumbnail.find(t => t.$.url);
    if (thumb) return thumb.$.url;
  }
  
  // Try content:encoded for img tags
  if (item.contentEncoded) {
    const imgMatch = item.contentEncoded.match(/<img[^>]+src="([^"]+)"/i);
    if (imgMatch) return imgMatch[1];
  }
  
  // Try contentSnippet for img tags
  if (item.contentSnippet) {
    const imgMatch = item.contentSnippet.match(/<img[^>]+src="([^"]+)"/i);
    if (imgMatch) return imgMatch[1];
  }
  
  // Try enclosure
  if (item.enclosure && item.enclosure.url) {
    return item.enclosure.url;
  }
  
  return '';
}

// Clean HTML from text (for short descriptions only)
function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
}

// Preserve HTML content (for full descriptions)
function preserveHTML(text) {
  if (!text) return '';
  // Keep HTML structure intact, only decode entities
  // Don't remove HTML tags - preserve them for rendering
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—');
}

// Check if article is technology-related
function isTechRelated(title, content) {
  const text = (title + ' ' + content).toLowerCase();
  return TECH_KEYWORDS.some(keyword => text.includes(keyword));
}

// Fetch and parse RSS feed
async function fetchRSSFeed(feedConfig) {
  try {
    console.log(`Fetching ${feedConfig.name}...`);
    const feed = await parser.parseURL(feedConfig.url);
    
    const articles = feed.items
      .filter(item => {
        // Filter only recent articles (last 24 hours)
        const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
        const hoursAgo = (Date.now() - pubDate.getTime()) / (1000 * 60 * 60);
        return hoursAgo <= 24;
      })
      .filter(item => {
        // Filter technology-related articles
        const title = item.title || '';
        const content = item.contentSnippet || item.content || '';
        return isTechRelated(title, content);
      })
      .slice(0, 5) // Limit to 5 articles per feed
      .map(item => {
        const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
        
        // Get content - prioritize contentEncoded (full HTML) for fullDescription
        const rawContent = item.content || item.contentSnippet || item.description || '';
        const htmlContent = item.contentEncoded || item.content || item.contentSnippet || item.description || '';
        
        // Short description (clean text for card view)
        const shortDescription = cleanText(rawContent);
        
        // Full description (preserve HTML for detail page)
        // Use contentEncoded if available (full HTML), otherwise preserve HTML from content
        const fullDescription = item.contentEncoded 
          ? preserveHTML(item.contentEncoded) 
          : preserveHTML(htmlContent);
        
        return {
          id: `rss_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          title: item.title || 'Untitled Article',
          description: shortDescription, // Clean text for card view
          fullDescription: fullDescription, // HTML preserved for detail page
          content: shortDescription, // Fallback
          date: pubDate.toISOString().split('T')[0],
          category: feedConfig.category,
          image: extractImage(item) || '',
          featured: false,
          source: feedConfig.name,
          link: item.link || '',
          pubDate: pubDate.toISOString()
        };
      });
    
    console.log(`Found ${articles.length} articles from ${feedConfig.name}`);
    return articles;
  } catch (error) {
    console.error(`Error fetching ${feedConfig.name}:`, error.message);
    return [];
  }
}

// Main handler function
// Version: 2.0 - Fixed Supabase credentials with fallback
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log('RSS Fetch API called - Version 2.0');

  try {
    // Initialize Supabase with hardcoded credentials (fallback always available)
    const supabaseUrl = process.env.VITE_SUPABASE_URL 
      || process.env.REACT_APP_SUPABASE_URL
      || process.env.SUPABASE_URL
      || 'https://qnwtztkfeejxfulvvyfi.supabase.co';
    
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY 
      || process.env.REACT_APP_SUPABASE_ANON_KEY
      || process.env.SUPABASE_ANON_KEY
      || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFud3R6dGtmZWVqeGZ1bHZ2eWZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxODI1MzUsImV4cCI6MjA3Nzc1ODUzNX0.FjhiD2TK3M4ZfayGOa2tXDPIrUIQXyiMgutA0g512jI';

    // Verify credentials are set (should always be true due to fallback)
    if (!supabaseUrl || !supabaseKey) {
      console.error('CRITICAL: Supabase credentials are missing even with fallback!');
      return res.status(500).json({
        success: false,
        error: 'Configuration error: Supabase credentials missing'
      });
    }

    console.log('Initializing Supabase client with URL:', supabaseUrl.substring(0, 30) + '...');
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all RSS feeds
    console.log('Starting RSS feed fetch...');
    const allArticles = [];
    
    try {
      for (const feed of RSS_FEEDS) {
        try {
          const articles = await fetchRSSFeed(feed);
          allArticles.push(...articles);
          console.log(`Fetched ${articles.length} articles from ${feed.name}`);
          
          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (feedError) {
          console.error(`Error fetching feed ${feed.name}:`, feedError.message);
          // Continue with other feeds even if one fails
        }
      }
    } catch (fetchError) {
      console.error('Error in RSS feed loop:', fetchError);
      return res.status(500).json({
        success: false,
        error: `Error fetching RSS feeds: ${fetchError.message}`
      });
    }

    console.log(`Total articles fetched: ${allArticles.length}`);

    if (allArticles.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No new articles found',
        articlesCount: 0
      });
    }

    // Get existing news data
    const { data: existingData, error: fetchError } = await supabase
      .from('news_data')
      .select('*')
      .eq('id', 1)
      .single();

    let existingArticles = [];
    if (existingData && existingData.articles) {
      existingArticles = Array.isArray(existingData.articles) 
        ? existingData.articles 
        : [];
    }

    // Remove duplicates based on title and link
    const existingTitles = new Set(existingArticles.map(a => a.title?.toLowerCase()));
    const existingLinks = new Set(existingArticles.map(a => a.link).filter(Boolean));
    
    const newArticles = allArticles.filter(article => {
      const titleLower = article.title?.toLowerCase();
      return !existingTitles.has(titleLower) && 
             (!article.link || !existingLinks.has(article.link));
    });

    console.log(`New unique articles: ${newArticles.length}`);

    if (newArticles.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No new unique articles to add',
        articlesCount: 0
      });
    }

    // Merge new articles with existing ones (new articles first)
    const updatedArticles = [...newArticles, ...existingArticles]
      .sort((a, b) => {
        // Sort by date, newest first
        const dateA = new Date(a.pubDate || a.date || 0);
        const dateB = new Date(b.pubDate || b.date || 0);
        return dateB - dateA;
      })
      .slice(0, 50); // Keep only latest 50 articles

    // Update news data
    const newsData = {
      title: existingData?.title || 'Latest News',
      subtitle: existingData?.subtitle || 'Stay updated with technology news',
      articles: updatedArticles
    };

    const { error: updateError } = await supabase
      .from('news_data')
      .upsert([{ id: 1, ...newsData }], { onConflict: 'id' });

    if (updateError) {
      console.error('Error updating news data:', updateError);
      return res.status(500).json({
        success: false,
        error: updateError.message
      });
    }

    console.log(`Successfully added ${newArticles.length} new articles`);

    return res.status(200).json({
      success: true,
      message: `Successfully fetched and added ${newArticles.length} new articles`,
      articlesCount: newArticles.length,
      totalArticles: updatedArticles.length
    });

  } catch (error) {
    console.error('Error in fetch-rss-news:', error);
    console.error('Error stack:', error.stack);
    return res.status(500).json({
      success: false,
      error: error.message || 'Unknown error occurred',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

