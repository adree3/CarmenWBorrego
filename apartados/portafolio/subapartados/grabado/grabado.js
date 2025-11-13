// Espera a que el contenido de la página esté listo
document.addEventListener("DOMContentLoaded", () => {
    
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    
    if (!header || !main) return;

    // --- 1. Ajuste inicial ---
    const headerHeight = header.offsetHeight;
    main.style.paddingTop = headerHeight + 'px';

    // --- 2. Lógica de Ocultar/Mostrar al hacer Scroll ---
    let lastScrollTop = 0; 

    window.addEventListener("scroll", () => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
            // SCROLL HACIA ABAJO
            header.style.top = `-${headerHeight}px`;
        } else {
            // SCROLL HACIA ARRIBA
            header.style.top = "0";
        }
        
        lastScrollTop = Math.max(0, scrollTop);
    });

    /* === LÓGICA DE CARGA PEREZOSA (LAZY LOADING) === */
    
    const lazyImages = document.querySelectorAll('img.blur-load');
    if (!lazyImages.length) return; // No encontrará ninguna aquí, y eso está bien.

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                
                const fullImage = new Image();
                const fullSrc = lazyImage.dataset.full;
                
                if (!fullSrc) return;

                fullImage.src = fullSrc;
                if (lazyImage.dataset.srcset) {
                    fullImage.srcset = lazyImage.dataset.srcset;
                }

                fullImage.onload = () => {
                    lazyImage.src = fullSrc;
                    if (lazyImage.dataset.srcset) {
                        lazyImage.srcset = lazyImage.dataset.srcset;
                    }
                    lazyImage.classList.add('loaded');
                    observer.unobserve(lazyImage);
                };
            }
        });
    }, observerOptions);

    lazyImages.forEach(image => {
        imgObserver.observe(image);
    });

    /* === LÓGICA "VER MÁS" / "VER MENOS" === */

    const galleryGroups = document.querySelectorAll('.masonry-group');

    galleryGroups.forEach(group => {
        const verMasButton = group.querySelector('.btn-ver-mas');
        const verMenosButton = group.querySelector('.btn-ver-menos');
        const grid = group.querySelector('.masonry-grid');

        if (!verMasButton || !verMenosButton || !grid) return;

        verMasButton.addEventListener('click', () => {
            grid.classList.remove('masonry-grid--collapsed');
            verMasButton.style.display = 'none';
            verMenosButton.style.display = 'block';
        });

        verMenosButton.addEventListener('click', () => {
            grid.classList.add('masonry-grid--collapsed');
            verMasButton.style.display = 'block';
            verMenosButton.style.display = 'none';
            group.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

});