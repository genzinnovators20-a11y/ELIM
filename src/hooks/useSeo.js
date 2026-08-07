import { useEffect } from 'react';
import { SITE_URL, SITE_NAME, OG_IMAGE } from '../constants/seo';

const setMeta = (selector, attrs) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
};

const setLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

/**
 * Applies per-route document metadata (title, description, canonical, Open Graph,
 * Twitter card, robots). Avoids pulling in a helmet dependency for six routes.
 */
export function useSeo({ title, description, path = '/', image = OG_IMAGE, noindex = false } = {}) {
  useEffect(() => {
    if (title) document.title = title;

    const url = `${SITE_URL}${path === '/' ? '/' : path}`;

    if (description) {
      setMeta('meta[name="description"]', { name: 'description', content: description });
      setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
      setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    }
    if (title) {
      setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
      setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    }

    setMeta('meta[property="og:url"]', { property: 'og:url', content: url });
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: image });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
    setMeta('meta[name="robots"]', {
      name: 'robots',
      content: noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    });

    setLink('canonical', url);
  }, [title, description, path, image, noindex]);
}

export default useSeo;
