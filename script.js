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