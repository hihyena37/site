const langIcon = document.querySelector('.header_icon .lang .imgbox');
const langSelect = document.querySelector('.header_icon .lang select');

function openLangOptions() {
    if (!langSelect) return;

    langSelect.focus();

    if (typeof langSelect.showPicker === 'function') {
        langSelect.showPicker();
    }
}

if (langIcon && langSelect) {
    langIcon.addEventListener('click', openLangOptions);
    langIcon.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openLangOptions();
        }
    });
}

const productTabs = [...document.querySelectorAll('.product_tab p')];
const productCards = [...document.querySelectorAll('.product .item_box .card')];

function filterProducts(brand) {
    productTabs.forEach((tab) => {
        const isActive = tab.dataset.brand === brand;
        tab.classList.toggle('active', isActive);

        if (isActive) {
            tab.setAttribute('aria-pressed', 'true');
        } else {
            tab.setAttribute('aria-pressed', 'false');
        }
    });

    productCards.forEach((card) => {
        const shouldShow = brand === 'all' || card.dataset.brand === brand;
        card.classList.toggle('filter-hidden', !shouldShow);
    });
}

productTabs.forEach((tab) => {
    const selectTab = () => filterProducts(tab.dataset.brand);

    tab.addEventListener('click', selectTab);
    tab.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            selectTab();
        }
    });
});
