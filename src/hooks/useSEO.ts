import { useEffect } from 'react';
import { useLocale } from '@/contexts/LocaleContext';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string[];
}

/**
 * Hook for managing SEO meta tags dynamically
 * Updates document title and meta tags for better SEO and social sharing
 */
export const useSEO = ({
  title,
  description,
  image,
  url,
  keywords = [],
}: SEOProps = {}) => {
  const { locale } = useLocale();

  useEffect(() => {
    // Default values
    const defaultTitle = locale === 'id' 
      ? 'TravelHub - Jelajahi Keindahan Indonesia' 
      : 'TravelHub - Explore Indonesia\'s Beauty';
    const defaultDescription = locale === 'id'
      ? 'Platform terpercaya untuk menemukan destinasi wisata terbaik di Indonesia'
      : 'Trusted platform to discover the best tourist destinations in Indonesia';
    const defaultImage = '/placeholder.svg';
    const defaultUrl = window.location.href;

    // Set document title
    document.title = title ? `${title} | TravelHub` : defaultTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description || defaultDescription);
    if (keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '));
    }
    updateMetaTag('author', 'TravelHub Indonesia');

    // Open Graph meta tags (Facebook, LinkedIn)
    updateMetaTag('og:title', title || defaultTitle, true);
    updateMetaTag('og:description', description || defaultDescription, true);
    updateMetaTag('og:image', image || defaultImage, true);
    updateMetaTag('og:url', url || defaultUrl, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:locale', locale === 'id' ? 'id_ID' : 'en_US', true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title || defaultTitle);
    updateMetaTag('twitter:description', description || defaultDescription);
    updateMetaTag('twitter:image', image || defaultImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url || defaultUrl;

  }, [title, description, image, url, keywords, locale]);
};
