import { useState } from "react";
import type { Indicadores as IndicadoresType } from "../../types";
import { IndicadorCard } from "./IndicadorCard";
import "./indicadores.css";

interface IndicadoresGridProps {
  indicadores: IndicadoresType;
  onRefresh: () => Promise<void>;
  source?: string | null;
}

export function IndicadoresGrid({ indicadores, onRefresh, source }: IndicadoresGridProps) {
  const [refreshing, setRefreshing] = useState(false);

  async function handleRefresh() {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  }

  return (
    <div className="indicadores">
      <div className="indicadores-grid">
        <IndicadorCard
          label="UF"
          valor={indicadores.uf.valor}
          fecha={indicadores.uf.fecha}
          accent="uf"
          refreshing={refreshing}
        />
        <IndicadorCard
          label="UTM"
          valor={indicadores.utm.valor}
          fecha={indicadores.utm.fecha}
          accent="utm"
          refreshing={refreshing}
        />
      </div>
      <div className="indicadores-footer">
        <button
          className={`refresh-btn ${refreshing ? "refreshing" : ""}`}
          onClick={handleRefresh}
          disabled={refreshing}
          title="Actualizar"
        >
          <i className="fa-solid fa-arrows-rotate"></i>
        </button>
        {source && (
          <span className="source-tag">
            <i className="fa-solid fa-circle"></i>
            {source}
          </span>
        )}
      </div>
    </div>
  );
}
