window.addEventListener('load', function() {
    // Phát nhạc
    const audio = document.getElementById('birthdaySong');
    audio.play();
    
    // Bắn pháo hoa ban đầu
    shootInitialFireworks();
    
    // Tiếp tục bắn pháo hoa theo chu kỳ
    setInterval(shootPeriodicFireworks, 2500);
});

function shootInitialFireworks() {
    // Bắn pháo hoa mạnh từ nhiều hướng
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Bắn từ góc trái
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ff6999', '#ff9999', '#ffb366', '#ffcc99', '#ff99cc']
        });
        
        // Bắn từ góc phải
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#ff6999', '#ff9999', '#ffb366', '#ffcc99', '#ff99cc']
        });
        
        // Bắn từ giữa
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.4, 0.6), y: 0.7 }
        });
    }, 250);
}

function shootPeriodicFireworks() {
    // Bắn pháo hoa nhẹ theo chu kỳ
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6999', '#ff9999', '#ffb366', '#ffcc99', '#ff99cc'],
        angle: randomInRange(55, 125),
        ticks: 200
    });
}

// Hàm tiện ích
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Xử lý audio
document.addEventListener('click', function() {
    const audio = document.getElementById('birthdaySong');
    if (audio.paused) {
        audio.play();
    }
});

// Thêm hiệu ứng pháo hoa khi click vào bánh
document.querySelector('.cake').addEventListener('click', function(e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Bắn pháo hoa tại vị trí click
    confetti({
        particleCount: 150,
        spread: 60,
        origin: { x, y },
        colors: ['#ff6999', '#ff9999', '#ffb366', '#ffcc99', '#ff99cc']
    });
});
