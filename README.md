# Calculadora UF/UTM/CLP

Aplicación de escritorio para convertir entre pesos chilenos (CLP), Unidad de Fomento (UF) y Unidad Tributaria Mensual (UTM) usando valores actualizados en tiempo real.

![Tauri](https://img.shields.io/badge/Tauri-2.0-blue)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6)

## Características

- **Conversión en tiempo real** entre CLP, UF y UTM
- **Múltiples fuentes de datos**: mindicador.cl, CMF Chile
- **Historial de conversiones** con posibilidad de recargar conversiones anteriores
- **Temas claro/oscuro** con soporte para preferencia del sistema
- **Actualización automática** de indicadores (configurable)
- **Copiar resultados** al portapapeles con un clic
- **Interfaz nativa** con titlebar personalizado

## Requisitos

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) (recomendado) o npm
- [Rust](https://www.rust-lang.org/tools/install)
- [Tauri CLI](https://tauri.app/start/prerequisites/)

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd Cri

# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm run tauri dev

# Compilar para producción
pnpm run tauri build
```

## Uso

1. **Convertir**: Ingresa un monto, selecciona la moneda de origen y presiona "Convertir"
2. **Copiar**: Haz clic en cualquier resultado para copiarlo al portapapeles
3. **Historial**: Accede al historial desde el botón flotante (reloj) para ver o recargar conversiones anteriores
4. **Ajustes**: Configura el tema, precisión decimal, fuente de datos y auto-actualización

## Estructura del Proyecto

```
src/
├── components/
│   ├── calculadora/     # Componentes de la calculadora
│   ├── historial/       # Lista e items del historial
│   ├── indicadores/     # Cards de UF/UTM
│   ├── layout/          # TitleBar personalizado
│   ├── settings/        # Panel de configuración
│   └── ui/              # Componentes reutilizables (Card, Modal)
├── context/             # SettingsContext (tema, preferencias)
├── hooks/               # Custom hooks (useIndicadores, useHistorial, useClipboard)
├── services/            # API, formatters, storage
├── types/               # TypeScript types
└── App.tsx              # Componente principal

src-tauri/
├── src/                 # Código Rust de Tauri
├── capabilities/        # Permisos de la app
└── tauri.conf.json      # Configuración de Tauri
```

## APIs Utilizadas

| Fuente | Endpoint | Prioridad |
|--------|----------|-----------|
| mindicador.cl | `https://mindicador.cl/api` | Principal |
| mindicador.cl (individual) | `https://mindicador.cl/api/uf`, `/api/utm` | Fallback |
| CMF Chile | `https://api.cmfchile.cl/api-sbifv3/recursos_api/` | Fallback |

## Configuración

Las preferencias se guardan en `localStorage`:

- **Tema**: `system` | `light` | `dark`
- **Decimales**: 0-4
- **Auto-actualizar**: boolean
- **Intervalo**: segundos (mín. 10)
- **Fuente de datos**: `auto` | `mindicador` | `mindicador-individual` | `cmf`

## Scripts

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia servidor de desarrollo (solo web) |
| `pnpm build` | Compila el frontend |
| `pnpm tauri dev` | Inicia la app de escritorio en modo desarrollo |
| `pnpm tauri build` | Compila la app para distribución |

## Tecnologías

- **Frontend**: React 19, TypeScript, Vite
- **Desktop**: Tauri 2.0
- **Estilos**: CSS vanilla con variables CSS
- **Iconos**: Font Awesome 6

## Licencia

MIT
