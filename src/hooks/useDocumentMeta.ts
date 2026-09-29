import { useEffect } from "react";

interface DocumentMeta {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
}

/**
 * Sets the document title and description/og meta tags for the current page.
 * ogTitle/ogDescription default to title/description when omitted.
 */
export function useDocumentMeta({ title, description, ogTitle, ogDescription }: DocumentMeta) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", ogTitle ?? title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", ogDescription ?? description);
  }, [title, description, ogTitle, ogDescription]);
}
