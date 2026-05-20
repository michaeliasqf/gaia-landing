function addNoise(ctx: CanvasRenderingContext2D, amount: number) {
  const imageData = ctx.getImageData(0, 0, 512, 512);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * amount;
    data[i] += noise;
    data[i + 1] += noise;
    data[i + 2] += noise;
  }
  ctx.putImageData(imageData, 0, 0);
}

export function generateOndasTexture(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, 512, 512);

  const colors = ["#c0c0c0", "#a8a8a8", "#909090", "#b8b8b8", "#989898"];
  for (let row = 0; row < 7; row++) {
    const baseY = row * 68 + 34;
    const freq = 0.025 + Math.random() * 0.01;
    const amp = 18 + Math.random() * 12;
    const phase = row * 25 + Math.random() * 20;

    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;

    ctx.beginPath();
    for (let x = 0; x <= 512; x += 2) {
      const y = baseY + Math.sin(x * freq + phase) * amp + Math.sin(x * 0.05 + row) * 5;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = colors[row % colors.length];
    ctx.lineWidth = 8 + Math.random() * 4;
    ctx.stroke();

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    ctx.beginPath();
    for (let x = 0; x <= 512; x += 2) {
      const y = baseY + Math.sin(x * freq + phase) * amp + Math.sin(x * 0.05 + row) * 5;
      if (x === 0) ctx.moveTo(x, y - 2); else ctx.lineTo(x, y - 2);
    }
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  addNoise(ctx, 4);
  return canvas;
}

export function generateCeramicaTexture(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#c9b99a";
  ctx.fillRect(0, 0, 512, 512);

  addNoise(ctx, 6);

  const size = 64;
  for (let y = 0; y < 512; y += size) {
    for (let x = 0; x < 512; x += size) {
      const inset = 4;

      ctx.shadowColor = "rgba(0,0,0,0.25)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      ctx.fillStyle = "#d9c9aa";
      ctx.fillRect(x + inset, y + inset, size - inset * 2, size - inset * 2);

      ctx.shadowColor = "rgba(255,255,255,0.2)";
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;

      ctx.fillStyle = "#e8dcc4";
      ctx.fillRect(x + inset + 2, y + inset + 2, size - inset * 2 - 4, size - inset * 2 - 4);

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.strokeStyle = "#a0845c";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x + inset, y + inset, size - inset * 2, size - inset * 2);
    }
  }

  addNoise(ctx, 3);
  return canvas;
}

export function generatePVCTexture(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#e8e0d4";
  ctx.fillRect(0, 0, 512, 512);

  addNoise(ctx, 5);

  const grid = 28;
  for (let y = 0; y < 512; y += grid) {
    for (let x = 0; x < 512; x += grid) {
      if (Math.random() > 0.35) {
        const w = grid - 2 - Math.random() * 4;
        const h = grid - 2 - Math.random() * 4;
        const ox = Math.random() * 3;
        const oy = Math.random() * 3;

        ctx.shadowColor = "rgba(0,0,0,0.2)";
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        const brightness = 180 + Math.random() * 50;
        ctx.fillStyle = `rgb(${brightness}, ${brightness - 10}, ${brightness - 20})`;
        ctx.fillRect(x + ox, y + oy, w, h);

        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${0.05 + Math.random() * 0.08})`;
        ctx.fillRect(x + ox + 1, y + oy + 1, w - 2, 2);
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

  const baseColor = "#8b7355";
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 60; i++) {
    const y = Math.random() * 512;
    const alpha = 0.03 + Math.random() * 0.06;
    ctx.strokeStyle = `rgba(60, 40, 20, ${alpha})`;
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 512; x += 8) {
      ctx.lineTo(x, y + Math.sin(x * 0.02) * 3 + (Math.random() - 0.5) * 2);
    }
    ctx.stroke();
  }

  addNoise(ctx, 8);

  const spacing = 48;
  const halfSpacing = spacing / 2;

  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  ctx.strokeStyle = "#5c4a32";
  ctx.lineWidth = 10;
  for (let i = 0; i <= 512 + spacing; i += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }
  for (let i = 0; i <= 512 + spacing; i += spacing) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
  }

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 3;
  for (let i = spacing; i <= 512; i += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, i - halfSpacing);
    ctx.lineTo(512, i - halfSpacing);
    ctx.stroke();
  }
  for (let i = spacing; i <= 512; i += spacing) {
    ctx.beginPath();
    ctx.moveTo(i - halfSpacing, 0);
    ctx.lineTo(i - halfSpacing, 512);
    ctx.stroke();
  }

  return canvas;
}

export function generateHormigonTexture(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#a0a0a0";
  ctx.fillRect(0, 0, 512, 512);

  addNoise(ctx, 12);

  for (let i = 0; i < 80; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = 1 + Math.random() * 3;
    const alpha = 0.05 + Math.random() * 0.1;
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const size = 64;
  for (let y = 0; y < 512; y += size) {
    for (let x = 0; x < 512; x += size) {
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      ctx.beginPath();
      ctx.moveTo(x + 2, y + size - 2);
      ctx.lineTo(x + size / 2, y + 4);
      ctx.lineTo(x + size - 2, y + size - 2);
      ctx.closePath();
      ctx.fillStyle = "#7a7a7a";
      ctx.fill();
      ctx.strokeStyle = "#5a5a5a";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.beginPath();
      ctx.moveTo(x + size / 2 - 8, y + 12);
      ctx.lineTo(x + size / 2, y + 4);
      ctx.lineTo(x + size / 2 + 8, y + 12);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fill();
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
