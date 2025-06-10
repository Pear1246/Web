document.addEventListener('DOMContentLoaded', function() {
    // ==================== 1. 轮播图功能 ====================
    const sliderItems = document.querySelectorAll('.carousal-item');
    const prevBtn = document.querySelector('.left-arrow');
    const nextBtn = document.querySelector('.right-arrow');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let slideInterval;

    // 更新轮播状态
    function updateSlider() {
        sliderItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // 下一张
    function nextSlide() {
        currentIndex = (currentIndex + 1) % sliderItems.length;
        updateSlider();
    }

    // 上一张
    function prevSlide() {
        currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
        updateSlider();
    }

    // 绑定事件
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // 自动轮播
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 3000);
    }
    const heroSlider = document.querySelector('.carousal-container');
    heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSlider.addEventListener('mouseleave', startAutoSlide);

    // 初始化轮播
    updateSlider();
    startAutoSlide();

    // ==================== 2. 内容涌现 + 导航栏控制 ====================
    const pageContent = document.querySelector('.page-content');
    const trees = document.querySelectorAll('.icon img');
    const header = document.querySelector('.transparent-header');
    let isContentVisible = false;

    // 检查视口状态
    function checkScroll() {
        const contentPosition = pageContent.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.5;

        // 内容区域交互
        if (contentPosition < screenPosition && !isContentVisible) {
            // 下滑涌现
            pageContent.classList.add('visible');
            trees.forEach((tree, index) => {
                setTimeout(() => {
                    tree.style.opacity = '1';
                    tree.style.transform = 'translateY(0)';
                }, index * 100);
            });
            isContentVisible = true;
        } else if (contentPosition > screenPosition + 50 && isContentVisible) {
            // 上滑隐藏
            pageContent.classList.remove('visible');
            trees.forEach(tree => {
                tree.style.opacity = '0';
                tree.style.transform = 'translateY(30px)';
            });
            isContentVisible = false;
        }

        // 导航栏透明度
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // 监听滚动
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 初始化检查
});