// Esconder Topbar y lazy loading
document.addEventListener("DOMContentLoaded", () => {
    
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    
    if (!header || !main) return;

    const headerHeight = header.offsetHeight;
    main.style.paddingTop = headerHeight + 'px';
    let lastScrollTop = 0; 

    window.addEventListener("scroll", () => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
            header.style.top = `-${headerHeight}px`;
        } else {
            header.style.top = "0";
        }
        lastScrollTop = Math.max(0, scrollTop);
    });    
    const lazyImages = document.querySelectorAll('img.blur-load');
    if (!lazyImages.length) return;

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
});