import { useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import { guessLang } from '../lib/format';

/** Bloque de código con resaltado de sintaxis y botón para copiar (igual que en el sitio). */
export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const lang = guessLang(code);
  const grammar = lang === 'python' ? Prism.languages.python : Prism.languages.bash;
  const highlighted = Prism.highlight(code, grammar, lang);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* el portapapeles puede estar bloqueado dentro del iframe del LMS */
    }
  };

  return (
    <div className="relative my-5 overflow-hidden rounded-xl bg-space-900 text-slate-100">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-slate-400">
        <span className="mono">{lang}</span>
        <button type="button" onClick={() => void copy()} className="rounded px-2 py-1 font-semibold text-sky-300 hover:bg-white/10" aria-live="polite">
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className={`language-${lang} m-0 overflow-x-auto bg-transparent p-4 text-[.82rem] leading-relaxed`} tabIndex={0}>
        <code className={`language-${lang}`} dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}
