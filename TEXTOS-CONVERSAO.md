# Textos de conversão — FixCell

Foco nas duas dores que mais fecham venda em assistência técnica:
**o cliente acompanhar o conserto** e **o cliente aprovar o orçamento**.

---

## Antes de usar: o que existe e o que ainda não

Li o GES e a landing page. O que encontrei:

| O que a página promete | Situação real no código |
|---|---|
| Cliente acompanha o conserto por link | **Não existe.** Toda rota do `atendimentos` exige `ensureAuth`. Não há página pública, token de acesso nem portal do cliente. |
| Cliente aprova o orçamento, com data e hora | **Não existe.** A palavra "orçamento" aparece em um único arquivo do computador inteiro: o `index.html` da landing. Zero linhas de código. |
| Pipeline de etapas do conserto | **Existe, parcialmente.** O `atendimentos` tem fluxo de status, SLA, NPS e aviso de inatividade — mas para o RMA das máquinas da própria GShield, B2B, não para assistência de terceiros. |
| Aviso ao cliente | **Existe, em outro formato.** Notificação por WhatsApp via ChatGuru, com protocolo. É empurrado para o cliente, não é ele que consulta. |

Nada disso impede a venda — mas muda o tempo do verbo. Os textos abaixo estão
escritos para o modelo que você escolheu: você não vende um SaaS pronto, vende
**a sua disponibilidade com o sistema incluso**. Quem monta é você, e isso é dito.

**A regra que não vale a pena quebrar:** não escreva "já uso", "as lojas que
atendo" nem número de clientes enquanto não houver. É a mesma armadilha da faixa
de logos falsos que tiramos do site. A primeira loja que descobrir vai embora e
conta para as outras — em mercado local isso é fatal.

**O que precisa existir antes do primeiro cliente usar:**

1. Página pública de acompanhamento, acessada por token no link (sem login, sem app)
2. Orçamento com aprovação registrando data, hora e IP
3. Disparo do link por WhatsApp quando a etapa muda

O 3 você já tem meio caminho andado com o ChatGuru.

---

## 1. WhatsApp — a sequência

### Abertura

> Bom dia! Meu nome é Eduardo, trabalho com TI aqui em [cidade].
>
> Uma pergunta meio aleatória: quantas vezes por dia ligam aí só pra perguntar se o aparelho já ficou pronto?

Ele sabe a resposta, ela irrita, e é um custo que já foi normalizado. Responder é
o mesmo que perceber o problema. O "meio aleatória" dá licença para responder sem
sentir que entrou num funil.

### Se ele responder com número ou reclamação

> Pois é. E o pior nem é a ligação — é que quem liga quase nunca sabe o número da OS, então alguém aí para o que está fazendo pra ir procurar.
>
> Eu resolvo isso com um link. O cliente vê sozinho em que etapa está o aparelho dele, a qualquer hora, sem baixar app e sem fazer cadastro. Do mesmo jeito que ele acompanha uma encomenda.

### A segunda dor, que costuma doer mais

> Te faço outra: já aconteceu de cliente dizer na entrega que não tinha autorizado o serviço?
>
> No sistema o orçamento vai pelo mesmo link e ele aprova ali. Fica gravado data e hora. Se der discussão na hora de entregar, está escrito — e quem confirmou foi ele.

### A oferta

> Funciona assim: eu monto o sistema com as OS que vocês já têm — me manda foto do caderno ou a planilha e eu devolvo pronto.
>
> Depois disso eu fico disponível pra resolver o que aparecer: computador, impressora, internet, e ajuste no próprio sistema quando vocês precisarem de algo diferente.
>
> O sistema está incluso. Você paga pelo suporte.

### Objeções

**"Já uso um sistema."**
> Qual? Pergunto porque a maioria não manda link pro cliente acompanhar nem registra a aprovação do orçamento — e é aí que dá briga no balcão. Se o de vocês faz, é melhor que o meu e eu falo sério.

**"Quanto custa?"**
> [valor] por mês. Antes de achar caro ou barato: quanto vale a hora que alguém aí gasta procurando OS e explicando status no telefone?

**"Vou pensar."**
> Tranquilo. Posso te mandar o link de como fica pro seu cliente? São 30 segundos pra ver, e aí você pensa com a coisa na mão.

**"Não tenho tempo pra aprender sistema."**
> É por isso que quem cadastra sou eu. Você recebe pronto, com as suas OS dentro. Se travar em alguma coisa, me chama e eu resolvo — é literalmente o que você está pagando.

---

## 2. Landing page

### Hero — opções

O atual é `Da bancada à entrega, num sistema só.` Funciona, mas é sobre você.
Estas são sobre o cliente dele, que é quem gera a indicação:

| Opção | Quando usar |
|---|---|
| **Ele acompanha. E aprova.** | A mais curta e a que mais separa você dos concorrentes |
| **O conserto inteiro, do lado de fora do balcão.** | Se quiser manter o tom mais descritivo |
| **Da bancada à entrega, e o cliente vendo tudo.** | Evolução do atual, menor risco |

Linha de apoio, para qualquer uma delas:

> Seu cliente vê a etapa do aparelho e autoriza o serviço pelo celular. Você para de atender ligação de status e de discutir preço na entrega.

### Seção do acompanhamento

**Título**
> Ninguém entrega o aparelho no escuro.

**Apoio**
> Um link, do mesmo jeito que ele acompanha uma encomenda. Sem app, sem cadastro, sem depender de alguém lembrar de avisar.

**Os três cartões**

**Fecha quem chegou com medo**
Deixar o celular com um desconhecido assusta. Vire a tela no balcão e mostre o link que ele vai acompanhar.

**Acaba o "já ficou pronto?"**
Ele ligou do telefone da mãe e não sabe o número da OS. Com o link, ele mesmo vê a etapa.

**Acaba o "eu não autorizei isso"**
O cliente aprova o orçamento pelo link, com data e hora. Se der discussão na entrega, quem confirmou foi ele.

### Seção do orçamento — vale existir sozinha

Hoje o orçamento é um cartão dentro da seção do acompanhamento. É argumento
grande demais para ficar dividindo espaço.

**Título**
> O "não autorizei" morre na hora que ele toca em aprovar.

**Apoio**
> Você manda o orçamento pelo link. Ele lê a peça, o valor e o prazo, e aprova com o dedo. Data e hora ficam registradas.

**Três pontos curtos**

- **Ele vê antes de você comprar a peça.** Nada de encomendar display e o cliente sumir.
- **Aprovou, está escrito.** Sem áudio de WhatsApp de três meses atrás para procurar.
- **Recusou? Também vale.** Você para o serviço na hora e não gasta bancada de graça.

### CTA — ajustar ao modelo real

O botão hoje diz "Começar os 14 dias", que é oferta de SaaS self-service. No seu
modelo não existe trial: existe você. Troque por:

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

## 3. Frases soltas, para reaproveitar

Para story, bio, assinatura de e-mail, cartão:

- Seu cliente acompanha o conserto pelo celular. E aprova o orçamento antes de você comprar a peça.
- A assistência que mostra o processo é a que o cliente indica.
- O aparelho é dele. A ansiedade também. Devolve as duas.
- Sem app, sem cadastro, sem "já ficou pronto?".
- Orçamento aprovado por link tem data e hora. Áudio de WhatsApp não tem.

---

## 4. O que medir

Se a taxa de resposta no WhatsApp ficar abaixo de 10%, o problema é a abertura,
não a oferta — troque a primeira mensagem antes de mexer em preço. A planilha de
prospecção já calcula isso, e já exclui "número errado" do denominador
justamente para o número refletir o roteiro, e não a qualidade da lista.
