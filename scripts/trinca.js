/* Gerador da trinca. Determinístico (PRNG com semente) para o resultado
   ser estático e conferível. A saída são os `d` de cada camada. */

const SEMENTE = 20250818;
let s = SEMENTE;
const rnd = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
const ent = (a, b) => a + rnd() * (b - a);

const IX = 58, IY = 70;          // ponto de impacto, no viewBox 100x203
const N  = 14;                   // fissuras radiais
const ANEIS = [7.5, 12, 17.5, 24.5, 33, 44, 57];   // raios dos anéis

const r2 = n => Math.round(n * 100) / 100;

/* ---- 1. RADIAIS ----------------------------------------------------
   cada fissura é uma polilinha: parte do impacto e a cada anel muda um
   pouco de direção. vidro racha quase reto, mas quebra o ângulo toda
   vez que cruza uma tensão — é esse joelho que tira o ar de "raio de
   bicicleta". cada uma vai até um anel diferente. */
const radiais = [];
for (let i = 0; i < N; i++) {
  const passo = (Math.PI * 2) / N;
  let ang = i * passo + ent(-passo * .34, passo * .34);
  const ateAnel = Math.min(ANEIS.length - 1,
      3 + Math.floor(ent(0, ANEIS.length - 2.2)));   // alcance desigual
  const pts = [[IX, IY]];
  const raios = [];
  for (let k = 0; k <= ateAnel; k++) {
    ang += ent(-.13, .13);                       // o joelho
    const r = ANEIS[k] * ent(.84, 1.16);         // anel irregular por fissura
    raios.push(r);
    pts.push([IX + Math.cos(ang) * r, IY + Math.sin(ang) * r]);
  }
  /* NEM TODA FISSURA NASCE NO IMPACTO. em vidro real boa parte delas
     ''pega'' só depois do primeiro anel — são propagações, não raios.
     com todas partindo do mesmo pixel, quatorze traços e seus halos se
     empilham num vão de 2 unidades e o miolo vira uma bola branca. */
  radiais.push({ pts, raios, ang, ateAnel, nasce: rnd() < .5 });
}

/* ---- 2. ANÉIS ------------------------------------------------------
   as circunferenciais ligam UMA fissura à vizinha, como corda — e não
   como anel fechado. algumas faltam: vidro não racha parelho. leve
   barriga para fora, que é como a tensão realmente propaga. */
const cordas = [];
for (let k = 0; k < ANEIS.length; k++) {
  for (let i = 0; i < N; i++) {
    const a = radiais[i], b = radiais[(i + 1) % N];
    if (k > a.ateAnel || k > b.ateAnel) continue;
    if (rnd() < (k < 2 ? .15 : k < 4 ? .34 : .60)) continue;        // corda ausente
    const p = a.pts[k + 1], q = b.pts[k + 1];
    const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
    const d = Math.hypot(mx - IX, my - IY) || 1;
    const bojo = ent(1.02, 1.13);                     // barriga para fora
    cordas.push({
      d: `M${r2(p[0])} ${r2(p[1])}Q${r2(IX + (mx-IX)*bojo)} ${r2(IY + (my-IY)*bojo)} ${r2(q[0])} ${r2(q[1])}`,
      r: d,
      celula: [a.pts[k], a.pts[k+1], b.pts[k+1], b.pts[k]]
    });
  }
}

/* ---- 3. RAMIFICAÇÕES ----------------------------------------------
   uma fissura que se abre em duas no meio do caminho. é detalhe barato
   e é o que mais distancia de "desenho vetorial". */
const ramos = [];
for (const a of radiais) {
  if (rnd() < .45) continue;
  const k = 1 + Math.floor(rnd() * (a.ateAnel - 1));
  if (k < 1 || k >= a.pts.length - 1) continue;
  const base = a.pts[k];
  const ang = a.ang + ent(.3, .75) * (rnd() < .5 ? 1 : -1);
  const comp = ent(4, 11);
  const meio = [base[0] + Math.cos(ang) * comp * .55, base[1] + Math.sin(ang) * comp * .55];
  const fim  = [meio[0] + Math.cos(ang + ent(-.25,.25)) * comp * .45,
                meio[1] + Math.sin(ang + ent(-.25,.25)) * comp * .45];
  ramos.push({ d:`M${r2(base[0])} ${r2(base[1])} ${r2(meio[0])} ${r2(meio[1])} ${r2(fim[0])} ${r2(fim[1])}`,
               r: Math.hypot(base[0]-IX, base[1]-IY) + comp });
}

/* ---- 4. CACOS ------------------------------------------------------
   os planos deslocados entre duas fissuras e dois anéis. cada face pega
   a luz de um jeito, e é isso que separa "riscos na tela" de vidro
   estilhaçado. só nos anéis internos, onde o vidro realmente soltou. */
const cacos = [];
for (const c of cordas) {
  if (c.r > 26 || c.r < 9 || rnd() < .45) continue;
  const pts = c.celula.map(p => `${r2(p[0])} ${r2(p[1])}`).join(' ');
  cacos.push({ d:`M${pts}Z`, r:c.r, alfa:+ent(.045,.13).toFixed(3) });
}

/* ---- 5. CRATERA ----------------------------------------------------
   o vidro pulverizado no ponto de contato: um punhado de cacos minúsculos.
   é o que dá "aqui bateu" em vez de "aqui as linhas se encontram". */
const cratera = [];
for (let i = 0; i < 9; i++) {
  const a0 = (i / 9) * Math.PI * 2 + ent(-.2, .2);
  const r0 = ent(1.1, 3.4), r1 = ent(1.1, 3.4);
  const a1 = a0 + ent(.35, .8);
  cratera.push(`M${r2(IX)} ${r2(IY)} ${r2(IX+Math.cos(a0)*r0)} ${r2(IY+Math.sin(a0)*r0)} ${r2(IX+Math.cos(a1)*r1)} ${r2(IY+Math.sin(a1)*r1)}Z`);
}

/* ---- 6. DISTRIBUIÇÃO POR CAMADA -----------------------------------
   a camada é dada pelo RAIO: perto do impacto = grossa, clara e última
   a sarar; longe = fina, apagada e primeira a sumir. é o afinamento da
   fissura e a ordem da cura saindo da mesma medida. */
const FAIXAS = [42, 28, 18, 10, 0];
const camada = r => FAIXAS.findIndex(f => r >= f);

const trechos = [];
for (const a of radiais) {              // parte cada radial anel a anel
  for (let k = 0; k < a.pts.length - 1; k++) {
    if (k === 0 && !a.nasce) continue;   // começa já no primeiro anel
    const rm = (Math.hypot(a.pts[k][0]-IX, a.pts[k][1]-IY) +
                Math.hypot(a.pts[k+1][0]-IX, a.pts[k+1][1]-IY)) / 2;
    trechos.push({ d:`M${r2(a.pts[k][0])} ${r2(a.pts[k][1])} ${r2(a.pts[k+1][0])} ${r2(a.pts[k+1][1])}`, r:rm });
  }
}
for (const c of cordas) trechos.push({ d:c.d, r:c.r });
for (const b of ramos)  trechos.push({ d:b.d, r:b.r });

const porCamada = [[],[],[],[],[]];
for (const t of trechos) porCamada[Math.max(0, camada(t.r))].push(t.d);
const cacosPorCamada = [[],[],[],[],[]];
for (const c of cacos) cacosPorCamada[Math.max(0, camada(c.r))].push(c);

console.log(JSON.stringify({
  camadas: porCamada.map((v,i) => ({ n:i, traços:v.length, d:v.join(' ') })),
  cacos: cacosPorCamada.map((v,i) => ({ n:i, quantos:v.length,
    d: v.map(c=>c.d).join(' ') })),
  cratera: cratera.join(' '),
  radiais: N, cordas: cordas.length, ramos: ramos.length, cacos_total: cacos.length
}, null, 1));

/* ---- 7. SAÍDA: o bloco HTML pronto ---------------------------------
   traço DUPLO por camada: um halo largo e apagado por baixo, a fissura
   fina e clara por cima. é assim que a luz espalha na espessura do
   vidro — traço único chapado é o que fazia parecer caneta. */
const ESTILO = [
  //  --t   larg  opac  halo  título
  ['.40', .26, .20, .80, 'as pontas que correm até a borda — as mais finas, primeiras a fechar'],
  ['.45', .36, .26, .95, 'o corpo longo das fissuras'],
  ['.50', .48, .32, 1.10, 'o anel médio, onde o vidro começa a soltar'],
  ['.55', .62, .38, 1.25, 'o que nasce do impacto, com os planos deslocados'],
  ['.60', .85, .46, 1.35, 'a cratera: vidro pulverizado, o último a fechar'],
];
const linhas = [];
for (let i = 0; i < 5; i++) {
  const [t, w, o, hw, tit] = ESTILO[i];
  const traços = porCamada[i].join(' ');
  const cs = cacosPorCamada[i];
  if (!traços && !cs.length) continue;
  linhas.push(`            <!-- CAMADA ${5-i}: ${tit} -->`);
  linhas.push(`            <svg viewBox="0 0 100 203" preserveAspectRatio="xMidYMid slice"`);
  linhas.push(`                 style="--t:${t};--k:10" stroke-width="${w}" stroke-opacity="${o}">`);
  /* UM PATH POR CACO, não todos num `d` só: cada face de vidro deslocado
     pega a luz num ângulo próprio, e é essa variação que separa estilhaço
     de desenho. juntando tudo num path, a opacidade sorteada de cada caco
     era calculada e jogada fora — todos saíam com o mesmo tom. são ~12
     elementos no total, dentro dos SVGs que já existem. */
  for (const c of cs) linhas.push(`              <path class="caco" fill-opacity="${c.alfa}" d="${c.d}"/>`);
  if (i === 4)    linhas.push(`              <path class="cratera" d="${cratera.join(' ')}"/>`);
  if (traços) {
    linhas.push(`              <path class="halo" stroke-width="${hw}" d="${traços}"/>`);
    linhas.push(`              <path d="${traços}"/>`);
  }
  linhas.push(`            </svg>`);
}
require('fs').writeFileSync('bloco.html', linhas.join('\n') + '\n');
console.error(`\ncamadas: ${porCamada.map(v=>v.length).join(' / ')}   cacos: ${cacosPorCamada.map(v=>v.length).join(' / ')}`);
