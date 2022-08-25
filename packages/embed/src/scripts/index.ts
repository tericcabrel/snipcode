const getId = (name: string) => {
  const id = document.body.getAttribute('data-id');

  return document.getElementById(`${name}-${id}`);
};

const show = (element: HTMLElement) => {
  element.classList.replace('hidden', 'show');
};

const hide = (element: HTMLElement) => {
  element.classList.replace('show', 'hidden');
};

const init = () => {
  const rawContent = getId('raw-code')?.textContent;

  const container = getId('code');
  const btnCopy = getId('btn-copy');
  const iconCopy = getId('ic-copy');
  const iconCopied = getId('ic-copied');

  if (!container || !btnCopy) {
    return;
  }

  container.addEventListener(
    'mouseenter',
    () => {
      show(btnCopy);
    },
    false,
  );

  container.addEventListener(
    'mouseleave',
    () => {
      hide(btnCopy);
    },
    false,
  );

  btnCopy.addEventListener(
    'click',
    async () => {
      if (navigator?.clipboard && rawContent) {
        try {
          await navigator.clipboard.writeText(rawContent);
        } catch (error) {
          console.warn('Copy failed:', error);
        }
      }

      if (!iconCopy || !iconCopied) {
        return;
      }

      hide(iconCopy);
      show(iconCopied);

      setTimeout(() => {
        hide(iconCopied);
        show(iconCopy);
      }, 3000);
    },
    false,
  );
};

init();
