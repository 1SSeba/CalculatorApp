import type { HistorialItem as HistorialItemType } from "../../types";
import { formatCLP, formatNumber, formatTime, formatDateShort } from "../../services";

interface HistorialItemProps {
  item: HistorialItemType;
  onRemove: (id: string) => void;
  onSelect?: () => void;
}

export function HistorialItem({ item, onRemove, onSelect }: HistorialItemProps) {
  const { id, fecha, montoOriginal, tipoOrigen, resultados } = item;

  function getFormattedOrigen() {
    switch (tipoOrigen) {
      case "CLP":
        return formatCLP(montoOriginal);
      case "UF":
        return `${formatNumber(montoOriginal, 2)} UF`;
      case "UTM":
        return `${formatNumber(montoOriginal, 2)} UTM`;
    }
  }

  const conversions = (Object.keys(resultados) as Array<keyof typeof resultados>)
    .filter((k) => k.toUpperCase() !== tipoOrigen)
    .map((k) => {
      const label = k.toUpperCase();
      const val = k === "clp" ? formatCLP(resultados[k]) : `$${formatNumber(resultados[k], 2)}`;
      return `${label} ${val}`;
    });

  function handleClick(e: React.MouseEvent) {
    // No activar si se clickeó el botón de eliminar
    if ((e.target as HTMLElement).closest('.historial-remove')) return;
    onSelect?.();
  }

  return (
    <div className="historial-item" onClick={handleClick} title="Click para cargar">
      <div className="historial-item-main">
        <span className="historial-origen">{getFormattedOrigen()}</span>
        <span className="historial-arrow">→</span>
        <span className="historial-conversions">{conversions.join(" · ")}</span>
      </div>
      <div className="historial-item-meta">
        <span className="historial-date">{formatDateShort(fecha)} {formatTime(fecha)}</span>
        <button className="historial-remove" onClick={() => onRemove(id)} title="Eliminar">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
