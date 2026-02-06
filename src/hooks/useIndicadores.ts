import { useState, useEffect, useCallback, useRef } from "react";
import type { Indicadores, ApiSourceId } from "../types";
import { DATA_SOURCES, type DataSource } from "../services";

interface UseIndicadoresOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
  preferredSource?: ApiSourceId;
}

interface UseIndicadoresReturn {
  indicadores: Indicadores | null;
  loading: boolean;
  error: string | null;
  source: string | null;
  refetch: () => Promise<void>;
}

export function useIndicadores(
  options: UseIndicadoresOptions = {}
): UseIndicadoresReturn {
  const {
    autoRefresh = false,
    refreshInterval = 60,
    preferredSource = "auto",
  } = options;

  const [indicadores, setIndicadores] = useState<Indicadores | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  const fetchIndicadores = useCallback(async () => {
    setLoading(true);
    setError(null);

    const delayPromise = new Promise((resolve) => setTimeout(resolve, 800));

    let sourcesToTry: DataSource[];

    if (preferredSource === "auto") {
      sourcesToTry = DATA_SOURCES;
    } else {
      const preferred = DATA_SOURCES.find((s) => s.id === preferredSource);
      if (preferred) {
        sourcesToTry = [
          preferred,
          ...DATA_SOURCES.filter((s) => s.id !== preferredSource),
        ];
      } else {
        sourcesToTry = DATA_SOURCES;
      }
    }

    for (const dataSource of sourcesToTry) {
      try {
        const [data] = await Promise.all([dataSource.fetch(), delayPromise]);
        setIndicadores(data);
        setSource(dataSource.name);
        setLoading(false);
        return;
      } catch (err) {
        console.warn(`Fuente ${dataSource.name} falló:`, err);
        continue;
      }
    }

    setError(
      "No se pudieron cargar los indicadores. Verifica tu conexión."
    );
    setLoading(false);
  }, [preferredSource]);

  useEffect(() => {
    fetchIndicadores();
  }, [fetchIndicadores]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (autoRefresh && refreshInterval > 0) {
      intervalRef.current = window.setInterval(
        () => fetchIndicadores(),
        refreshInterval * 60 * 1000
      );
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRefresh, refreshInterval, fetchIndicadores]);

  return { indicadores, loading, error, source, refetch: fetchIndicadores };
}
