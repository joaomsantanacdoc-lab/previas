/* Pedido local: só dia e hora; sem fetch, storage, envio ou dados de saúde. */
(() => {
  document.querySelectorAll('.dp-preferencia').forEach((form) => {
    const dia = form.elements.namedItem('dia');
    const hora = form.elements.namedItem('hora');
    const link = form.querySelector('.dp-request-link');
    const feedback = form.querySelector('.dp-feedback');
    const hoje = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bahia', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    dia.min = hoje;
    const update = () => {
      const valid = Boolean(dia.value && hora.value && dia.validity.valid && hora.validity.valid);
      link.setAttribute('aria-disabled', String(!valid));
      link.tabIndex = valid ? 0 : -1;
      if (!valid) {
        link.removeAttribute('href');
        feedback.textContent = 'Escolha o dia e a hora para preparar a mensagem.';
        return;
      }
      const [ano, mes, d] = dia.value.split('-');
      const data = `${d}/${mes}/${ano}`;
      const texto = `Olá, equipe Dr. Pet Teresina! Gostaria de verificar a possibilidade de atendimento em ${data} às ${hora.value}. É apenas minha preferência de dia e horário; aguardo a confirmação manual da recepção.`;
      link.href = 'https://wa.me/5586999255777?text=' + encodeURIComponent(texto);
      feedback.textContent = `Preferência: ${data}, às ${hora.value}. Ainda não é uma reserva.`;
    };
    form.addEventListener('input', update);
    form.addEventListener('change', update);
    // O evento reset precede a ação nativa; limpar aqui evita href antigo.
    form.addEventListener('reset', (event) => {
      event.preventDefault();
      dia.value = '';
      hora.value = '';
      update();
    });
    form.addEventListener('submit', (event) => event.preventDefault());
    link.addEventListener('click', (event) => {
      if (link.getAttribute('aria-disabled') === 'true') event.preventDefault();
    });
    update();
  });
})();
