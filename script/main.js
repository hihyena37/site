const langIcon = document.querySelector('.header_icon .lang .imgbox');
const langSelect = document.querySelector('.header_icon .lang select');

function openLangOptions() {
    langSelect.focus();

    if (typeof langSelect.showPicker === 'function') {
        langSelect.showPicker();
    }
}

langIcon.addEventListener('click', openLangOptions);
langIcon.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLangOptions();
    }
});
