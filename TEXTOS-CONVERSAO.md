# Textos de conversão — FixCell

Escrito depois de ler o [sistema](https://github.com/EduardoKtzz/newsystemAssistenciaSAAS)
e a [landing](https://github.com/EduardoKtzz/scrollCelulares). Cada frase daqui
corresponde a algo que está implementado — a lista do que sustenta cada promessa
está no fim.

Foco nas duas dores que mais fecham venda: **o cliente acompanhar o conserto** e
**o cliente aprovar o orçamento**.

---

## O argumento que ninguém mais tem

O sistema resolve uma coisa que os concorrentes não perceberam, e ela está no
`README`: **quem precisa acompanhar o conserto é justamente quem está sem
celular.** O aparelho está na sua bancada.

Isso derruba tudo que a concorrência usa:

- **senha** — ele não lembra, e a conta foi criada no dia que estava nervoso
- **SMS** — o chip está dentro do aparelho que está com você
- **app** — ele não vai instalar nada no PC do cunhado

O acesso é **CPF ou o código do comprovante, mais os 4 últimos dígitos do
telefone**. Abre de qualquer máquina.

Use isso. É o tipo de detalhe que faz o dono da loja pensar "esse cara já
trabalhou com isso" — e é verdade.

---

## 1. WhatsApp — a sequência

### Abertura

> Bom dia! Meu nome é Eduardo, trabalho com TI aqui em [cidade].
>
> Uma pergunta meio aleatória: quantas vezes por dia ligam aí só pra perguntar se o aparelho já ficou pronto?

Ele sabe a resposta, ela irrita, e é um custo que já foi normalizado. Responder é
o mesmo que perceber o problema. O "meio aleatória" dá licença para responder sem
sentir que entrou num funil de vendas.

### Quando ele responder

> Pois é. E o pior nem é a ligação — é que quem liga quase nunca sabe o número da OS, então alguém aí para o que está fazendo pra ir procurar.
>
> Eu fiz um sistema onde o cliente vê sozinho em que etapa está o aparelho. Sem baixar app e sem criar senha: ele entra com o CPF e os 4 últimos dígitos do telefone dele.
>
> Reparei nisso porque quem precisa acompanhar é justamente quem está sem celular — então não adianta mandar SMS nem pedir pra instalar nada.

Essa última frase é a que costuma virar a conversa. Ela mostra que você entendeu
a rotina dele antes de tentar vender.

### A segunda dor, que dói mais

> Te faço outra: já teve cliente dizendo na entrega que não tinha autorizado o serviço?
>
> No sistema o orçamento vai item a item — peça, serviço, valor de cada um. Ele aprova ou recusa na tela, e fica gravado com data e hora. Enquanto ele não aprovar, a OS não anda.
>
> Se recusar, você para na hora e não gasta bancada de graça.

### A oferta

> Funciona assim: eu monto o sistema com as OS que vocês já têm — me manda foto do caderno ou a planilha e eu devolvo pronto.
>
> Depois eu fico disponível pra resolver o que aparecer: computador, impressora, internet, e ajuste no próprio sistema quando precisarem de algo diferente.
>
> O sistema está incluso. Você paga pelo suporte.

### Objeções

**"Já uso um sistema."**
> Qual? Pergunto porque a maioria não deixa o cliente acompanhar sem app e não registra a aprovação do orçamento — é aí que dá briga no balcão. Se o de vocês faz isso, é melhor que o meu e eu falo sério.

**"Quanto custa?"**
> [valor] por mês. Antes de achar caro ou barato: quanto vale a hora que alguém aí gasta procurando OS no caderno e explicando status no telefone?

**"Vou pensar."**
> Tranquilo. Te mando o link de como fica pro seu cliente? São 30 segundos pra ver, e aí você pensa com a coisa na mão.

**"Não tenho tempo pra aprender sistema."**
> Por isso quem cadastra sou eu. Você recebe pronto, com as suas OS dentro. Se travar em algo, me chama — é literalmente o que está pagando.

**"E se o cliente não souber mexer?"**
> Não tem o que aprender. Ele digita o CPF e os 4 últimos números do telefone dele. É a mesma coisa que rastrear uma encomenda.

---

## 2. Landing page

### Hero — opções

O atual, `Da bancada à entrega, num sistema só.`, é sobre você. Estas são sobre o
cliente dele, que é quem gera indicação:

| Opção | Observação |
|---|---|
| **Ele acompanha. E aprova.** | A mais curta e a que mais te separa do concorrente |
| **O conserto inteiro, do lado de fora do balcão.** | Mantém o tom descritivo do atual |
| **Da bancada à entrega, e o cliente vendo tudo.** | Evolução do atual, menor risco |

Linha de apoio, para qualquer uma:

> Seu cliente vê a etapa do aparelho e autoriza o serviço sem baixar nada. Você para de atender ligação de status e de discutir preço na entrega.

### Seção do acompanhamento

**Título**
> Ninguém entrega o aparelho no escuro.

**Apoio**
> Ele entra com o CPF e os 4 últimos dígitos do telefone. De qualquer computador, a qualquer hora, sem app e sem senha.

**Os três cartões**

**Fecha quem chegou com medo**
Deixar o celular com um desconhecido assusta. Vire a tela no balcão e mostre o acompanhamento que ele vai ter.

**Acaba o "já ficou pronto?"**
Ele ligou do telefone da mãe e não sabe o número da OS. No portal, ele mesmo vê a etapa.

**Sem app, porque ele está sem celular**
Quem precisa acompanhar é justamente quem deixou o aparelho com você. Nada de SMS, nada de instalar, nada de senha para lembrar.

### Seção do orçamento — merece existir sozinha

Hoje é um cartão dividindo espaço com outros dois. É argumento grande demais para
isso, e é o que mais protege o dinheiro da loja.

**Título**
> O "não autorizei" morre na hora que ele toca em aprovar.

**Apoio**
> O orçamento vai item a item: peça, serviço, valor de cada um. Ele aprova ou recusa na tela, e a resposta fica registrada com data e hora.

**Três pontos**

- **A OS não anda sem o aceite dele.** O serviço só começa depois da aprovação — isso está escrito na tela que ele vê.
- **Aprovou, está gravado.** Data e hora. Sem procurar áudio de três meses atrás.
- **Recusou? Também serve.** Você para na hora, devolve o aparelho e não gastou bancada de graça.

Frase de fecho da seção:

> Ele ainda pode perguntar antes de decidir: a conversa fica dentro da própria OS, não perdida no WhatsApp da loja.

### CTA

O botão hoje diz "Começar os 14 dias" — oferta de SaaS self-service. No seu modelo
não existe trial: existe você.

**Selos**
> ✓ Eu monto com as suas OS · ✓ Suporte incluso · ✓ Sem fidelidade

**Título**
> Tire a sua assistência do caderninho

**Apoio**
> Me manda foto do caderno ou a planilha. Devolvo o sistema montado, com o seu histórico dentro — e fico disponível pro que aparecer.

**Botão**
> Falar no WhatsApp

**Microcopy**
> Respondo hoje. Sem compromisso e sem apresentação de slides.

---

## 3. Frases soltas

Story, bio, assinatura, cartão:

- Seu cliente acompanha o conserto e aprova o orçamento antes de você comprar a peça.
- Sem app, sem senha, sem SMS — porque quem precisa acompanhar está sem celular.
- A assistência que mostra o processo é a que o cliente indica.
- Orçamento aprovado no sistema tem data e hora. Áudio de WhatsApp não tem.
- Enquanto ele não aprovar, a OS não anda. Nem a discussão.

---

## 4. O que sustenta cada promessa

Para você conferir se algum texto exagerou:

| Promessa | Onde está |
|---|---|
| Acompanhar sem login, sem app | Rota pública `/os/[codigo]`; entrada por CPF ou código + 4 dígitos do telefone |
| Etapas do conserto | `os_status`: recebido, diagnóstico, orçamento enviado, aprovado, recusado, aguardando peça, em reparo, pronto, entregue |
| Orçamento item a item | Tabela `os_item` (descrição, quantidade, valor unitário) somando em `os.valor_orcado` |
| Aprovar ou recusar na tela | `decidirOrcamento` em `app/os/[codigo]/actions.ts` |
| "O serviço só começa depois que você aprovar" | Texto literal da tela do cliente |
| Registro com data e hora | Colunas `orcamento_enviado_em`, `aprovado_em`, `recusado_em` |
| Histórico do que aconteceu | Tabela `os_evento`, uma linha por mudança de status |
| Conversa dentro da OS | Tabela `mensagem`, com autor loja / cliente / sistema |
| Comprovante para entregar | `/comprovante/[id]`, com impressão |
| Garantia | `garantia_ate`, preenchida por gatilho quando a OS vira "entregue" |
| Cada loja isolada | RLS do Postgres por `loja_id` |

**Duas coisas que os textos NÃO afirmam, de propósito:**

O aviso ao cliente quando a etapa muda **não é automático** — o painel tem botão
"Avisar no WhatsApp" e cobra você quando a resposta demora ("aguardando resposta
do cliente há X dias"), mas quem dispara é a pessoa. Nenhum texto aqui promete
aviso automático. Se você automatizar depois, aí entra a frase.

E nada de "as lojas que eu atendo" ou número de clientes enquanto não houver. É a
mesma armadilha da faixa de logos falsos que tiramos do site — em mercado local, a
primeira loja que descobrir conta para as outras.

---

## 5. O que medir

Taxa de resposta abaixo de 10% significa que o problema é a **abertura**, não a
oferta — troque a primeira mensagem antes de mexer em preço. A planilha de
prospecção calcula isso e já exclui "número errado" do denominador, justamente
para o número refletir o roteiro e não a qualidade da lista.
