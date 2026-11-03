(() => {
  'use strict';
  const form = document.getElementById('pedido-preferencia');
  if (!form) return;
  const day = form.querySelector('[name="dia"]');
  const time = form.querySelector('[name="hora"]');
  const link = document.getElementById('pref-link');
  const status = document.getElementById('pref-status');
  function update() {
    const valid = /^\d{4}-\d{2}-\d{2}$/.test(day.value) && /^\d{2}:\d{2}$/.test(time.value) && day.validity.valid && time.validity.valid;
    if (!valid) {
      link.removeAttribute('href');
      link.setAttribute('aria-disabled', 'true');
      link.setAttribute('tabindex', '-1');
      status.textContent = 'Preencha as duas preferências para preparar a mensagem.';
      return;
    }
    const [year, month, date] = day.value.split('-');
    const message = `Olá! Gostaria de conversar sobre uma consulta nutricional com Alessandra Bertolino. Minha preferência é ${date}/${month}/${year}, às ${time.value}. Sei que este pedido não reserva horário e que a recepção verifica a disponibilidade e confirma manualmente.`;
    link.href = `https://wa.me/5531992042671?text=${encodeURIComponent(message)}`;
    link.setAttribute('aria-disabled', 'false');
    link.removeAttribute('tabindex');
    status.textContent = `Preferência preparada: ${date}/${month}/${year}, às ${time.value}. A recepção confirma manualmente.`;
  }
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('reset', () => {
    link.removeAttribute('href');
    link.setAttribute('aria-disabled', 'true');
    link.setAttribute('tabindex', '-1');
    status.textContent = 'Preencha as duas preferências para preparar a mensagem.';
    setTimeout(update, 0);
  });
  form.addEventListener('submit', event => event.preventDefault());
  link.addEventListener('click', event => { if (link.getAttribute('aria-disabled') === 'true') event.preventDefault(); });
  update();
})();
