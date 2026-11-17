import { useMemo } from 'react';
import DOMPurify from 'dompurify';

/** El HTML ya viene saneado desde el servicio de contenido; se vuelve a sanear aquí. */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['style', 'iframe', 'form', 'script'],
    FORBID_ATTR: ['style', 'onerror', 'onload'],
  });
}

export function RichText({ html, className = '' }: { html: string; className?: string }) {
  const clean = useMemo(() => sanitizeHtml(html), [html]);
  return (
    <div
      className={`prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-h2:mt-8 prose-h2:text-xl prose-h3:text-base prose-li:my-1 prose-a:text-brand-blue dark:prose-a:text-sky-400 ${className}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
