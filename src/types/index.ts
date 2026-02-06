export interface Indicador {
  valor: number;
  fecha: string;
}

export interface Indicadores {
  uf: Indicador;
  utm: Indicador;
}

export type TipoMoneda = "CLP" | "UF" | "UTM";

export interface Resultados {
  clp: number;
  uf: number;
  utm: number;
}

export interface HistorialItem {
  id: string;
  fecha: string;
  montoOriginal: number;
  tipoOrigen: TipoMoneda;
  resultados: Resultados;
}

export type ApiSourceId = "mindicador" | "mindicador-individual" | "cmf" | "auto";

export interface AppSettings {
  theme: "system" | "light" | "dark";
  decimalPrecision: number;
  autoRefresh: boolean;
  refreshInterval: number;
  apiSource: ApiSourceId;
}
