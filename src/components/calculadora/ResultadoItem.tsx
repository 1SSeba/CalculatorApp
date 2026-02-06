import { useClipboard } from "../../hooks";
import { formatNumber, formatCLP } from "../../services";
import { useEffect, useRef, useState } from "react";

interface ResultadoItemProps {
  label: string;
  valor: number;
  tipo: "clp" | "uf" | "utm";
  decimals: number;
}

export function ResultadoItem({ label, valor, tipo, decimals }: ResultadoItemProps) {
  const { copied, copy } = useClipboard(1500);
  const isCopied = copied === label;
  const [displayValue, setDisplayValue] = useState(valor);
  const [isUpdating, setIsUpdating] = useState(false);
  const prevValorRef = useRef(valor);
  const isFirstRender = useRef(true);

  const formatted = tipo === "clp" ? formatCLP(displayValue) : formatNumber(displayValue, decimals);

  // Animación suave solo cuando cambia el valor (no en el primer render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setDisplayValue(valor);
      prevValorRef.current = valor;
      return;
    }

    if (prevValorRef.current !== valor) {
      setIsUpdating(true);
      const startValue = prevValorRef.current;
      const endValue = valor;
      const duration = 250;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 2);
        const currentValue = startValue + (endValue - startValue) * eased;
        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(endValue);
          prevValorRef.current = endValue;
          setTimeout(() => setIsUpdating(false), 100);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [valor]);

  // Valor formateado para copiar (siempre usa el valor final, no el animado)
  const formattedForCopy = tipo === "clp" ? formatCLP(valor) : formatNumber(valor, decimals);

  function handleCopy() {
    copy(formattedForCopy, label);
  }

  return (
    <div
      className={`resultado-item ${isCopied ? "resultado-item--copied" : ""}`}
      onClick={handleCopy}
      title={isCopied ? "¡Copiado!" : `Click para copiar`}
    >
      <span className="resultado-label">{label}</span>
      <div className="resultado-right">
        <span className={`resultado-valor ${isUpdating ? "resultado-valor--updating" : ""}`}>
          {formatted}
        </span>
        <span className={`copy-indicator ${isCopied ? "copy-indicator--show" : ""}`}>
          <i className="fa-regular fa-clipboard"></i>
        </span>
      </div>
    </div>
  );
}
