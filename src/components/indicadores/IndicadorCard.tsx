import { formatNumber, formatDate } from "../../services";

interface IndicadorCardProps {
  label: string;
  valor: number;
  fecha: string;
  accent: "uf" | "utm";
  refreshing?: boolean;
}

export function IndicadorCard({ label, valor, fecha, accent, refreshing }: IndicadorCardProps) {
  return (
    <div className={`indicador-card indicador-card--${accent}`}>
      <span className="indicador-label">{label}</span>
      <span className={`indicador-valor ${refreshing ? "skeleton-inline" : ""}`}>
        {refreshing ? "" : `$${formatNumber(valor, 2)}`}
      </span>
      <span className={`indicador-fecha ${refreshing ? "skeleton-inline skeleton-inline--sm" : ""}`}>
        {refreshing ? "" : <><i className="fa-regular fa-calendar"></i>{formatDate(fecha)}</>}
      </span>
    </div>
  );
}
