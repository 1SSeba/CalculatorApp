import { API_SOURCES } from "../../services";
import type { ApiSourceId } from "../../types";

interface ApiSelectorProps {
  value: ApiSourceId;
  onChange: (source: ApiSourceId) => void;
}

export function ApiSelector({ value, onChange }: ApiSelectorProps) {
  return (
    <div className="setting-row">
      <span className="setting-label">Fuente de datos</span>
      <select
        className="setting-select"
        value={value}
        onChange={(e) => onChange(e.target.value as ApiSourceId)}
      >
        <option value="auto">Automático</option>
        {API_SOURCES.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
}
