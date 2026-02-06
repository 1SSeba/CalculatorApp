import type { Indicadores } from "../types";

export interface DataSource {
  id: string;
  name: string;
  fetch: () => Promise<Indicadores>;
}

// Fuente 1: mindicador.cl (API principal)
async function fetchFromMindicador(): Promise<Indicadores> {
  const response = await fetch("https://mindicador.cl/api");
  if (!response.ok) throw new Error("Error mindicador.cl");
  const data = await response.json();
  return {
    uf: { valor: data.uf.valor, fecha: data.uf.fecha },
    utm: { valor: data.utm.valor, fecha: data.utm.fecha },
  };
}

// Fuente 2: mindicador.cl por indicador individual (fallback)
async function fetchFromMindicadorIndividual(): Promise<Indicadores> {
  const [ufResponse, utmResponse] = await Promise.all([
    fetch("https://mindicador.cl/api/uf"),
    fetch("https://mindicador.cl/api/utm"),
  ]);

  if (!ufResponse.ok || !utmResponse.ok)
    throw new Error("Error mindicador individual");

  const [ufData, utmData] = await Promise.all([
    ufResponse.json(),
    utmResponse.json(),
  ]);

  return {
    uf: { valor: ufData.serie[0].valor, fecha: ufData.serie[0].fecha },
    utm: { valor: utmData.serie[0].valor, fecha: utmData.serie[0].fecha },
  };
}

// Fuente 3: CMF API (Comisión para el Mercado Financiero)
async function fetchFromCMF(): Promise<Indicadores> {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const [ufResponse, utmResponse] = await Promise.all([
    fetch(
      `https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=random&formato=json`
    ),
    fetch(
      `https://api.cmfchile.cl/api-sbifv3/recursos_api/utm?apikey=random&formato=json`
    ),
  ]);

  if (!ufResponse.ok || !utmResponse.ok) throw new Error("Error CMF API");

  const [ufData, utmData] = await Promise.all([
    ufResponse.json(),
    utmResponse.json(),
  ]);

  const ufValor = parseFloat(
    ufData.UFs[0]?.Valor?.replace(/\./g, "").replace(",", ".") || "0"
  );
  const utmValor = parseFloat(
    utmData.UTMs[0]?.Valor?.replace(/\./g, "").replace(",", ".") || "0"
  );

  if (ufValor === 0 || utmValor === 0)
    throw new Error("Valores CMF inválidos");

  return {
    uf: {
      valor: ufValor,
      fecha: `${year}-${month}-${day}T00:00:00.000Z`,
    },
    utm: {
      valor: utmValor,
      fecha: `${year}-${month}-01T00:00:00.000Z`,
    },
  };
}

export const DATA_SOURCES: DataSource[] = [
  { id: "mindicador", name: "mindicador.cl", fetch: fetchFromMindicador },
  {
    id: "mindicador-individual",
    name: "mindicador.cl (individual)",
    fetch: fetchFromMindicadorIndividual,
  },
  { id: "cmf", name: "CMF Chile", fetch: fetchFromCMF },
];

export const API_SOURCES = DATA_SOURCES.map((s) => ({
  id: s.id,
  name: s.name,
}));
