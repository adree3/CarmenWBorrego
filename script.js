/**
 * SCROLL HORIZONTAL DE LA CINTA
 */

document.addEventListener("DOMContentLoaded", function() {
    const track = document.querySelector(".cinta-track");
    const wrapper = document.querySelector(".cinta-wrapper");

    if (!track || !wrapper) {
        console.warn("No se encontraron los elementos para el scroll horizontal.");
        return;
    }
    function manejarScrollHorizontal() {
        
        const rect = wrapper.getBoundingClientRect();
        const scrollAmount = -rect.top;
        const scrollableHeight = wrapper.offsetHeight - window.innerHeight;
        let scrollProgress = scrollAmount / scrollableHeight;

        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
        const maxScrollLeft = track.scrollWidth - window.innerWidth;
        const scrollLeft = scrollProgress * maxScrollLeft;
        track.style.transform = `translateX(-${scrollLeft}px)`;
    }
    window.addEventListener("scroll", manejarScrollHorizontal);
});
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