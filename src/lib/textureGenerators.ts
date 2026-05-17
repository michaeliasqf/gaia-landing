export function generateOndasTexture(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = "#8a8a8a";
  ctx.lineWidth = 6;
  for (let row = 0; row < 8; row++) {
    ctx.beginPath();
    for (let x = 0; x <= 512; x += 4) {
      const y = row * 64 + 32 + Math.sin((x + row * 30) * 0.03) * 20;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  return canvas;
}

export function generateCeramicaTexture(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#d4c5a9";
  ctx.fillRect(0, 0, 512, 512);
  const size = 64;
  for (let y = 0; y < 512; y += size) {
    for (let x = 0; x < 512; x += size) {
      ctx.strokeStyle = "#a0845c";
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 2, y + 2, size - 4, size - 4);
      ctx.fillStyle = "#c4b08a";
      ctx.fillRect(x + 6, y + 6, size - 12, size - 12);
    }
  }
  return canvas;
}

export function generatePVCTexture(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#e8e0d4";
  ctx.fillRect(0, 0, 512, 512);
  const grid = 32;
  for (let y = 0; y < 512; y += grid) {
    for (let x = 0; x < 512; x += grid) {
      if (Math.random() > 0.4) {
        const offset = Math.random() * 4;
        ctx.fillStyle = "#c4b8a8";
        ctx.fillRect(x + offset, y + offset, grid - 2, grid - 2);
      }
    }
  }
  return canvas;
}

export function generateMaderaTexture(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#8b7355";
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = "#5c4a32";
  ctx.lineWidth = 8;
  for (let i = 0; i < 512; i += 48) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }
  for (let i = 0; i < 512; i += 48) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
  }
  return canvas;
}

export function generateHormigonTexture(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#9e9e9e";
  ctx.fillRect(0, 0, 512, 512);
  const size = 64;
  ctx.fillStyle = "#7a7a7a";
  for (let y = 0; y < 512; y += size) {
    for (let x = 0; x < 512; x += size) {
      ctx.beginPath();
      ctx.moveTo(x, y + size);
      ctx.lineTo(x + size / 2, y);
      ctx.lineTo(x + size, y + size);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#5a5a5a";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
  return canvas;
}

export type TextureType = "ondas" | "ceramica" | "pvc" | "madera" | "hormigon";

export function getTextureGenerator(type: TextureType): () => HTMLCanvasElement {
  const map: Record<TextureType, () => HTMLCanvasElement> = {
    ondas: generateOndasTexture,
    ceramica: generateCeramicaTexture,
    pvc: generatePVCTexture,
    madera: generateMaderaTexture,
    hormigon: generateHormigonTexture,
  };
  return map[type];
}
