import type { Resultados } from "../../types";
import { ResultadoItem } from "./ResultadoItem";

interface ResultadosListProps {
  resultados: Resultados;
  decimals: number;
}

const LABELS: Record<string, string> = {
  clp: "CLP",
  uf: "UF",
  utm: "UTM",
};

export function ResultadosList({ resultados, decimals }: ResultadosListProps) {
  const items = Object.keys(resultados) as Array<keyof Resultados>;

  return (
    <div className="resultados-list">
      {items.map((key) => (
        <ResultadoItem
          key={key}
          label={LABELS[key]}
          valor={resultados[key]}
          tipo={key}
          decimals={key === "clp" ? 0 : decimals}
        />
      ))}
    </div>
  );
}
