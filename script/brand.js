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

function initPagination(section) {
    const itemBoxes = [...section.querySelectorAll('.item_pages > .item_box')];
    const pageNumbers = [...section.querySelectorAll('.page_tab .page_num p')];
    const prevButton = section.querySelector('.page_prev');
    const nextButton = section.querySelector('.page_next');
    const categorySelect = section.querySelector('.category_tab .right');
    const categoryTabs = [...section.querySelectorAll('.category_tab .left p')];
    const oemTabs = [...section.querySelectorAll('.oem_tab .left p')];
    const categoryOptions = categorySelect
        ? [...categorySelect.querySelectorAll('option')]
        : [];
    const originalCards = itemBoxes.flatMap((itemBox) =>
        [...itemBox.querySelectorAll('.card')]
    );
    let currentPage = 1;
    let totalPages = itemBoxes.length;

    function showPage(page) {
        currentPage = Math.min(Math.max(page, 1), totalPages);

        itemBoxes.forEach((itemBox) => {
            const isActive = Number(itemBox.dataset.page) === currentPage;
            itemBox.classList.toggle('active', isActive);
            itemBox.setAttribute('aria-hidden', String(!isActive));
        });

        pageNumbers.forEach((pageNumber) => {
            const isActive = Number(pageNumber.dataset.page) === currentPage;
            pageNumber.classList.toggle('active', isActive);

            if (isActive) {
                pageNumber.setAttribute('aria-current', 'page');
            } else {
                pageNumber.removeAttribute('aria-current');
            }
        });

    }

    pageNumbers.forEach((pageNumber) => {
        pageNumber.addEventListener('click', () => {
            showPage(Number(pageNumber.dataset.page));
        });

        pageNumber.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                showPage(Number(pageNumber.dataset.page));
            }
        });
    });

    prevButton.addEventListener('click', () => showPage(currentPage - 1));
    nextButton.addEventListener('click', () => showPage(currentPage + 1));

    function applyCardCount(pages, lastPageCards) {
        totalPages = pages;

        pageNumbers.forEach((pageNumber) => {
            const page = Number(pageNumber.dataset.page);
            pageNumber.classList.toggle('filter-hidden', page > totalPages);
        });

        itemBoxes.forEach((itemBox) => {
            const page = Number(itemBox.dataset.page);
            const cards = [...itemBox.querySelectorAll('.card')];

            cards.forEach((card, index) => {
                const isAfterLastPage = page > pages;
                const isAfterLastCard = page === pages && index >= lastPageCards;
                card.classList.toggle('filter-hidden', isAfterLastPage || isAfterLastCard);
            });
        });

        showPage(1);
    }

    function renderCategoryCards(cards) {
        itemBoxes.forEach((itemBox, pageIndex) => {
            const startIndex = pageIndex * 12;
            const pageCards = cards.slice(startIndex, startIndex + 12);

            itemBox.replaceChildren(...pageCards);
        });

        totalPages = Math.max(1, Math.ceil(cards.length / 12));

        pageNumbers.forEach((pageNumber) => {
            const page = Number(pageNumber.dataset.page);
            pageNumber.classList.toggle('filter-hidden', page > totalPages);
        });

        showPage(1);
    }

    function applyTteokbokkiFilter() {
        const selectedFilter = categorySelect.value;
        const filteredCards = originalCards.filter((card) => {
            const productName = card.querySelector('.text p')?.textContent.trim() || '';
            const isRabokki = productName.includes('라볶이');
            const isHalal = productName.includes('할랄');
            const isFrozen = productName.includes('냉동');

            if (selectedFilter === 'rabokki') return isRabokki;
            if (selectedFilter === 'halal') return isHalal;
            if (selectedFilter === 'frozen') return isFrozen;
            if (selectedFilter === 'tteokbokki') {
                return !isRabokki && !isHalal && !isFrozen;
            }

            return true;
        });

        renderCategoryCards(filteredCards);
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', applyTteokbokkiFilter);

        categoryTabs.forEach((categoryTab) => {
            categoryTab.addEventListener('click', () => {
                categoryTabs.forEach((tab) => tab.classList.remove('active'));
                categoryTab.classList.add('active');

                const categoryCardCounts = {
                    snack: 8,
                    kimchi: 3,
                    ricecake: 3,
                    jeon: 9
                };
                const category = categoryTab.dataset.category;

                if (category !== 'tteokbokki') {
                    categorySelect.value = 'all';
                    categoryOptions.forEach((option) => {
                        option.hidden = option.value !== 'all';
                    });
                    renderCategoryCards(originalCards.slice(0, categoryCardCounts[category]));
                } else {
                    categoryOptions.forEach((option) => {
                        option.hidden = false;
                    });
                    applyTteokbokkiFilter();
                }
            });
        });
    }

    if (oemTabs.length) {
        function renderOemCards(cards) {
            itemBoxes.forEach((itemBox, pageIndex) => {
                const startIndex = pageIndex * 4;
                itemBox.replaceChildren(...cards.slice(startIndex, startIndex + 4));
            });

            totalPages = Math.max(1, Math.ceil(cards.length / 4));

            pageNumbers.forEach((pageNumber) => {
                const page = Number(pageNumber.dataset.page);
                pageNumber.classList.toggle('filter-hidden', page > totalPages);
            });

            showPage(1);
        }

        oemTabs.forEach((oemTab) => {
            oemTab.addEventListener('click', () => {
                const selectedBrand = oemTab.dataset.oem;
                const filteredCards = selectedBrand === 'all'
                    ? originalCards
                    : originalCards.filter((card) =>
                        card.dataset.oemBrand === selectedBrand
                    );

                oemTabs.forEach((tab) => tab.classList.remove('active'));
                oemTab.classList.add('active');
                renderOemCards(filteredCards);
            });
        });
    }
}

document.querySelectorAll('.category_i, .oem_i').forEach(initPagination);
