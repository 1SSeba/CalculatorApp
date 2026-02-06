import { useState, useEffect, useRef } from "react";
import { useSettings } from "./context";
import { useIndicadores, useHistorial } from "./hooks";
import {
  TitleBar,
  IndicadoresGrid,
  IndicadoresSkeleton,
  Calculadora,
  HistorialList,
  Settings,
} from "./components";
import type { CalculadoraRef } from "./components";
import type { HistorialItem } from "./types";
import "./App.css";

function App() {
  const [isTauri, setIsTauri] = useState<boolean | null>(null);

  useEffect(() => {
    // Misma lógica que TitleBar para sincronizar
    import("@tauri-apps/api/window")
      .then((mod) => {
        try {
          mod.getCurrentWindow();
          setIsTauri(true);
        } catch {
          setIsTauri(false);
        }
      })
      .catch(() => {
        setIsTauri(false);
      });
  }, []);

  const { settings } = useSettings();
  const { indicadores, loading, error, source, refetch } = useIndicadores({
    autoRefresh: settings.autoRefresh,
    refreshInterval: settings.refreshInterval,
    preferredSource: settings.apiSource,
  });
  const { historial, addEntry, removeEntry, clearAll } = useHistorial();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [historialOpen, setHistorialOpen] = useState(false);
  
  const calculadoraRef = useRef<CalculadoraRef>(null);

  function handleHistorialSelect(item: HistorialItem) {
    calculadoraRef.current?.loadConversion(item.montoOriginal, item.tipoOrigen, item.resultados);
  }

  return (
    <>
      {isTauri && <TitleBar />}
      <main className={`container${isTauri === true ? "" : " no-titlebar"}`}>
        {loading && !indicadores && <IndicadoresSkeleton />}

        {error && !indicadores && (
          <div className="error">
            <p>{error}</p>
            <button onClick={refetch}>Reintentar</button>
          </div>
        )}

        {indicadores && (
          <>
            <IndicadoresGrid
              indicadores={indicadores}
              onRefresh={refetch}
              source={source}
            />
            <Calculadora
              ref={calculadoraRef}
              indicadores={indicadores}
              decimals={settings.decimalPrecision}
              onConvert={addEntry}
            />
          </>
        )}
      </main>

      {/* FAB Container */}
      <div className="fab-container">
        <button
          className="fab fab-historial"
          onClick={() => setHistorialOpen(true)}
          title="Historial"
        >
          <i className="fa-solid fa-clock-rotate-left"></i>
        </button>
        <button
          className="fab fab-settings"
          onClick={() => setSettingsOpen(true)}
          title="Ajustes"
        >
          <i className="fa-solid fa-gear"></i>
        </button>
      </div>

      <HistorialList
        open={historialOpen}
        onClose={() => setHistorialOpen(false)}
        historial={historial}
        onRemove={removeEntry}
        onClearAll={clearAll}
        onSelect={handleHistorialSelect}
      />

      <Settings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
}

export default App;
