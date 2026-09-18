document.getElementById('year').textContent = new Date().getFullYear();

// Copy-to-clipboard for the contact email, replaces mailto: to avoid
// inconsistent mail-app handoff across browsers.
document.addEventListener('DOMContentLoaded', function () {
  var copyBtn = document.querySelector('.copy-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', function () {
    var email = copyBtn.getAttribute('data-email');
    var showCopied = function () {
      var original = copyBtn.textContent;
      copyBtn.textContent = 'Copied';
      copyBtn.classList.add('is-copied');
      setTimeout(function () {
        copyBtn.textContent = original;
        copyBtn.classList.remove('is-copied');
      }, 1600);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(showCopied).catch(function () {
        fallbackCopy(email, showCopied);
      });
    } else {
      fallbackCopy(email, showCopied);
    }
  });

  function fallbackCopy(text, onSuccess) {
    var temp = document.createElement('textarea');
    temp.value = text;
    temp.setAttribute('readonly', '');
    temp.style.position = 'absolute';
    temp.style.left = '-9999px';
    document.body.appendChild(temp);
    temp.select();
    try {
      document.execCommand('copy');
      onSuccess();
    } catch (err) {
      // Copy failed silently; email is still visible as text for manual copy.
    }
    document.body.removeChild(temp);
  }
});
