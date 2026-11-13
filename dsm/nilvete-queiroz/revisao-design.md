# Revisão de design · Nilvete Queiroz (id 19)

## 13/11/2026 — padrão novo (claro/futurista, capa no celular, sem foto)

Revisão por subagente revisor (REGRAS.md + CFM 2.336/2023), nas capturas 390x844, 1440x900,
páginas Sobre e Adolescência, e no HTML/CSS.

Bloqueios que ele achou e eu corrigi:
- **Barra do topo**: a regra global `main,.site,.wrap,header.nav,...{position:relative}` anulava o
  `position:fixed` da barra, abria uma faixa de 77 px no topo e a barra sumia ao rolar. Corrigido na
  camada comum (`futurista.py`).
- **Botão do herói interno**: rótulo escuro sobre o degradê escuro (2,4:1). Corrigido com `!important`
  em `.x-phero .x-btn`.

Correções aplicadas:
- **Sem foto**: o site vai com o monograma NQ e a curva de crescimento no lugar do retrato. O aviso na
  página Sobre virou texto de site ("a foto entra aqui quando ela enviar um retrato"), não nota interna.
- **Título de hebiatra sem RQE**: tirei "hebiatra" dos rótulos do site (menu, herói, rodapé). Fica
  "Pediatria · crianças e adolescentes" e a página "Adolescência"; a palavra hebiatria só aparece na
  ressalva do rodapé, como área declarada na bio. RQE não informado publicamente.
- **Contato**: o número celular não tem WhatsApp confirmado (a tentativa de 16/10 não foi entregue).
  Os botões agora ligam para o consultório, (71) 3351-4339, e o celular aparece como "celular", não
  como WhatsApp.
- **Citação**: a frase atribuída a ela foi reduzida ao que está na bio ("Mais de 40 anos de amor à
  profissão"); a segunda frase era minha.
- **Painel do monograma**: ganhou margem no desktop (estava encostando na borda) e perdeu a rotação
  de -0,6°, que cortava o canto.
- A linha "Pediatria e Hebiatria · CRM-BA 7041" repetida no pé do painel saiu.

Resultado: nome, especialidade, CRM e botão na primeira tela em 360x740, 390x844 e 430x900;
sem rolagem lateral; páginas internas com a barra fixa e botão legível; desktop conferido.
