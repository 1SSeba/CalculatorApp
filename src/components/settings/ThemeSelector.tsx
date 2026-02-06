interface ThemeSelectorProps {
  value: "system" | "light" | "dark";
  onChange: (theme: "system" | "light" | "dark") => void;
}

const THEMES = [
  { id: "system" as const, label: "Sistema", icon: "fa-solid fa-circle-half-stroke" },
  { id: "light" as const, label: "Claro", icon: "fa-solid fa-sun" },
  { id: "dark" as const, label: "Oscuro", icon: "fa-solid fa-moon" },
];

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <div className="setting-row">
      <span className="setting-label">Tema</span>
      <div className="theme-group">
        {THEMES.map((t) => (
          <button
            key={t.id}
            className={`theme-btn ${value === t.id ? "theme-btn--active" : ""}`}
            onClick={() => onChange(t.id)}
            title={t.label}
          >
            <i className={t.icon}></i>
          </button>
        ))}
      </div>
    </div>
  );
}
