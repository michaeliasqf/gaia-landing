export function formatGuarani(monto: number): string {
  const entero = Math.round(monto);
  const partes: string[] = [];
  let resto = entero.toString();
  while (resto.length > 3) {
    partes.unshift(resto.slice(-3));
    resto = resto.slice(0, -3);
  }
  if (resto.length > 0) partes.unshift(resto);
  return `${partes.join(".")} Gs.`;
}

export function formatM2(ancho: number, alto: number): string {
  return `${ancho.toFixed(2)} m × ${alto.toFixed(2)} m = ${(ancho * alto).toFixed(2)} m²`;
}
