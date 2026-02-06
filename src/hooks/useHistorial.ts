import { useState, useCallback } from "react";
import type { HistorialItem, TipoMoneda, Resultados } from "../types";
import { loadHistorial, saveHistorial, clearHistorial as clearStorage } from "../services";

export function useHistorial() {
  const [historial, setHistorial] = useState<HistorialItem[]>(() => loadHistorial());

  const addEntry = useCallback(
    (montoOriginal: number, tipoOrigen: TipoMoneda, resultados: Resultados) => {
      const entry: HistorialItem = {
        id: crypto.randomUUID(),
        fecha: new Date().toISOString(),
        montoOriginal,
        tipoOrigen,
        resultados,
      };
      setHistorial((prev) => {
        const next = [entry, ...prev].slice(0, 50);
        saveHistorial(next);
        return next;
      });
    },
    []
  );

  const removeEntry = useCallback((id: string) => {
    setHistorial((prev) => {
      const next = prev.filter((h) => h.id !== id);
      saveHistorial(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setHistorial([]);
    clearStorage();
  }, []);

  return { historial, addEntry, removeEntry, clearAll };
}
