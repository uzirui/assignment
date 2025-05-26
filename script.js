document.addEventListener('DOMContentLoaded', () => {
    // 创建星空背景
    createStarryBackground();
    
    // 创建飘落的花瓣效果
    createPetals();
    
    // 添加卡片悬浮效果
    const card = document.querySelector('.card');
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    // 鼠标移入移出效果
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
        
        // 添加深度效果
        setTimeout(() => {
            const title = document.querySelector('.title');
            const subtitle = document.querySelector('.subtitle');
            const poem = document.querySelector('.poem');
            const wishes = document.querySelectorAll('.wish');
            const signature = document.querySelector('.signature');
            
            title.style.transform = 'translateZ(80px)';
            subtitle.style.transform = 'translateZ(60px)';
            poem.style.transform = 'translateZ(40px)';
            wishes.forEach((wish, index) => {
                wish.style.transform = `translateZ(${30 - index * 5}px)`;
            });
            signature.style.transform = 'translateZ(20px)';
        }, 100);
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        
        // 恢复深度效果
        const title = document.querySelector('.title');
        const subtitle = document.querySelector('.subtitle');
        const poem = document.querySelector('.poem');
        const wishes = document.querySelectorAll('.wish');
        const signature = document.querySelector('.signature');
        
        title.style.transform = 'translateZ(0)';
        subtitle.style.transform = 'translateZ(0)';
        poem.style.transform = 'translateZ(0)';
        wishes.forEach(wish => {
            wish.style.transform = 'translateZ(0)';
        });
        signature.style.transform = 'translateZ(0)';
    });
    
    // 添加点击效果
    card.addEventListener('click', () => {
        createHearts();
        playSoundEffect();
    });
    
    // 添加打字效果
    setTimeout(() => {
        typeWriterEffect(document.querySelector('.title'), 200);
    }, 1000);
    
    // 添加闪烁效果
    createSparkleEffect();
    
    // 添加漂浮元素动画
    animateFloatingElements();
});

// 创建星空背景
function createStarryBackground() {
    const starsContainer = document.querySelector('.stars-container');
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // 随机位置和大小
        const size = Math.random() * 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 10}s`;
        star.style.animationDuration = `${Math.random() * 3 + 1}s`;
        
        starsContainer.appendChild(star);
    }
    
    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        .star {
            position: absolute;
            background-color: #fff;
            border-radius: 50%;
            animation: twinkle-star ease-in-out infinite;
        }
        
        @keyframes twinkle-star {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
}

// 创建飘落的花瓣
function createPetals() {
    const container = document.querySelector('.container');
    const petalCount = 30;
    const petalTypes = [
        'M30,10 Q50,0 70,10 Q100,30 90,60 Q80,90 50,90 Q20,90 10,60 Q0,30 30,10 Z',
        'M50,0 C60,30 70,40 100,50 C70,60 60,70 50,100 C40,70 30,60 0,50 C30,40 40,30 50,0',
        'M50,0 C70,30 90,40 100,50 C90,60 70,70 50,100 C30,70 10,60 0,50 C10,40 30,30 50,0'
    ];
    const petalColors = ['#ff9b9b', '#ffb6c1', '#ffc0cb', '#f08080'];
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // 随机样式
        const randomType = petalTypes[Math.floor(Math.random() * petalTypes.length)];
        const randomColor = petalColors[Math.floor(Math.random() * petalColors.length)];
        
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDelay = `${Math.random() * 10}s`;
        petal.style.animationDuration = `${5 + Math.random() * 10}s`;
        petal.style.opacity = Math.random() * 0.6 + 0.3;
        petal.style.transform = `scale(${Math.random() * 0.4 + 0.6}) rotate(${Math.random() * 360}deg)`;
        petal.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="${randomColor}" d="${randomType}"/></svg>')`;
        
        container.appendChild(petal);
    }
    
    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        .petal {
            position: absolute;
            top: -50px;
            width: 30px;
            height: 30px;
            background-size: contain;
            pointer-events: none;
            animation: petalFall linear infinite;
            z-index: -1;
            filter: drop-shadow(0 0 5px rgba(255, 155, 155, 0.3));
        }
        
        @keyframes petalFall {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            25% {
                transform: translateY(calc(25vh)) rotate(90deg) translateX(20px);
            }
            50% {
                transform: translateY(calc(50vh)) rotate(180deg) translateX(-20px);
            }
            75% {
                transform: translateY(calc(75vh)) rotate(270deg) translateX(20px);
            }
            100% {
                transform: translateY(calc(100vh + 50px)) rotate(360deg);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// 创建点击时的心形效果
function createHearts() {
    const container = document.querySelector('.container');
    const heartCount = 20;
    const heartColors = ['#e74c3c', '#ff6b6b', '#ff7979', '#ff8b8b', '#ff9b9b'];
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // 随机位置和大小
        heart.style.left = `${50 + (Math.random() - 0.5) * 60}%`;
        heart.style.top = `${50 + (Math.random() - 0.5) * 60}%`;
        heart.style.fontSize = `${Math.random() * 2 + 0.7}rem`;
        heart.style.animationDelay = `${Math.random() * 0.5}s`;
        heart.style.animationDuration = `${1 + Math.random() * 2}s`;
        heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
        
        heart.textContent = '❤';
        container.appendChild(heart);
        
        // 自动移除
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
    
    // 添加CSS样式
    if (!document.querySelector('#heart-style')) {
        const style = document.createElement('style');
        style.id = 'heart-style';
        style.textContent = `
            .heart {
                position: absolute;
                user-select: none;
                pointer-events: none;
                animation: heartFloat ease-out forwards;
                opacity: 0;
                z-index: 10;
                filter: drop-shadow(0 0 5px rgba(231, 76, 60, 0.5));
            }
            
            @keyframes heartFloat {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.9;
                }
                100% {
                    transform: scale(1.8) rotate(${Math.random() * 40 - 20}deg) translateY(-150px);
                    opacity: 0;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// 播放音效
function playSoundEffect() {
    // 创建音频上下文
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const audioCtx = new AudioContext();
    
    // 创建振荡器
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    // 设置音频参数
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.5);
    
    // 播放音频
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1.5);
    
    // 播放第二个音符
    setTimeout(() => {
        const oscillator2 = audioCtx.createOscillator();
        const gainNode2 = audioCtx.createGain();
        
        oscillator2.connect(gainNode2);
        gainNode2.connect(audioCtx.destination);
        
        oscillator2.type = 'sine';
        oscillator2.frequency.setValueAtTime(659.25, audioCtx.currentTime); // E5
        gainNode2.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode2.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
        gainNode2.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.5);
        
        oscillator2.start();
        oscillator2.stop(audioCtx.currentTime + 1.5);
    }, 200);
}

// 打字机效果
function typeWriterEffect(element, speed) {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '0.15em solid #e74c3c';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            element.style.borderRight = 'none';
            
            // 添加完成后的闪烁效果
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'glow 2s ease-in-out infinite alternate';
            }, 100);
        }
    }, speed);
}

// 创建闪烁效果
function createSparkleEffect() {
    const sparkles = document.querySelector('.sparkles');
    
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // 随机位置
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        
        sparkles.appendChild(sparkle);
        
        // 自动移除
        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }, 300);
    
    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        .sparkle {
            position: absolute;
            width: 12px;
            height: 12px;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon fill="%23ffff00" points="50,0 61,35 97,35 68,57 79,91 50,70 21,91 32,57 3,35 39,35"/></svg>');
            background-size: contain;
            opacity: 0;
            animation: sparkleAnimation 1.5s ease-in-out forwards;
            pointer-events: none;
        }
        
        @keyframes sparkleAnimation {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            50% { transform: scale(1) rotate(180deg); opacity: 1; }
            100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
    `;
    
    document.head.appendChild(style);
}

// 漂浮元素动画
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach(element => {
        // 给每个元素添加随机初始位置
        element.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
    });
}

// 添加页面加载动画
window.addEventListener('load', () => {
    const card = document.querySelector('.card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        card.style.transition = 'opacity 1s ease, transform 1s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 500);
    
    // 添加页面元素的CSS过渡效果
    const style = document.createElement('style');
    style.textContent = `
        .title, .subtitle, .poem, .wish, .signature, .date {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}); 