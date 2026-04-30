const { URL } = require('url');

const decodeHtml = (value = '') => value
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>');

const parseMetaTag = (html, attributeNames = [], name) => {
  for (const attr of attributeNames) {
    const regex = new RegExp(`<meta[^>]+(?:property|name)\\s*=\\s*['\"]${attr}['\"][^>]*content\\s*=\\s*['\"]([^'\"]+)['\"][^>]*>`, 'i');
    const match = html.match(regex);
    if (match && match[1]) {
      return decodeHtml(match[1].trim());
    }

    // Support attributes in reverse order in the tag
    const regexAlt = new RegExp(`<meta[^>]+content\\s*=\\s*['\"]([^'\"]+)['\"][^>]+(?:property|name)\\s*=\\s*['\"]${attr}['\"][^>]*>`, 'i');
    const matchAlt = html.match(regexAlt);
    if (matchAlt && matchAlt[1]) {
      return decodeHtml(matchAlt[1].trim());
    }
  }

  if (name) {
    const regex = new RegExp(`<meta[^>]+name\\s*=\\s*['\"]${name}['\"][^>]*content\\s*=\\s*['\"]([^'\"]+)['\"][^>]*>`, 'i');
    const match = html.match(regex);
    if (match && match[1]) {
      return decodeHtml(match[1].trim());
    }
  }

  return '';
};

const resolveImageUrl = (image, pageUrl) => {
  if (!image) return '';

  try {
    return new URL(decodeHtml(image), pageUrl).href;
  } catch (e) {
    return decodeHtml(image);
  }
};

const extractImageFromHtmlBlock = (block, pageUrl) => {
  const imagePatterns = [
    /<img[^>]+(?:src|data-src|data-lazy-src)=['"]([^'"]+)['"][^>]*>/i,
    /background(?:-image)?\s*:\s*url\((?:['"])?([^'")]+)(?:['"])?\)/i
  ];

  for (const pattern of imagePatterns) {
    const match = block.match(pattern);
    if (match && match[1]) {
      return resolveImageUrl(match[1], pageUrl);
    }
  }

  return '';
};

const extractImageUrl = (html, pageUrl) => {
  let image = parseMetaTag(html, ['og:image', 'twitter:image', 'image_src'], 'image');
  if (image) {
    return resolveImageUrl(image, pageUrl);
  }

  const heroSectionMatch = html.match(/<(header|section|main|div)\b[^>]*(?:class|id)=['"][^'"]*(?:hero|banner|header|home|intro)[^'"]*['"][\s\S]*?<\/\1>/i);
  if (heroSectionMatch) {
    const heroImage = extractImageFromHtmlBlock(heroSectionMatch[0], pageUrl);
    if (heroImage) return heroImage;
  }

  const imgMatch = html.match(/<img[^>]+src=['\"]([^'\"]+)['\"][^>]*>/i);
  if (imgMatch && imgMatch[1]) {
    return resolveImageUrl(imgMatch[1], pageUrl);
  }

  return '';
};

module.exports = async (req, res) => {
  const url = req.query.url || (req.body && req.body.url);

  if (!url || typeof url !== 'string' || !/^https?:\/\//i.test(url)) {
    return res.status(400).json({ success: false, message: 'Invalid URL provided.' });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; DigitalProductsMetadataBot/1.0; +https://github.com/)',
        'Accept': 'text/html'
      },
      redirect: 'follow',
      timeout: 15000
    });

    if (!response.ok) {
      return res.status(502).json({ success: false, message: `Unable to fetch the URL: ${response.statusText}` });
    }

    const html = await response.text();

    let title = parseMetaTag(html, ['og:title', 'twitter:title'], null);
    if (!title) {
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      title = titleMatch ? decodeHtml(titleMatch[1].trim()) : '';
    }

    let description = parseMetaTag(html, ['og:description', 'twitter:description'], 'description');

    const image = extractImageUrl(html, url);

    return res.status(200).json({
      success: true,
      url,
      title: title || '',
      description: description || '',
      image: image || ''
    });
  } catch (error) {
    console.error('fetch-url-meta error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch meta from URL.', error: error.message });
  }
};
