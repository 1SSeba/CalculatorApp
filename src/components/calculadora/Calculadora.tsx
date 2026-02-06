import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import type { Indicadores, TipoMoneda, Resultados } from "../../types";
import { Card } from "../ui";
import { ResultadosList } from "./ResultadosList";
import "./calculadora.css";

export interface CalculadoraRef {
  loadConversion: (monto: number, tipo: TipoMoneda, resultados: Resultados) => void;
}

interface CalculadoraProps {
  indicadores: Indicadores;
  decimals: number;
  onConvert?: (monto: number, tipo: TipoMoneda, resultados: Resultados) => void;
}

const MONEDAS: TipoMoneda[] = ["CLP", "UF", "UTM"];

// Formatear número: 1234567 -> 1.234.567 o 1234567,89 -> 1.234.567,89
function formatWithThousands(num: string): string {
  if (!num) return "";
  
  // Separar parte entera y decimal
  const parts = num.split(",");
  const integerPart = parts[0];
  const decimalPart = parts[1];
  
  // Agregar puntos de miles a la parte entera
  const formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
  if (decimalPart !== undefined) {
    return `${formatted},${decimalPart}`;
  }
  return formatted;
}

// Parsear el valor formateado a número
function parseInputNumber(value: string): number {
  // Remover puntos de miles y reemplazar coma decimal por punto
  const cleaned = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
}

function calcular(monto: number, tipo: TipoMoneda, ind: Indicadores): Resultados {
  let clp: number, uf: number, utm: number;

  switch (tipo) {
    case "CLP":
      clp = monto;
      uf = monto / ind.uf.valor;
      utm = monto / ind.utm.valor;
      break;
    case "UF":
      clp = monto * ind.uf.valor;
      uf = monto;
      utm = (monto * ind.uf.valor) / ind.utm.valor;
      break;
    case "UTM":
      clp = monto * ind.utm.valor;
      uf = (monto * ind.utm.valor) / ind.uf.valor;
      utm = monto;
      break;
  }

  return { clp, uf, utm };
}

export const Calculadora = forwardRef<CalculadoraRef, CalculadoraProps>(
  function Calculadora({ indicadores, decimals, onConvert }, ref) {
  const [monto, setMonto] = useState("");
  const [tipoOrigen, setTipoOrigen] = useState<TipoMoneda>("CLP");
  const [resultados, setResultados] = useState<Resultados | null>(null);
  const [fromHistorial, setFromHistorial] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    loadConversion(montoNum: number, tipo: TipoMoneda, res: Resultados) {
      setMonto(formatWithThousands(montoNum.toString().replace(".", ",")));
      setTipoOrigen(tipo);
      setResultados(res);
      setFromHistorial(true);
      setTimeout(() => setFromHistorial(false), 600);
    }
  }));

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value;
    
    // Remover todo excepto números y coma (para decimal)
    let cleaned = rawValue.replace(/[^\d,]/g, "");
    
    // Solo permitir una coma
    const commaIndex = cleaned.indexOf(",");
    if (commaIndex !== -1) {
      cleaned = cleaned.slice(0, commaIndex + 1) + cleaned.slice(commaIndex + 1).replace(/,/g, "");
    }
    
    // Formatear con puntos de miles
    setMonto(formatWithThousands(cleaned));
  }

  function handleConvert(e: React.FormEvent) {
    e.preventDefault();
    const num = parseInputNumber(monto);
    if (isNaN(num) || num <= 0) return;

    const res = calcular(num, tipoOrigen, indicadores);
    setResultados(res);
    onConvert?.(num, tipoOrigen, res);
  }

  return (
    <Card className={`calc-card${fromHistorial ? " calc-card--loaded" : ""}`}>
      <form className="calculadora" onSubmit={handleConvert}>
        <label className="calc-label">Monto a convertir</label>
        <div className="calc-input-row">
          <input
            ref={inputRef}
            type="text"
            inputMode="decimal"
            className="calc-input"
            placeholder="0"
            value={monto}
            onChange={handleInputChange}
          />
          <select
            className="calc-select"
            value={tipoOrigen}
            onChange={(e) => setTipoOrigen(e.target.value as TipoMoneda)}
          >
            {MONEDAS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="calc-btn" disabled={!monto}>
          Convertir
        </button>
      </form>

      {resultados && (
        <div className="calc-results">
          <div className="calc-results-divider" />
          <span className="calc-label">Resultados</span>
          <ResultadosList
            resultados={resultados}
            decimals={decimals}
          />
        </div>
      )}
    </Card>
  );
});
