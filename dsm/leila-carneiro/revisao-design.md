# Revisão de design · Leila Carneiro (id 18)

## 13/11/2026 — padrão novo (claro/futurista, capa no celular)

Revisão por subagente revisor (REGRAS.md + CFM 2.336/2023), nas capturas 390x844, 1440x900,
páginas Sobre e A consulta, e no HTML/CSS.

Bloqueios que ele achou e eu corrigi:
- **Barra do topo**: a regra global `main,.site,.wrap,header.nav,...{position:relative}` anulava o
  `position:fixed` da barra, abria uma faixa de 77 px no topo e a barra sumia ao rolar. Corrigido na
  camada comum (`futurista.py`): a barra voltou a ficar fixa; o herói já conta com os 76 px.
- **Botão do herói interno**: o degradê escuro do `.btn.x-btn` vencia o fundo claro do herói e deixava
  o rótulo escuro sobre fundo escuro (2,4:1). Corrigido com `!important` em `.x-phero .x-btn`.

Correções aplicadas:
- O botão flutuante tinha o ícone do WhatsApp, mas o link é telefone. Agora usa o ícone de telefone e o
  mesmo rótulo do CTA ("Ligar para o consultório"), no verde de marca.
- O retrato recortado da arte dela cortava a coroa da cabeça; recortei de novo a partir da l1 com a
  cabeça inteira, e o `alt` deixou de dizer "no consultório".
- `theme-color` e menu com a barra fixa conferidos.

Resultado: nome, especialidade, CRM/RQE e botão na primeira tela em 360x740, 390x844 e 430x900;
sem rolagem lateral; páginas internas com a barra fixa e botão legível; desktop conferido.

## Ajuste 13/11 (pedido do João: "ficou feio aq né?")

O cartão de credenciais cobria a boca dela no desktop. Refiz o herói: o retrato virou uma
moldura de 430x520 e o cartão passou a ficar **embaixo** da foto, só encostando na borda
(antes ficava por cima do rosto). Também recortei o retrato um pouco mais acima, para a coroa
da cabeça aparecer inteira.
