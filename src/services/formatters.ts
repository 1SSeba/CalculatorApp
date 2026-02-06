export function formatCLP(num: number): string {
  return "$" + num.toLocaleString("es-CL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatNumber(num: number, decimals: number): string {
  return num.toLocaleString("es-CL", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatDate(fecha: string): string {
  return new Date(fecha).toLocaleDateString("es-CL");
}

export function formatDateShort(fecha: string): string {
  return new Date(fecha).toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "short",
  });
}

export function formatTime(fecha: string): string {
  return new Date(fecha).toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
