document.addEventListener("DOMContentLoaded", () => {
    const hoverElement = document.querySelector(".nav-links");
    const targetElement = document.querySelector(".header");

    hoverElement.addEventListener("mouseover", () => {
        targetElement.style.paddingBottom = "300px"; // Cambia solo el padding-bottom al pasar el cursor
    });

    hoverElement.addEventListener("mouseout", () => {
        targetElement.style.paddingBottom = "10px"; // Restaura el padding-bottom original al quitar el cursor
    });
});