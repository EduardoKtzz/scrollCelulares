/* Gera os ícones do PWA a partir da marca, sem dependência nenhuma.
   Mesma ideia do trinca.js: o asset é DERIVADO, não um binário solto no
   repositório — dá para reler o desenho e regerar em qualquer tamanho.

   node scripts/icones.js

   O desenho é o ícone da marca que vive comentado na .brand do index:
   moldura de celular arredondada com um hexágono dentro, no gradiente
   #5BE3FF → #2E9BFF → #0B5FD8, sobre o fundo escuro da página.

   PNG escrito na mão: assinatura + IHDR + IDAT (deflate do zlib nativo)
   + IEND. RGBA de 8 bits, filtro 0 em cada linha. */
const zlib = require('zlib');
const fs   = require('fs');
const path = require('path');

/* ---------- PNG ---------- */
const tabelaCRC = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = tabelaCRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}
function chunk(tipo, dados) {
  const len = Buffer.alloc(4); len.writeUInt32BE(dados.length);
  const corpo = Buffer.concat([Buffer.from(tipo, 'ascii'), dados]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(corpo));
  return Buffer.concat([len, corpo, crc]);
}
function png(w, h, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; /* 8 bits, RGBA */
  /* cada linha leva um byte de filtro na frente; 0 = sem filtro */
  const bruto = Buffer.alloc(h * (w * 4 + 1));
  for (let y = 0; y < h; y++) {
    bruto[y * (w * 4 + 1)] = 0;
    rgba.copy(bruto, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(bruto, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ---------- geometria, no espaço 24x24 do SVG original ---------- */
/* distância com sinal até um retângulo arredondado: negativa dentro,
   positiva fora. é ela que dá o traço da moldura e o antisserrilhado. */
function sdRetArred(px, py, cx, cy, hw, hh, r) {
  const qx = Math.abs(px - cx) - (hw - r);
  const qy = Math.abs(py - cy) - (hh - r);
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
}
const HEX = [[12,7.4],[16.1,9.8],[16.1,14.5],[12,16.9],[7.9,14.5],[7.9,9.8]];
function dentroHex(px, py) {
  let dentro = false;
  for (let i = 0, j = HEX.length - 1; i < HEX.length; j = i++) {
    const [xi, yi] = HEX[i], [xj, yj] = HEX[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) dentro = !dentro;
  }
  return dentro;
}
/* o gradiente da marca, percorrido na diagonal do glifo */
const PARADAS = [[0, [0x5b,0xe3,0xff]], [0.6, [0x2e,0x9b,0xff]], [1, [0x0b,0x5f,0xd8]]];
function corGradiente(t) {
  t = Math.max(0, Math.min(1, t));
  for (let i = 1; i < PARADAS.length; i++) {
    const [t0, c0] = PARADAS[i-1], [t1, c1] = PARADAS[i];
    if (t <= t1) { const k = (t - t0) / (t1 - t0);
      return [0,1,2].map(j => Math.round(c0[j] + (c1[j] - c0[j]) * k)); }
  }
  return PARADAS[PARADAS.length-1][1];
}

/* ---------- desenho ---------- */
/* escala: fração do lado que o glifo de 24x24 ocupa. o ícone "any" pode
   usar quase tudo; o "maskable" recua para 60%, porque o Android recorta
   em círculo e come as bordas. */
function desenha(w, h, escalaGlifo) {
  const lado = Math.min(w, h);
  const AA = 4;                       /* supersampling, 16 amostras/pixel */
  const rgba = Buffer.alloc(w * h * 4);
  const g = lado * escalaGlifo;       /* lado do glifo em px */
  const offX = (w - g) / 2, offY = (h - g) / 2;
  const paraX = v => (v - offX) / g * 24;
  const paraY = v => (v - offY) / g * 24;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let ac = [0,0,0,0];
      for (let sy = 0; sy < AA; sy++) for (let sx = 0; sx < AA; sx++) {
        const px = paraX(x + (sx + .5) / AA);
        const py = paraY(y + (sy + .5) / AA);

        /* fundo: quase-preto com um halo azul difuso, como a página */
        const dCentro = Math.hypot(px - 12, py - 11) / 17;
        const brilho = Math.max(0, 1 - dCentro) ** 2;
        let r = 8 + 26 * brilho, gr = 8 + 52 * brilho, b = 8 + 96 * brilho, a = 255;

        /* moldura: traço de 1.9 sobre o retângulo arredondado do SVG */
        const d = sdRetArred(px, py, 12, 12, 6.3, 10.3, 3.3);
        const traco = 1 - Math.min(1, Math.max(0, (Math.abs(d) - .95) / .16));
        const hex = dentroHex(px, py) ? 1 : 0;
        const cob = Math.max(traco, hex);
        if (cob > 0) {
          const c = corGradiente(((px - 5.7) + (py - 1.7)) / 33);
          r = r + (c[0] - r) * cob; gr = gr + (c[1] - gr) * cob; b = b + (c[2] - b) * cob;
        }
        ac[0] += r; ac[1] += gr; ac[2] += b; ac[3] += a;
      }
      const n = AA * AA, i = (y * w + x) * 4;
      rgba[i]   = Math.round(ac[0] / n);
      rgba[i+1] = Math.round(ac[1] / n);
      rgba[i+2] = Math.round(ac[2] / n);
      rgba[i+3] = Math.round(ac[3] / n);
    }
  }
  return png(w, h, rgba);
}

const dir = path.join(__dirname, '..', 'icons');
fs.mkdirSync(dir, { recursive: true });
const saidas = [
  ['icon-192.png',           192,  192, .78],
  ['icon-512.png',           512,  512, .78],
  ['icon-maskable-512.png',  512,  512, .56],  /* recuado: o Android recorta em círculo */
  /* CARTÃO DE COMPARTILHAMENTO — 1200x630 é a proporção que WhatsApp,
     Facebook e LinkedIn recortam sem cortar nada. o ícone quadrado que
     estava aqui antes aparecia minúsculo e com tarja nas laterais.
     sem texto de propósito: o título vem do og:title, e desenhar
     tipografia à mão num PNG envelhece mal quando a copy muda. */
  ['og.png',                1200,  630, .42],
];
for (const [nome, w, h, esc] of saidas) {
  const buf = desenha(w, h, esc);
  fs.writeFileSync(path.join(dir, nome), buf);
  console.log(nome.padEnd(24), w + 'x' + h, (buf.length / 1024).toFixed(1) + ' KB');
}
