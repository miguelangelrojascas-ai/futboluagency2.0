import { useEffect } from "react";

const SITE_ORIGIN = "https://futboluagency.com";

interface DocumentMeta {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  /**
   * Path this page should declare as canonical, e.g. "/recursos".
   * index.html ships a canonical pointing at the homepage, so every page that
   * leaves this out would tell search engines it is a duplicate of the home
   * page. Pass it on every route.
   */
  canonicalPath?: string;
}

/**
 * Sets the document title, description/og meta tags and canonical link for the
 * current page.
 *
 * ogTitle/ogDescription default to title/description when omitted.
 */
export function useDocumentMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  canonicalPath,
}: DocumentMeta) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", ogTitle ?? title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", ogDescription ?? description);

    if (canonicalPath) {
      const href = `${SITE_ORIGIN}${canonicalPath === "/" ? "" : canonicalPath}`;
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = href;
      document.querySelector('meta[property="og:url"]')?.setAttribute("content", href);
    }
  }, [title, description, ogTitle, ogDescription, canonicalPath]);
}
