# Revisão independente — lote de CSS unificado

Data: 17/11/2026. Escopo: revisão local dos 21 PNGs de endereço, sete capas móveis de 390 px e registros de publicação fornecidos. Nenhuma página foi alterada, publicada ou contatada nesta revisão.

## Parecer

Aprovado para os blocos de endereço mostrados nas capturas. Nas sete páginas e nas três larguras, o pino está proporcional, o cartão conserva borda, fundo, tipografia e botão, e o texto cabe na coluna. Não encontrei pino gigante, endereço cortado horizontalmente ou bloco de endereço sem estilo.

| Página | 390 px | 768 px | 1440 px |
|---|---|---|---|
| lais-maia | Sem defeito observado | Sem defeito observado | Sem defeito observado |
| silvania-brunelly | Sem defeito observado | Sem defeito observado | Sem defeito observado |
| vanessa-pontes | Sem defeito observado | Sem defeito observado | Sem defeito observado |
| andreza-berlink | Sem defeito observado | Sem defeito observado | Sem defeito observado |
| marcia-sampaio | Sem defeito observado | Sem defeito observado | Sem defeito observado |
| leo-santos | Sem defeito observado | Sem defeito observado | Sem defeito observado |
| manauara-estetica | Sem defeito observado | Sem defeito observado | Sem defeito observado |

As capturas mantêm fundo claro, cartões claros, linhas suaves e cores distintas entre os profissionais. Isso é compatível com a direção visual do REGRAS.md. A origem das paletas não foi reauditada.

O arquivo curl-verificacao.json registra, para as sete páginas, HTML 200 e CSS 200, `site.css?v=d558291e46`, SHA-256 `72b8a4fb283142573cc5e946b5041f682278772a9e192a96ebd904bf25df551d`, presença de `.ico` e `.mapcard`, e ausência de iframe. Conferi a consistência desses registros; não executei uma segunda consulta independente ao servidor.

## Complemento: capas móveis e páginas internas

Revisei as sete imagens `*-390-capa.png`. As cinco médicas preservam foto como primeiro bloco visual abaixo do cabeçalho, nome, registro e botão de contato dentro da captura de 390 × 844 px. Fontes, cores e fotografia aparecem estilizadas. As duas empresas conservam suas capas próprias e seus botões, sem perda de CSS visível. As capas das empresas têm fundo escuro já existente; este parecer não aprova uma nova direção criativa nem o redesenho desse modelo.

O registro `paginas-internas.json` contém 43 URLs, todas com HTTP 200, versão CSS `d558291e46` e nenhum iframe. Conferi o arquivo, sem repetir a consulta ao servidor. O implementador também relatou inspeção da página inteira pelo DOM nas 21 combinações de largura/página e comparação do CSS aplicado: nenhum texto visível fora do viewport, pinos de 26 px, seções “Na consulta” em grade e estilos preservados. Esses dados complementam as capturas; não são uma revisão visual independente de cada seção.

Nas capas há duas observações preexistentes: na Vanessa a pílula flutuante “Prévia feita para você” cobre parte esquerda do botão de contato; os avisos pequenos de registro têm contraste visual baixo sobre os fundos coloridos (sem medição numérica WCAG nesta revisão). Nenhuma demonstra a volta do pino gigante ou perda de estilo.

## Observações e limites

- As 21 imagens de endereço são recortes, não capturas completas das páginas. As sete capas móveis foram revisadas separadamente. Esta revisão não certifica visualmente todas as demais seções, todas as páginas internas ou o site inteiro.
- Em algumas capturas de 768 e 1440 px aparece o recado flutuante do João, cobrindo parte da área inferior esquerda. Ele não é o defeito do pino nem demonstra perda de CSS; ainda assim impede a inspeção visual do trecho coberto. Convém fechar o recado para capturas completas de aceite.
- Os títulos parcialmente acima do limite superior em algumas capturas decorrem da posição de rolagem. O cartão de endereço permanece inteiro e legível.
- Quebras de linha em CEP e nome longo, como na Manauara em 390 px, permanecem dentro do cartão; não há extrapolação horizontal visível.
- Não foram reauditados dados médicos, CRM/RQE, factualidade dos horários, links externos, mensagens comerciais ou compatibilidade em outros navegadores. Não há preço, promessa de resultado ou antes e depois nos recortes revisados.

A correção do pino e a integridade visual dos blocos capturados estão aprovadas. O aceite técnico mais amplo utiliza também a inspeção de layout do DOM e a verificação de 43 URLs feitas pelo implementador; não deve ser descrito como revisão visual completa de todo o conteúdo. As medições DOM relatadas não foram repetidas por este revisor.
