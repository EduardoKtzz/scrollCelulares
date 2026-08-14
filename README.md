# scrollCelulares

Landing page para assistência técnica de celular (marca de exemplo: **FixCell**),
com um hero em scrollytelling inspirado no facilpay.io.

Arquivo único: [`index.html`](index.html). Sem build, sem dependências além da
fonte do Google e do Lenis (rolagem suave, opcional — se o CDN falhar a página
cai na rolagem nativa). Basta abrir no navegador.

## Como o hero funciona

Um único handler de scroll calcula o progresso `p` (0 → 1) dentro do hero e
escreve variáveis CSS na raiz. Todo o resto é CSS reagindo a essas variáveis.

| variável | o que comanda |
|---|---|
| `--p` / `--pscale` / `--pshift` | o celular encolhe do tamanho gigante até o final |
| `--pt` | o texto branco do hero sai |
| `--pa` | a conversa e as frases grandes entram, escalonadas |
| `--po` | as peças 3D flutuantes sobem e saem de quadro |
| `--pf` | foco no aparelho: luz migra do topo para o aro, vinheta fecha, partículas somem |
| `--pp` | pulso do card de avaliação (entra, segura, sai) |
| `--pv` | fecho verde: o chat sai, o check entra, a espiral preenche a tela |
| `--p4` | tudo sai e o título final entra |

O preenchimento em espiral cruza duas coisas ao mesmo tempo: um disco que
cresce (`scale`) e um `conic-gradient` cujo ângulo varre de 0 a 360°. Só uma
delas daria um círculo abrindo ou um ponteiro de relógio; juntas, a borda do
verde descreve uma espiral.

A agenda das fases está documentada numa tabela em comentário, logo acima do
bloco que escreve as variáveis (procure por `AGENDA DAS FASES`).

Elementos individuais se escalonam sozinhos dentro de uma variável, via um
limiar `--t` próprio:

```css
--l: clamp(0, calc((var(--pa) - var(--t)) * 5), 1);
```

O `clamp` é obrigatório: sem ele o valor passa de 1 e o `translateY` inverte de
sinal, jogando o elemento para além do lugar dele.

## Regras que custaram caro para descobrir

Ficam registradas porque são fáceis de reintroduzir sem perceber:

- **Nada que pinte pode depender de uma variável de scroll.** Gradientes com
  paradas em `calc()`, `box-shadow` com raio interpolado e `filter` animado
  forçam repintura de tela cheia a cada quadro. Use fusão cruzada de camadas
  fixas com `opacity`, que o compositor resolve sozinho.
- **Não anime `height` do celular.** A `.screen` é um container de consulta;
  mudar a altura recalcula toda unidade `cqw`/`cqh` do chat por quadro. Use
  `scale` — a base é o tamanho gigante e a escala só diminui, porque reduzir
  mantém o texto nítido e ampliar borraria a tela inicial.
- **`cqw` não enxerga o próprio container.** Usada no elemento que declara
  `container-type`, a unidade cai para a largura da janela. Tem que ficar nos
  filhos.
- **`background-clip: text` corta descidas de g/p/ç** quando a caixa é menor
  que o glifo. Resolvido com `padding-bottom` nas classes de gradiente.
- **Percentuais em `inset` não são simétricos**: topo/base resolvem contra a
  altura e as laterais contra a largura. O bezel do celular corrige isso
  multiplicando pela razão de aspecto.
- **Quem dá tempo de leitura é a pausa, não a entrada.** Uma fase que termina
  de entrar no último quadro da seção nunca é vista parada — lê-se só enquanto
  ela ainda aparece, e a seção seguinte já toma a tela. O título final entra
  em 37vh e depois SEGURA por 62vh, com a mesma variável: passado o fim da
  faixa ela fica em 1 e o descanso sai de graça.
- **O progresso de uma seção travada (`sticky`) fica em zero enquanto ela
  entra na tela.** São 100vh de rolagem em que já se vê a seção e o relógio
  dela ainda não começou. Antecipar o início do `range()` não adianta — no
  instante da entrada o valor continua sendo zero. Quem tem que nascer
  adiantado é o elemento: no `--chega` dos cards isso é a dianteira de `.14`.

## Ajustes rápidos

| o quê | onde |
|---|---|
| velocidade geral | `.hero{height}` e `wheelMultiplier` na config do Lenis |
| tempo de leitura de uma fase | a PAUSA depois dela, não a faixa de entrada |
| tamanho do celular | `--phone-start` / `--phone-end` / `--phone-top` |
| ritmo de cada fase | os `range(p, a, b)` no bloco `AGENDA DAS FASES` |
| paleta | `--accent-1/2/3` e `--grad-blue` |

## Antes de publicar

Remover as meta tags `Cache-Control` / `Pragma` do `<head>` — elas existem só
para o desenvolvimento local, onde `file://` guarda cache com força.
