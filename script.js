(() => {
  const form = document.getElementById('loginForm');
  const toggle = document.getElementById('togglePassword');
  const password = document.getElementById('password');

  if (toggle && password) {
    toggle.addEventListener('click', () => {
      const showing = password.type === 'text';
      password.type = showing ? 'password' : 'text';
      toggle.textContent = showing ? 'Show' : 'Hide';
    });
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value.trim();
      const passwordValue = document.getElementById('password').value;
      const error = document.getElementById('loginError');

      if (username === 'graceglbrt' && passwordValue === 'Ethan12026!') {
        error.textContent = '';
        sessionStorage.setItem('meridianSignInTime', new Date().toISOString());
        window.location.href = 'dashboard.html';
      } else {
        error.textContent = 'We do not recognize that username or password. Please try again.';
      }
    });
  }

  const lastSignOn = document.getElementById('lastSignOn');
  if (lastSignOn) {
    const savedTime = sessionStorage.getItem('meridianSignInTime');
    const signInDate = savedTime ? new Date(savedTime) : new Date();

    const dateText = new Intl.DateTimeFormat(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(signInDate);

    const timeText = new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit'
    }).format(signInDate);

    lastSignOn.textContent = `Last Sign In: ${dateText} • ${timeText}`;
  }

  const transferTabs = document.querySelectorAll('.transfer-tab');
  const transferPanel = document.getElementById('transferPanel');
  const payPanel = document.getElementById('payPanel');

  function activateTransferTab(tabName) {
    if (!transferPanel || !payPanel) return;
    const isPay = tabName === 'pay';
    transferPanel.classList.toggle('active', !isPay);
    payPanel.classList.toggle('active', isPay);
    transferTabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.tab === tabName));
  }

  if (transferTabs.length) {
    transferTabs.forEach((tab) => {
      tab.addEventListener('click', () => activateTransferTab(tab.dataset.tab));
    });
    const params = new URLSearchParams(window.location.search);
    activateTransferTab(params.get('tab') === 'pay' ? 'pay' : 'transfer');
  }

  const continueTransfer = document.getElementById('continueTransfer');
  const transferRestriction = document.getElementById('transferRestriction');
  if (continueTransfer && transferRestriction) {
    continueTransfer.addEventListener('click', () => {
      transferRestriction.textContent = 'This account is currently restricted and cannot transfer funds out. Please contact Meridian Federal Customer Service for assistance.';
      transferRestriction.classList.add('show');
    });
  }

  const continuePayment = document.getElementById('continuePayment');
  const paymentRestriction = document.getElementById('paymentRestriction');
  if (continuePayment && paymentRestriction) {
    continuePayment.addEventListener('click', () => {
      paymentRestriction.textContent = 'This account is currently restricted and cannot send payments. Please contact Meridian Federal Customer Service for assistance.';
      paymentRestriction.classList.add('show');
    });
  }

})();
