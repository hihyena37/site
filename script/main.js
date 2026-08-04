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

// 모바일 OEM 진행 절차: 터치 스와이프 + 마우스 드래그
const oemOrder = document.querySelector('.oem_btm .oem_order');

if (oemOrder) {
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScrollLeft = 0;

    oemOrder.addEventListener('pointerdown', (event) => {
        if (event.pointerType !== 'mouse' || oemOrder.scrollWidth <= oemOrder.clientWidth) return;

        isDragging = true;
        dragStartX = event.clientX;
        dragStartScrollLeft = oemOrder.scrollLeft;
        oemOrder.classList.add('dragging');
        oemOrder.setPointerCapture(event.pointerId);
    });

    oemOrder.addEventListener('pointermove', (event) => {
        if (!isDragging) return;

        event.preventDefault();
        oemOrder.scrollLeft = dragStartScrollLeft - (event.clientX - dragStartX);
    });

    function stopOemDrag(event) {
        if (!isDragging) return;

        isDragging = false;
        oemOrder.classList.remove('dragging');

        if (oemOrder.hasPointerCapture(event.pointerId)) {
            oemOrder.releasePointerCapture(event.pointerId);
        }
    }

    oemOrder.addEventListener('pointerup', stopOemDrag);
    oemOrder.addEventListener('pointercancel', stopOemDrag);
}
