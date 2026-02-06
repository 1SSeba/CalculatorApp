import type { AppSettings, HistorialItem } from "../types";

const SETTINGS_KEY = "calculadora-settings";
const HISTORIAL_KEY = "calculadora-historial";
const MAX_HISTORIAL = 50;

export const DEFAULT_SETTINGS: AppSettings = {
  theme: "system",
  decimalPrecision: 2,
  autoRefresh: false,
  refreshInterval: 60,
  apiSource: "auto",
};

// --- Settings ---

export function loadSettings(): AppSettings {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (!saved) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// --- Historial ---

export function loadHistorial(): HistorialItem[] {
  try {
    const saved = localStorage.getItem(HISTORIAL_KEY);
    if (!saved) return [];
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveHistorial(historial: HistorialItem[]): void {
  const trimmed = historial.slice(0, MAX_HISTORIAL);
  localStorage.setItem(HISTORIAL_KEY, JSON.stringify(trimmed));
}

export function clearHistorial(): void {
  localStorage.removeItem(HISTORIAL_KEY);
}
