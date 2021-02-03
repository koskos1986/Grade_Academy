(() => {
  const navToggle = {
    NOJS: `header__container--nojs`,
    OPEN: `header__container--open`
  };
  const header = document.querySelector(`.js-header`);
  const menu = header.querySelector(`.js-menu`);
  const openButton = header.querySelector(`.js-button-open`);
  const closeButton = header.querySelector(`.js-button-close`);

  const onHeaderToggleClick = (evt) => {
    if (evt.target === openButton) {
      menu.classList.add(navToggle.OPEN);
    }
    if (evt.target === closeButton) {
      menu.classList.remove(navToggle.OPEN);
    }
  };

  menu.classList.remove(navToggle.NOJS);
  openButton.style.display = `block`;

  header.addEventListener(`click`, onHeaderToggleClick);
})();
