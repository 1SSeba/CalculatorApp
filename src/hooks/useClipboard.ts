import { useState, useCallback } from "react";

export function useClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = useCallback(
    async (text: string, label?: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(label ?? text);
        setTimeout(() => setCopied(null), resetDelay);
      } catch {
        // Fallback
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(label ?? text);
        setTimeout(() => setCopied(null), resetDelay);
      }
    },
    [resetDelay]
  );

  return { copied, copy };
}
