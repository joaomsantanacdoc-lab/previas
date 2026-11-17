# Revisão independente — contraste e páginas integrais

Data: 17/11/2026. Revisor local da etapa de design. Resultado: **aprovado para a correção solicitada, nos estados e larguras documentados**. Não encontrei impeditivo visual nas 21 imagens integrais.

## Evidências revisadas

Li visualmente as sete páginas do topo ao rodapé em 390, 768 e 1440 px: 21 arquivos `*-inteira.png`. Conferi também `capturas-inteiras.json`, os 38 trechos de `metadata-final.json`, `medicoes-resumo.json`, `curl-verificacao.json`, `vanessa-teste-final.json`, `metodo.md`, o script de montagem e as regras alteradas nos arquivos-fonte locais.

| Página | 390 px | 768 px | 1440 px |
|---|---|---|---|
| lais-maia | Revisada, sem impeditivo | Revisada, sem impeditivo | Revisada, sem impeditivo |
| silvania-brunelly | Revisada, sem impeditivo | Revisada, sem impeditivo | Revisada, sem impeditivo |
| vanessa-pontes | Revisada, sem impeditivo | Revisada, sem impeditivo | Revisada, sem impeditivo |
| andreza-berlink | Revisada, sem impeditivo | Revisada, sem impeditivo | Revisada, sem impeditivo |
| marcia-sampaio | Revisada, sem impeditivo | Revisada, sem impeditivo | Revisada, sem impeditivo |
| leo-santos | Revisada, sem impeditivo | Revisada, sem impeditivo | Revisada, sem impeditivo |
| manauara-estetica | Revisada, sem impeditivo | Revisada, sem impeditivo | Revisada, sem impeditivo |

As capturas mostram capa, faixas de dados, cartões de temas/serviços, apresentação, etapas da consulta quando existentes, prova do Google, endereço, dúvidas, chamada de contato e rodapé com seus estilos. As colunas se reorganizam conforme a largura. Não vi lista crua no lugar dos cartões, pino gigante, ícone ocupando o rodapé, texto extrapolando a coluna ou imagem quebrada. Os trechos de captura se unem sem corte ou duplicação perceptível do conteúdo; o cabeçalho aparece uma vez.

## Contraste e sobreposição

O aviso de registro das cinco médicas agora aparece sobre branco opaco, com texto escuro de 12 px e peso 500. A mudança é visível nas capas de 390 e 768 px e no desktop. As medições fornecidas registram contraste de 13,67:1 para Lais, 13,69:1 para Silvania, 12,25:1 para Vanessa, 14,10:1 para Andreza e 14,22:1 para Márcia. Isso resolve a observação anterior sobre esse aviso específico; não representa auditoria de contraste de todo o site.

Revisei a regra de ocultação da camada do João enquanto a capa móvel está visível. O registro final de Vanessa em 390 × 844, sem estilos de captura, informa CSS `8a638a978e`, pílula invisível depois do temporizador, botão terminando em 826,40625 px e pílula novamente visível após a saída da capa. O PNG separado de Vanessa confirma visualmente aviso legível e botão livre. O botão das empresas tem regra de posição fixa e limite de 56 × 56 px, com SVG de 26 × 26 px; as medições confirmam posição fixa nas três larguras.

## Integridade técnica das evidências

Conferi localmente, com comparação dos pixels dos arquivos PNG, a montagem das 21 imagens a partir dos 38 trechos brutos: todos os trechos usados preservam seus pixels, largura e escala, com cobertura vertical contínua. Alguns arquivos recebem uma linha de um pixel repetida na borda inferior para completar o arredondamento da altura; isso não cria uma lacuna nem remove conteúdo visível.

Os 38 registros de captura usam CSS `8a638a978e` e apresentam `maxGeometryDelta = 0` em relação às posições/dimensões de seção medidas no viewport normal. O método fixa temporariamente vh/svh pela altura normal antes da captura longa, evitando ampliar a capa apenas para fotografar a página. As camadas flutuantes são ocultadas apenas durante a captura integral; seu comportamento não deve ser inferido dessas imagens, mas do teste separado da interface real.

Conferi a consistência das 21 medições de layout: largura de rolagem igual à largura útil, nenhuma extrapolação de texto registrada, nenhuma imagem quebrada, pino de 26 px e WhatsApp fixo. Os registros de curl informam sete respostas HTML 200 e CSS 200, todas com `site.css?v=8a638a978e`, SHA-256 `8397323ee99a8160932042c1c755ad04f80c5ea231439ea8adb66e5aa9baaa26`, regras de ícone/endereço e nenhum iframe. Não repeti as requisições ou o teste interativo do navegador nesta revisão; esses resultados são evidências fornecidas pelo implementador, conferidas contra seus registros.

## Limites do aceite

O aceite cobre a correção de contraste do aviso de registro, a sobreposição da pílula na capa móvel, os ícones e a integridade visual das sete páginas iniciais nos 21 estados capturados. Não certifica todas as subpáginas, todos os fluxos interativos, todos os navegadores, todos os aparelhos, navegação por leitor de tela, todos os contrastes ou a conformidade médica completa. CRM/RQE, avaliações, horários, fontes das paletas e demais dados não foram reauditados.

Foram preservados o conteúdo e a direção existente. Os fundos escuros de seções e das empresas são parte do desenho anterior; esta revisão não autoriza uma nova direção visual nem exige redesenho fora da correção solicitada. Nenhuma página publicada foi modificada por este revisor, nenhuma mensagem foi enviada e nenhum dado foi gravado em serviço externo. O único arquivo escrito nesta revisão é este parecer local.
