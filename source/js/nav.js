(() => {
  const pageClass = {
    NOJS: `header__container--nojs`,
    OPEN: `header__container--open`
  };
  const header = document.querySelector(`.js-header`);
  const menu = header.querySelector(`.js-menu`);
  const openBtn = header.querySelector(`.js-button-open`);
  const closeBtn = header.querySelector(`.js-button-close`);

  const onHeaderToggleClick = (evt) => {
    if (evt.target === openBtn) {
      menu.classList.add(pageClass.OPEN);
    }
    if (evt.target === closeBtn) {
      menu.classList.remove(pageClass.OPEN);
    }
  };

  menu.classList.remove(pageClass.NOJS);
  openBtn.style.display = `block`;

  header.addEventListener(`click`, onHeaderToggleClick);
})();
