# Revisão de design · Aline Lopes

## 12/11/2026 (noite) — versão "o celular é o site"

Pedido do João: "em celular precisa mt chamar atenção, pq a maioria vai abrir no celular".
O herói do celular virou capa: foto cheia no topo derretendo numa faixa lisa no rosé da identidade
(#6E4340), nome gigante em branco, CRM, botão branco grande e credenciais em pílulas de vidro.

Revisão por subagente revisor (padrão do REGRAS.md + CFM 2.336/2023), nas capturas 390x844 e 1440x900:

- Correção aplicada: a foto é um retrato fechado e, no primeiro corte, o nome caía sobre o rosto e o
  botão ficava fora da tela em 375x667 (y=718). O enquadramento foi ajustado (`object-position`) para o
  rosto ficar inteiro acima da faixa e o herói encurtou; a 375x667 o botão agora termina em y=639.
- Correção aplicada: o bloco bege chapado que existe no rodapé do arquivo `retrato.jpg` aparecia como
  faixa clara antes da faixa colorida. O corte do celular passou a terminar antes dele.
- Correção aplicada: em telefone baixo (menos de 720 px de altura) a frase de apresentação e o link
  secundário saem da capa, para o botão caber na primeira tela.
- Correção aplicada: a pílula da especialidade estava em 9,9 px; subiu para 11,5 px.
- Sugestão aceita: o herói entrou como `data-no-wa`, então o botão verde flutuante não cobre mais o
  cartão de credenciais na primeira tela.
- Sugestão não aplicada (fora desta prévia): o `jm-recado` do modelo compartilhado continua focável
  quando está fechado; é da camada comum do Doutor, não desta página.

Resultado: nome, especialidade, CRM e botão na primeira tela em 375x667, 360x740, 390x844 e 430x844;
sem rolagem lateral em 320, 360, 375, 390, 412 e 430; desktop intacto.
