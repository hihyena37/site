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

    function applyTteokbokkiFilter() {
        const filterSettings = {
            all: { pages: itemBoxes.length, lastPageCards: 12 },
            tteokbokki: { pages: 3, lastPageCards: 3 },
            rabokki: { pages: 1, lastPageCards: 10 },
            halal: { pages: 1, lastPageCards: 8 },
            frozen: { pages: 1, lastPageCards: 3 }
        };
        const selectedFilter = filterSettings[categorySelect.value];

        applyCardCount(selectedFilter.pages, selectedFilter.lastPageCards);
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
                    applyCardCount(1, categoryCardCounts[category]);
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
        const oemFilterSettings = {
            all: { pages: 3, lastPageCards: 1 },
            samyang: { pages: 1, lastPageCards: 2 },
            paldo: { pages: 1, lastPageCards: 2 },
            etc: { pages: 2, lastPageCards: 1 }
        };

        oemTabs.forEach((oemTab) => {
            oemTab.addEventListener('click', () => {
                const filter = oemFilterSettings[oemTab.dataset.oem];

                oemTabs.forEach((tab) => tab.classList.remove('active'));
                oemTab.classList.add('active');
                applyCardCount(filter.pages, filter.lastPageCards);
            });
        });
    }
}

document.querySelectorAll('.category_i, .oem_i').forEach(initPagination);
