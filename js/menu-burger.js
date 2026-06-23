// Знаходимо елементи бургера та меню навігації
const burger = document.getElementById('menu-burger');
const menu = document.getElementById('nav-menu');

if (burger && menu) {
    burger.addEventListener('click', () => {
        // Перемикаємо клас 'open' для анімації ліній бургера в хрестик
        burger.classList.toggle('open');
        // Перемикаємо клас 'active' для висування панелі меню
        menu.classList.toggle('active');
    });

    // Додатково: закриваємо меню, якщо користувач клікнув на якесь посилання
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            menu.classList.remove('active');
        });
    });
}