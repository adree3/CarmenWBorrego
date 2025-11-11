/**
* LÓGICA GLOBAL DE LAZY LOADING
*/
document.addEventListener("DOMContentLoaded", () => {
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