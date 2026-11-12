# Revisão de design · aline-lopes (lead 13, lote de teste)

Data: 12/11/2026 · Médico · Designer (OpenBot) · Revisado antes de publicar.

## Ressalva de credencial (importante)
A Dra. Aline publica **apenas CRM 25364** (bio do Instagram), sem RQE em lugar nenhum. O portal do CFM estava fora do ar (cota de reCAPTCHA) e o CREMEB travou, então **nenhum RQE foi confirmado**. Por isso:
- o site **não exibe número de RQE** em nenhuma página;
- o texto fala em "dermatologia clínica e estética", como ela mesma se apresenta, e não usa "especialista em";
- o rodapé diz "Registro: CRM-BA 25364, como a Dra. Aline publica no Instagram";
- **decisão pendente do João**: se preferir, a palavra "Dermatologia" sai do título e da marca até o RQE ser confirmado.

## Direção criativa
- Matéria-prima: Instagram público @dra.alinelopes_ (3.261 seguidores, 764 posts, último 11/11/2026; destaques MD Codes, Ultraformer 3, Tricologia, Preenchimento, Radiesse, Formação, IMCAS Paris), ficha do Google (Empresarial Ônix, Av. Praia de Itapuã, Q19 L7, sala 205, Vilas do Atlântico; (71) 99913-9963; 4,6 com 9 avaliações) e a bio.
- Paleta e tema em `paleta.md`: creme rosado + rosé empoeirado + espresso, anéis concêntricos (pele vista de perto), Outfit + Inter, cantos macios.
- Seções: abertura com credenciais, faixa de dados, portas ("O que você quer cuidar agora?"), a consulta, naturalidade em etapas, nas palavras dela, conteúdos, consultório, perguntas, final. Páginas: acne e melasma, cabelo e couro cabeludo, envelhecimento natural, a consulta, sobre, onde atendo.

## O que a revisão por subagente apontou e o que foi corrigido
1. **[bloqueador] Páginas internas com título e chamada invisíveis.** O herói interno usa fundo escuro (`--x-dark`) e as cores de texto do herói estavam escuras. Corrigido: texto do herói interno em creme, botão "Ler a página" legível.
2. **Foto do herói com o cartão de credenciais em cima da boca.** A foto é um retrato fechado e o cartão cobria metade do rosto. Corrigido: a foto ganhou uma faixa de cor abaixo do retrato e o cartão desceu para essa faixa; o rosto ficou inteiro e limpo.
3. **Avatar mostrando só um olho.** Recorte refeito, rosto centralizado.
4. **Rodapé confessando a pendência do RQE em texto público.** Retirado; a ressalva fica só neste arquivo e no relatório ao João.
5. **Contraste:** `--x-muted` escurecido (#77665F) e o degradê das pílulas ("Etapa 1…5") escurecido para o texto branco passar em AA.
6. **Link do card "Cabelo e couro cabeludo" quebrando em duas linhas.** Rótulo encurtado para "Cabelo e couro".
7. **CRM ausente na marca das páginas internas.** A marca passou a ser "Dermatologia · CRM-BA 25364" em todas as páginas.

## Verificações finais
- Sem preço, sem "grátis", sem superlativo, sem promessa de resultado, sem antes e depois, sem depoimento inventado, sem foto de paciente; `noindex` presente em todas as páginas.
- Primeira tela do celular: nome, especialidade, CRM e botão de WhatsApp.
- Aspas da Dra. Aline: todas são trechos literais dos posts dela (DfVYzF3H4K1, DeuzF_En5WA, DfAxgwpEf-_, DfncTstnx24, De2gSu1n2jV), citados no rodapé como publicações dela.
- Capturas: 1440 e 390, topo e página inteira.

## Resultado
Aprovado com os ajustes acima, aplicados antes de publicar. Publicação só com o OK do João no canal.
