# Revisão de design · Marta Mascarenhas

## 12/11/2026 (noite) — versão "o celular é o site"

Pedido do João: "em celular precisa mt chamar atenção, pq a maioria vai abrir no celular".
O herói do celular virou capa: foto cheia no topo derretendo numa faixa lisa no terracota da identidade
(#8E4429), nome gigante em branco, CRM/RQE, botão branco grande e credenciais em pílulas de vidro.

Revisão por subagente revisor (padrão do REGRAS.md + CFM 2.336/2023), nas capturas 390x844 e 1440x900:

- Correção aplicada: emenda visível entre a foto e a faixa (salto de cor de rgb(142,68,41) para
  rgb(154,84,57)). A faixa virou cor lisa; a foto termina exatamente nessa cor.
- Correção aplicada: o botão verde fixo do WhatsApp cobria a pílula "Laser". O herói entrou como
  `data-no-wa`; o botão flutuante só aparece depois da capa.
- Correção aplicada: a pílula da especialidade estava em 9,9 px; subiu para 11,5 px.
- Correção aplicada: em telefone baixo (menos de 720 px de altura) a frase de apresentação e o link
  secundário saem da capa, para o botão caber na primeira tela (medido a 375x667: botão em y=600).
- Sugestão aceita: `theme-color` passou de #2B1710 para #F6F1EC, a cor real da página.
- Sugestão não aplicada (fora desta prévia): o `jm-recado` do modelo compartilhado continua focável
  quando está fechado; é da camada comum do Doutor, não desta página.

Resultado: nome, especialidade, CRM/RQE e botão na primeira tela em 375x667, 360x740, 390x844 e 430x844;
sem rolagem lateral em 320, 360, 375, 390, 412 e 430; desktop intacto.
