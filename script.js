(() => {
  const root = document.documentElement;
  const body = document.body;
  const status = document.getElementById('reading-status');
  const smaller = document.getElementById('font-smaller');
  const larger = document.getElementById('font-larger');
  const spacing = document.getElementById('spacing-toggle');
  const bionic = document.getElementById('bionic-toggle');
  const reset = document.getElementById('reset-reading');
  let size = 16;
  const announce = (message) => { if (status) status.textContent = message; };

  function applySize() {
    root.style.setProperty('--body-size', `${size}px`);
  }
  if (smaller) smaller.addEventListener('click', () => {
    size = Math.max(14, size - 1); applySize();
    announce(`Paragraph text size ${size} pixels.`);
  });
  if (larger) larger.addEventListener('click', () => {
    size = Math.min(22, size + 1); applySize();
    announce(`Paragraph text size ${size} pixels.`);
  });
  if (spacing) spacing.addEventListener('click', () => {
    const enabled = body.classList.toggle('more-spacing');
    spacing.setAttribute('aria-pressed', String(enabled));
    spacing.textContent = enabled ? 'Standard spacing' : 'More line spacing';
    announce(enabled ? 'More line and paragraph spacing enabled.' : 'Standard line and paragraph spacing restored.');
  });
  function makeBionic() {
    document.querySelectorAll('main p').forEach((p) => {
      if (p.dataset.originalText) return;
      p.dataset.originalText = p.textContent;
      const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach((node) => {
        const fragment = document.createDocumentFragment();
        const parts = node.textContent.split(/(\s+)/);
        parts.forEach((part) => {
          if (!part || /^\s+$/.test(part)) { fragment.appendChild(document.createTextNode(part)); return; }
          const word = document.createElement('span');
          word.className = 'bionic-word';
          const n = Math.max(1, Math.ceil(part.length * 0.45));
          const strong = document.createElement('strong');
          strong.textContent = part.slice(0, n);
          word.append(strong, document.createTextNode(part.slice(n)));
          fragment.appendChild(word);
        });
        node.parentNode.replaceChild(fragment, node);
      });
    });
  }
  function removeBionic() {
    document.querySelectorAll('main p[data-original-text]').forEach((p) => {
      p.textContent = p.dataset.originalText;
      delete p.dataset.originalText;
    });
  }
  if (bionic) bionic.addEventListener('click', () => {
    const enabled = !body.classList.contains('bionic-mode');
    if (enabled) makeBionic(); else removeBionic();
    body.classList.toggle('bionic-mode', enabled);
    bionic.setAttribute('aria-pressed', String(enabled));
    bionic.textContent = `Bionic reading: ${enabled ? 'on' : 'off'}`;
    announce(enabled ? 'Bionic-style emphasis enabled. Screen-reader text remains unchanged.' : 'Bionic-style emphasis disabled.');
  });
  if (reset) reset.addEventListener('click', () => {
    size = 16; applySize();
    body.classList.remove('more-spacing', 'bionic-mode');
    if (spacing) { spacing.setAttribute('aria-pressed', 'false'); spacing.textContent = 'More line spacing'; }
    if (bionic) { bionic.setAttribute('aria-pressed', 'false'); bionic.textContent = 'Bionic reading: off'; }
    removeBionic();
    announce('Reading preferences reset.');
  });

  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const code = document.getElementById(button.dataset.copy);
      if (!code) return;
      const text = code.textContent;
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = 'Copied';
        announce('Code copied to clipboard.');
        window.setTimeout(() => { button.textContent = 'Copy code'; }, 1800);
      } catch {
        announce('Copy unavailable. Select the code and copy it manually.');
      }
    });
  });
})();