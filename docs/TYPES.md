# Documentación de Tipos

Este documento describe las interfaces y tipos utilizados en la aplicación.

## Indicadores

```typescript
interface Indicador {
  valor: number;   // Valor actual del indicador
  fecha: string;   // Fecha ISO del valor
}

interface Indicadores {
  uf: Indicador;   // Unidad de Fomento
  utm: Indicador;  // Unidad Tributaria Mensual
}
```

## Conversiones

```typescript
type TipoMoneda = "CLP" | "UF" | "UTM";

interface Resultados {
  clp: number;  // Valor en pesos chilenos
  uf: number;   // Valor en UF
  utm: number;  // Valor en UTM
}
```

## Historial

```typescript
interface HistorialItem {
  id: string;              // UUID único
  fecha: string;           // Fecha ISO de la conversión
  montoOriginal: number;   // Monto ingresado
  tipoOrigen: TipoMoneda;  // Moneda de origen
  resultados: Resultados;  // Resultados de la conversión
}
```

## Configuración

```typescript
type ApiSourceId = "mindicador" | "mindicador-individual" | "cmf" | "auto";

interface AppSettings {
  theme: "system" | "light" | "dark";  // Tema de la aplicación
  decimalPrecision: number;             // Decimales a mostrar (0-4)
  autoRefresh: boolean;                 // Auto-actualizar indicadores
  refreshInterval: number;              // Intervalo en segundos
  apiSource: ApiSourceId;               // Fuente de datos preferida
}
```

## Hooks

### useIndicadores

```typescript
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
```

### useHistorial

```typescript
interface UseHistorialReturn {
  historial: HistorialItem[];
  addEntry: (monto: number, tipo: TipoMoneda, resultados: Resultados) => void;
  removeEntry: (id: string) => void;
  clearAll: () => void;
}
```

### useClipboard

```typescript
interface UseClipboardReturn {
  copied: string | null;  // Label del último elemento copiado
  copy: (text: string, label?: string) => Promise<void>;
}
```

## Componentes

### Calculadora

```typescript
interface CalculadoraRef {
  loadConversion: (monto: number, tipo: TipoMoneda, resultados: Resultados) => void;
}

interface CalculadoraProps {
  indicadores: Indicadores;
  decimals: number;
  onConvert?: (monto: number, tipo: TipoMoneda, resultados: Resultados) => void;
}
```

### HistorialList

```typescript
interface HistorialListProps {
  open: boolean;
  onClose: () => void;
  historial: HistorialItem[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onSelect?: (item: HistorialItem) => void;
}
```

### Modal

```typescript
interface ModalProps {
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}
```

## Services

### DataSource

```typescript
interface DataSource {
  id: string;
  name: string;
  fetch: () => Promise<Indicadores>;
}
```

### Storage Keys

| Key | Tipo | Descripción |
|-----|------|-------------|
| `calculadora-settings` | `AppSettings` | Configuración de la app |
| `calculadora-historial` | `HistorialItem[]` | Historial de conversiones (máx. 50) |
