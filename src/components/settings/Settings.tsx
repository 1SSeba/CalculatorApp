import { useSettings } from "../../context";
import { Modal } from "../ui";
import { ThemeSelector } from "./ThemeSelector";
import { ApiSelector } from "./ApiSelector";
import "./settings.css";

interface SettingsProps {
  open: boolean;
  onClose: () => void;
}

export function Settings({ open, onClose }: SettingsProps) {
  const { settings, updateSettings, resetSettings } = useSettings();

  if (!open) return null;

  return (
    <Modal
      title="Ajustes"
      onClose={onClose}
      footer={
        <div className="settings-footer">
          <button className="settings-reset-btn" onClick={resetSettings}>
            Restablecer valores
          </button>
          <span className="settings-version">v0.1.0</span>
        </div>
      }
    >
      <div className="settings-content">
        <div className="settings-section">
          <span className="settings-section-title">
            <i className="fa-solid fa-palette"></i> Apariencia
          </span>
          <ThemeSelector
            value={settings.theme}
            onChange={(theme) => updateSettings({ theme })}
          />
        </div>

        <div className="settings-section">
          <span className="settings-section-title">
            <i className="fa-solid fa-calculator"></i> Conversión
          </span>
          <div className="setting-row">
            <span className="setting-label">Decimales</span>
            <div className="precision-group">
              {[0, 1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  className={`precision-btn ${settings.decimalPrecision === n ? "precision-btn--active" : ""}`}
                  onClick={() => updateSettings({ decimalPrecision: n })}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="settings-section">
          <span className="settings-section-title">
            <i className="fa-solid fa-database"></i> Datos
          </span>
          <ApiSelector
            value={settings.apiSource}
            onChange={(apiSource) => updateSettings({ apiSource })}
          />
          <div className="setting-row">
            <div>
              <span className="setting-label">Auto-actualizar</span>
              <span className="setting-hint">Actualiza indicadores periódicamente</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.autoRefresh}
                onChange={(e) => updateSettings({ autoRefresh: e.target.checked })}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          {settings.autoRefresh && (
            <div className="setting-row setting-row--indent">
              <span className="setting-label">Intervalo (seg)</span>
              <input
                type="number"
                className="setting-input"
                value={settings.refreshInterval}
                onChange={(e) => updateSettings({ refreshInterval: Math.max(10, parseInt(e.target.value) || 60) })}
                min="10"
                max="600"
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
