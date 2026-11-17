# Revisão independente — limite e enquadramento das fotos

Data: 17/11/2026. Resultado: **aprovado para o limite e enquadramento das fotos nos 21 estados documentados**. Nenhum impeditivo identificado neste escopo.

## Leitura visual das 21 capturas

Revisei todas as imagens `*-foto*px.png`: sete prévias nas larguras de viewport 390, 768 e 1440 px. Li também `medicoes.json`, `antes.json`, `manifest.json`, `curl-verificacao.json`, `metodo.md` e as regras finais de CSS nas fontes locais.

| Página | 390 px | 768 px | 1440 px |
|---|---|---|---|
| lais-maia | Revisada, enquadramento sem corte por preenchimento | Revisada, enquadramento sem corte por preenchimento | Revisada, foto e credenciais separadas |
| silvania-brunelly | Revisada, enquadramento sem corte por preenchimento | Revisada, enquadramento sem corte por preenchimento | Revisada, foto e credenciais separadas |
| vanessa-pontes | Revisada, enquadramento sem corte por preenchimento | Revisada, enquadramento sem corte por preenchimento | Revisada, foto e credenciais separadas |
| andreza-berlink | Revisada, enquadramento sem corte por preenchimento | Revisada, enquadramento sem corte por preenchimento | Revisada, foto e credenciais separadas |
| marcia-sampaio | Revisada, enquadramento sem corte por preenchimento | Revisada, enquadramento sem corte por preenchimento | Revisada, foto e credenciais separadas |
| leo-santos | Revisada, foto contida | Revisada, foto contida | Revisada, foto contida |
| manauara-estetica | Revisada, foto contida | Revisada, foto contida | Revisada, foto contida |

No desktop, as cinco médicas têm a fotografia acima das credenciais, sem o painel cobrir o retrato. As imagens ficam contidas em suas caixas, com áreas laterais da própria paleta onde a proporção do arquivo exige. Nas empresas, a fotografia também fica contida no quadro. Não vi distorção, rosto cortado para preencher o quadro ou texto escapando horizontalmente nesses heróis.

As máscaras/degradês inferiores das médicas e as legendas das empresas continuam presentes, como parte do desenho existente. “Foto inteira” significa aqui que o arquivo cabe integralmente na caixa por `scale-down`, sem o corte de preenchimento de `cover`; não significa retirar o degradê ou reconstruir partes ausentes do arquivo original. Não há redesenho ou nova direção criativa neste aceite.

## Medidas conferidas

Conferi a consistência dos 21 registros e recalculei a escala pela caixa e pelas dimensões naturais. Todos usam `object-fit:scale-down`, com escala entre aproximadamente 23% e 56%: nenhum amplia o arquivo acima do tamanho natural.

Em 1440 × 900, todos os quadros têm 630 px, equivalentes a 70% da altura da tela. Nas cinco médicas, a caixa da imagem tem 450 px e as credenciais ficam abaixo, com folga registrada de 7,625 px. Nas duas empresas, a caixa da imagem tem 630 px. Os registros anteriores indicavam 748,8125 px nas médicas e 720–724,421875 px nas empresas; os 1555 px citados no diagnóstico inicial não aparecem nessas medidas.

Em 768 px, as caixas de imagem têm 420 px nas médicas e 340 px nas empresas. Em 390 px, têm 371,359375 px nas médicas e aproximadamente 286,95 px nas empresas. As regras mais específicas mantêm `object-position` de 50% 38% no tablet e 50% 8% no celular das médicas; isso não corta o arquivo contido, pois a altura limita a escala. No desktop o enquadramento é centralizado em 50% 50%.

Conferi as dimensões dos PNGs: todos abrangem a altura completa do elemento herói registrado. Os 21 arquivos são byte a byte idênticos às capturas nativas originais indicadas em `source`; não foram unidos ou reescalados. Todos os registros informam diferença geométrica máxima de 0 px entre o enquadramento de captura e o viewport normal, sem estouro horizontal registrado.

Os sete registros HTTP estão consistentes: HTML 200, CSS 200, mesma versão `site.css?v=a2f85ecbf0`, mesmo SHA-256 `55a4910c22de75024d2ddb0ca7c3fbccd53c4f94e65a84240f2017e00a6723d4`. Conferi os arquivos de evidência; não fiz nova requisição ao servidor nesta revisão.

## Limites

O navegador usado pelo implementador é o Chromium do OpenBot. Nas capturas de 390 e 768, a altura de captura foi ampliada a 1200 px, com vh/svh temporariamente fixados aos valores do viewport normal; a geometria foi comparada. A posição das camadas fixas no fundo da tela não deve ser inferida desses recortes. Essas mudanças só existiram na sessão de captura, conforme o método fornecido.

Este parecer cobre fotos, quadros, enquadramento, ausência de ampliação e separação das credenciais nos 21 estados. Não certifica todos os breakpoints, aparelhos, navegadores, primeiras dobras em qualquer altura, demais seções, subpáginas, fluxos de contato ou conformidade médica completa. Os dados de CRM/RQE e a origem factual das fotos/paletas não foram reauditados.

A foto do herói e o SVG de WhatsApp são elementos diferentes. O ícone gigante tratado na rodada anterior não é evidência de fotografia com 1555 px; este aceite verifica a exigência adicional de limitar e conter a fotografia. Não reanalisei o arquivo original do print nesta rodada.

Não alterei publicações nem enviei mensagens. O único arquivo escrito por este revisor nesta rodada é este parecer local.


---

# Histórico: contraste e integridade anterior

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
