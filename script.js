// Дата начала отношений - укажите свою дату (можно изменить)
// Формат: год, месяц (0-11), день
const startDate = new Date(2024, 6, 1); // 27 марта 2025

// Переключение секций
function goToSection(num) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (section.classList.contains('active')) {
            section.classList.remove('active');
            section.classList.add('exit');
            setTimeout(() => section.classList.remove('exit'), 800);
        }
    });
    setTimeout(() => {
        document.getElementById('section' + num).classList.add('active');
    }, 200);
}

// Обновление счётчика времени
function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    // Первый день отношений тоже считается, поэтому +1
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

setInterval(updateCounter, 1000);
updateCounter();

// Создание звёзд на фоне
function createStars() {
    const starsContainer = document.getElementById('stars');
    const count = 80;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (1.5 + Math.random() * 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Падающие сердечки
function createFallingHeart() {
    const container = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    const hearts = ['💖', '💗', '💕', '❤️', '💜', '🩷', '🤍'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (15 + Math.random() * 20) + 'px';
    heart.style.animationDuration = (5 + Math.random() * 5) + 's';
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 10000);
}

// Интерактивная зона кликов
let heartCount = 0;
const clickMessages = [
    '💖 Люблю тебя!',
    '💗 Ты моя радость!',
    '💕 Ты прекрасна!',
    '❤️ Навсегда!',
    '💜 Ты моё счастье!',
    '🩷 Ты лучшая!',
    '✨ Ты моё всё!',
    '🌹 Моя единственная!'
];

function setupClickArea() {
    const clickArea = document.getElementById('clickArea');
    clickArea.addEventListener('click', function(e) {
        const rect = clickArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Создаём сердечко в точке клика
        const heart = document.createElement('div');
        heart.className = 'click-heart';
        heart.textContent = '💖';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        clickArea.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);

        heartCount++;
        document.getElementById('heartCount').textContent = heartCount;

        // Скрыть текст "нажми" после первого клика
        const tapText = clickArea.querySelector('.tap-text');
        if (tapText) tapText.style.display = 'none';

        // Показать финальное сообщение после 10 сердечек
        if (heartCount >= 10) {
            document.querySelector('.final-message').classList.add('visible');
        }
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    setupClickArea();
    setInterval(createFallingHeart, 1500);
    for (let i = 0; i < 5; i++) {
        setTimeout(createFallingHeart, i * 300);
    }
});
