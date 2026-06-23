/* ==========================================================================
   INTERACTIVE LOGIC - INTERIOR DESIGNER PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. АНІМАЦІЯ ШАПКИ ПРИ СКРОЛІ (Header Scroll Effect)
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '15px 40px';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.03)';
        } else {
            header.style.padding = '30px 40px';
            header.style.boxShadow = 'none';
        }
    });

    // 2. ФІЛЬТРАЦІЯ ПРОЄКТІВ ПОРТФОЛІО (Portfolio Filtering Logic)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Видаляємо активний клас у всіх кнопок і додаємо натиснутій
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                // Плавне зникнення та поява елементів сітки
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400); // Час має збігатися з CSS transition
                }
            });
        });
    });

    // 3. ОБРОБКА КОНТАКТНОЇ ФОРМИ (Contact Form Submission)
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Запобігаємо перезавантаженню сторінки

            // Зчитуємо дані (для майбутньої інтеграції з сервером або EmailJS)
            const name = contactForm.querySelector('input[type="text"]').value;

            // Елегантна заміна форми на повідомлення про успіх
            const formWrapper = document.querySelector('.contact-wrapper');
            formWrapper.style.opacity = '0';

            setTimeout(() => {
                formWrapper.innerHTML = `
                    <div style="text-align: center; padding: 40px; border: 1px solid var(--color-accent); background-color: var(--color-bg-main); transition: var(--transition-smooth);">
                        <h3 style="font-family: var(--font-headers); font-size: 2.2rem; margin-bottom: 15px; color: var(--color-text-main);">Thank you, ${name}!</h3>
                        <p style="font-family: var(--font-body); font-size: 0.95rem; color: var(--color-text-muted); font-weight: 300;">Your message has been sent successfully. I will get back to you as soon as possible.</p>
                    </div>
                `;
                formWrapper.style.opacity = '1';
            }, 400);

            contactForm.reset();
        });
    }
});

// 4. ДИНАМІЧНЕ ЗАВАНТАЖЕННЯ ПОСЛУГ ІЗ JSON (Dynamic Services Render)
const servicesGrid = document.querySelector('.services-grid');

if (servicesGrid) {
    // Запитуємо дані з нашого файлу в папці content/
    fetch('content/services_list.json')
        .then(response => response.json())
        .then(data => {
            const currencySymbol = data.currency === 'GBP' ? '£' : data.currency;

            // Очищаємо статичні заглушки в HTML перед рендером
            servicesGrid.innerHTML = '';

            // Циклом створюємо унікальну картку для кожної послуги
            data.services.forEach(service => {
                const card = document.createElement('div');
                card.className = `service-card ${service.category}`;

                card.innerHTML = `
                        <h3>${service.title}</h3>
                        <p style="font-style: italic; margin-bottom: 10px; color: var(--color-accent); font-size: 0.9rem;">${service.subtitle}</p>
                        <p>${service.description}</p>
                        <div style="margin-top: 25px; font-family: var(--font-body); font-weight: 500; font-size: 1rem; color: var(--color-text-main);">
                            ${service.pricing}
                        </div>
                    `;

                servicesGrid.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading services:', error);
        });
}

// document.getElementById('contact-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const form = event.target;
//     const button = form.querySelector('.btn-submit');

//     // 1. Змінюємо текст на кнопці
//     button.textContent = 'Sending...';
//     button.disabled = true;

//     // 2. Імітуємо відправку
//     setTimeout(() => {
//         // Просто приховуємо саму форму! 
//         form.style.display = 'none';
        
//         // Якщо верхній блок подяки підвантажується динамічно розширенням/іншим скриптом, 
//         // він залишиться видимим всередині .contact-wrapper самостійно.
//     }, 1500);
// });


// document.getElementById('contact-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const form = event.target;
//     const button = form.querySelector('.btn-submit');
//     const wrapper = document.querySelector('.contact-wrapper');

//     // 1. Блокуємо кнопку під час відправки
//     button.textContent = 'Sending...';
//     button.disabled = true;

//     // 2. Відправляємо в EmailJS
//     emailjs.sendForm('service_ev8axpi', 'template_kqvh1ko', form)
//         .then(() => {
//             // Замість style.display використовуємо клас hidden
//             form.classList.add('hidden');
//             form.reset(); // Очищуємо поля

//             // Відновлюємо текст кнопки для майбутнього
//             button.textContent = 'Send Message';
//             button.disabled = false;

//             // 3. Чекаємо секунду, поки згенерується блок подяки, і додаємо кнопку
//             setTimeout(() => {
//                 const successBlock = wrapper.querySelector('div[style*="text-align: center"]');
                
//                 if (successBlock && !successBlock.querySelector('.btn-reset-form')) {
//                     const resetBtn = document.createElement('button');
//                     resetBtn.textContent = 'Send another message';
//                     resetBtn.className = 'btn-reset-form';
                    
//                     // Стилі кнопки подяки
//                     resetBtn.style.marginTop = '20px';
//                     resetBtn.style.padding = '10px 20px';
//                     resetBtn.style.backgroundColor = '#262c2c';
//                     resetBtn.style.color = '#fff';
//                     resetBtn.style.border = 'none';
//                     resetBtn.style.cursor = 'pointer';
//                     resetBtn.style.textTransform = 'uppercase';
//                     resetBtn.style.fontSize = '12px';
//                     resetBtn.style.letterSpacing = '1px';
//                     resetBtn.style.transition = 'background-color 0.3s';

//                     resetBtn.onmouseover = () => resetBtn.style.backgroundColor = '#383f3f';
//                     resetBtn.onmouseout = () => resetBtn.style.backgroundColor = '#262c2c';

//                     // ЛОГІКА КЛІКУ ПОВЕРНЕННЯ:
//                     resetBtn.addEventListener('click', function() {
//                         successBlock.remove(); // Видаляємо блок подяки
//                         form.classList.remove('hidden'); // Показуємо форму в її оригінальному вигляді!
//                     });

//                     successBlock.appendChild(resetBtn);
//                 }
//             }, 1000);

//         }, (error) => {
//             console.error('EmailJS Error:', error);
//             alert('Oops... Something went wrong. Please try again.');
//             button.textContent = 'Send Message';
//             button.disabled = false;
//         });
// });

// Зберігаємо початковий HTML-код форми та її wrapper при завантаженні сторінки


const wrapper = document.querySelector('.contact-wrapper');
const initialFormHTML = wrapper.innerHTML;

// Оскільки форма може перестворюватися, використовуємо делегування подій на wrapper
wrapper.addEventListener('submit', function(event) {
    if (event.target && event.target.id === 'contact-form') {
        event.preventDefault();

        const form = event.target;
        const button = form.querySelector('.btn-submit');

        // 1. Блокуємо кнопку під час відправки
        button.textContent = 'Sending...';
        button.disabled = true;

        // 2. Відправляємо в EmailJS
        emailjs.sendForm('service_ev8axpi', 'template_kqvh1ko', form)
            .then(() => {
                // Приховуємо форму за допомогою нашого CSS-класу
                form.classList.add('hidden');

                // 3. Чекаємо секунду, поки сторонній скрипт згенерує вікно подяки
                setTimeout(() => {
                    const successBlock = wrapper.querySelector('div[style*="text-align: center"]');
                    
                    if (successBlock && !successBlock.querySelector('.btn-reset-form')) {
                        const resetBtn = document.createElement('button');
                        resetBtn.textContent = 'Send another message';
                        resetBtn.className = 'btn-reset-form';
                        
                        // Стилі для кнопки
                        resetBtn.style.marginTop = '20px';
                        resetBtn.style.padding = '10px 20px';
                        resetBtn.style.backgroundColor = '#262c2c';
                        resetBtn.style.color = '#fff';
                        resetBtn.style.border = 'none';
                        resetBtn.style.cursor = 'pointer';
                        resetBtn.style.textTransform = 'uppercase';
                        resetBtn.style.fontSize = '12px';
                        resetBtn.style.letterSpacing = '1px';
                        resetBtn.style.transition = 'background-color 0.3s';

                        resetBtn.onmouseover = () => resetBtn.style.backgroundColor = '#383f3f';
                        resetBtn.onmouseout = () => resetBtn.style.backgroundColor = '#262c2c';

                        // ЛОГІКА КЛІКУ: Повністю відновлюємо оригінальний HTML форми
                        resetBtn.addEventListener('click', function() {
                            wrapper.innerHTML = initialFormHTML;
                        });

                        successBlock.appendChild(resetBtn);
                    }
                }, 1000);

            }, (error) => {
                console.error('EmailJS Error:', error);
                alert('Oops... Something went wrong. Please try again.');
                button.textContent = 'Send Message';
                button.disabled = false;
            });
    }
});

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