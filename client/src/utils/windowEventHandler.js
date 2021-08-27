export const inputEvent = () => {
  window.addEventListener('click', (e) => {
    const loginInput = document.querySelector('.LoginInput');

    if (loginInput == null) return;

    if (loginInput.contains(e.target)) {
      loginInput.children[1].type = 'email';
      loginInput.style.border = '2px solid #1da1f2';
      loginInput.children[0].style.fontSize = '12px';
      loginInput.children[0].style.color = '#1da1f2';
      loginInput.children[1].focus();
    } else {
      if (loginInput.children[1].value !== '') {
        loginInput.children[0].style.color = '#898b8e';
        loginInput.style.border = '1px solid #c4cfd6';
        return;
      } else {
        loginInput.children[0].style.fontSize = 'unset';
        loginInput.children[0].style.color = '#898b8e';
        loginInput.children[1].type = 'hidden';
        loginInput.style.border = '1px solid #c4cfd6';
      }
    }
  });
};

export const passwordEvent = () => {
  window.addEventListener('click', (e) => {
    const passInput = document.querySelector('.PasswordInput');

    if (passInput == null) return;

    if (passInput.contains(e.target)) {
      if (passInput.children.length === 0) return;

      passInput.children[0].style.color = '#1da1f2';
      passInput.children[0].style.fontSize = '12px';
      passInput.children[1].type = 'password';
      passInput.style.border = '2px solid #1da1f2';
      passInput.children[1].focus();
    } else {
      if (passInput.children.length === 0) return;

      if (passInput.children[1].value !== '') {
        passInput.children[0].style.color = '#898b8e';
        passInput.style.border = '1px solid #c4cfd6';
        return;
      } else {
        passInput.children[0].style.fontSize = 'unset';
        passInput.children[0].style.color = '#898b8e';
        passInput.children[1].type = 'hidden';
        passInput.style.border = '1px solid #c4cfd6';
      }
    }
  });
};
