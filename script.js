
document.addEventListener("DOMContentLoaded", () => {
    // 开屏动画部分
    const frames = ["cloud1.png", "cloud2.png", "cloud3.png", "cloud4.png"];
    const frameElement = document.getElementById("frame");
    let frameIndex = 0;

    // Frame animation loop
    const interval = setInterval(() => {
        frameIndex = (frameIndex + 1) % frames.length; // Loop through frames
        frameElement.src = `https://github.com/SoraTang/Web/releases/download/v1.0.0/${frames[frameIndex]}`;
    }, 200); // Adjust the delay to control the animation speed

    // Simulate loading completion
    setTimeout(() => {
        clearInterval(interval);
        const loadingScreen = document.getElementById("loading-screen");
        loadingScreen.classList.add("fade-out");

        // After loading screen fades out, start the title animation
        const welcomeTitle = document.getElementById("welcome-title");
        if (welcomeTitle) {
            welcomeTitle.style.animationPlayState = 'running'; // Start the animation
        }
    }, 1500); // Adjust time to match the desired loading duration

    // 鼠标指针动画部分
    const cursorFrames = ["mouse1.png", "mouse2.png", "mouse3.png", "mouse4.png"];
    let cursorIndex = 0;

    // 播放光标动画
    function playCursorAnimation() {
        const body = document.body;
        const animationInterval = setInterval(() => {
            // 切换到下一帧
            cursorIndex = (cursorIndex + 1) % cursorFrames.length;
            body.style.cursor = `url('https://github.com/SoraTang/Web/releases/download/v1.0.0/${cursorFrames[cursorIndex]}'), auto`;

            // 动画结束后停止循环
            if (cursorIndex === cursorFrames.length - 1) {
                clearInterval(animationInterval);

                // 将光标恢复到第一帧
                setTimeout(() => {
                    body.style.cursor = `url('https://github.com/SoraTang/Web/releases/download/v1.0.0/${cursorFrames[0]}'), auto`;
                }, 100); // 确保动画结束后回到 mouse1
            }
        }, 100); // 每帧切换时间 (毫秒)
    }

    // 每隔 5 秒播放一次动画
    setInterval(playCursorAnimation, 5000);

    // 获取My Work链接和转场动画容器
    const myWorkLink = document.getElementById("my-work-link");
    const transitionAnimation = document.getElementById("transition-animation");

    // 为My Work链接添加点击事件
    if (myWorkLink) {
        myWorkLink.addEventListener("click", function (event) {
            event.preventDefault(); // 阻止默认跳转行为

            // 显示转场动画容器
            if (transitionAnimation) {
                transitionAnimation.style.display = "flex";
            }

            // 等待动画结束后跳转到目标页面
            setTimeout(() => {
                window.location.href = myWorkLink.href;
            }, 6000); // 这里设置为最长的动画时间 (6s)
        });
    }
});

window.addEventListener('scroll', function () {
    const workBoxes = document.querySelectorAll('.work-box'); // 获取所有作品展示框
    const scrollY = window.scrollY; // 获取滚动的距离

    workBoxes.forEach(workBox => {
        const startPos = parseInt(workBox.getAttribute('data-start')); // 获取该框开始移动的起始位置
        if (scrollY >= startPos) {
            // 计算背景图片的位移，调节系数来控制移动的幅度
            const offset = (scrollY - startPos) * 0.15; // 调整系数来控制背景图片的移动速度

            // 修改背景图片的垂直位置
            workBox.style.backgroundPosition = `center ${-offset}px`;
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const handImage = document.getElementById("hand-image");
    const workBox1 = document.querySelector(".work-box"); // 第一个作品框
    const buffer = -400; // 缓冲检测区域

    window.addEventListener("scroll", () => {
        // 获取作品框位置信息
        const boxTop = workBox1.getBoundingClientRect().top;
        const boxBottom = workBox1.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        // 检测区域判断
        if (boxTop < windowHeight + buffer && boxBottom > -buffer) {
            handImage.classList.add("show");
            handImage.classList.remove("hide");

            // 图片垂直位置动态调整
            handImage.style.top = `${boxTop + window.scrollY + 450}px`; // 根据需要微调
        } else {
            handImage.classList.remove("show");
            handImage.classList.add("hide");
        }
    });
});

function setupScrollImageChange(characterId, images, thresholdStart, thresholdEnd) {
    const character = document.getElementById(characterId);
    let currentImageIndex = 0;
    let isChanging = false;
    const steps = images.length;
    const stepSize = (thresholdEnd - thresholdStart) / steps;

    let lastScrollY = window.scrollY;

    // 设置初始图片
    character.src = images[0];
    character.style.opacity = 1;

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const scrollingDown = scrollY > lastScrollY;
        lastScrollY = scrollY;

        if (scrollY < thresholdStart) {
            if (currentImageIndex !== 0) {
                changeImage(0);
            }
        } else if (scrollY >= thresholdStart && scrollY <= thresholdEnd) {
            let step = Math.min(
                Math.floor((scrollY - thresholdStart) / stepSize),
                steps - 1
            );

            if (!isChanging) {
                if (scrollingDown && step > currentImageIndex) {
                    changeImage(step);
                } else if (!scrollingDown && step < currentImageIndex) {
                    changeImage(step);
                }
            }
        } else if (scrollY > thresholdEnd && currentImageIndex !== steps - 1) {
            changeImage(steps - 1);
        }
    });

    function changeImage(newIndex) {
        isChanging = true;

        // 移除当前图片的 show 类（让它变得透明）
        character.classList.remove("show");

        setTimeout(() => {
            character.src = images[newIndex];  // 切换图片
            currentImageIndex = newIndex;  // 更新当前图片索引

            // 添加 show 类并使图片渐入
            setTimeout(() => {
                character.classList.add("show");
                isChanging = false;  // 重置状态
            }, 100);  // 确保图像已经切换后再添加 show 类
        }, 500);  // 等待上一张图片渐变效果完成
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setupScrollImageChange(
        "character", // 角色图片容器的 ID
        [
            "images/stone/1.png",
            "images/stone/2.png",
            "images/stone/3.png",
            "images/stone/4.png",
        ], // 图片数组
        1400, // 开始切换的滚动距离
        2400  // 结束切换的滚动距离
    );
});

document.addEventListener("DOMContentLoaded", () => {
    setupScrollImageChange(
        "character-3", // 第二个角色图片容器的 ID
        [
            "images/stone2/1.png",
            "images/stone2/2.png",
            "images/stone2/3.png",
            "images/stone2/4.png",
        ], // 图片数组
        4500, // 开始切换的滚动距离
        5500  // 结束切换的滚动距离
    );
});


// 获取所有视频元素
const videos = document.querySelectorAll('.work-video');

// 遍历所有视频元素
videos.forEach(video => {
    const workBox = video.closest('.work-box');

    // 监听视频播放事件
    video.addEventListener('play', () => {
        workBox.classList.add('playing'); // 添加 playing 类
    });

    // 监听视频暂停或结束事件
    video.addEventListener('pause', () => {
        workBox.classList.remove('playing'); // 移除 playing 类
    });

    video.addEventListener('ended', () => {
        workBox.classList.remove('playing'); // 移除 playing 类
    });
});

document.addEventListener('scroll', function () {
    const workBoxes = document.querySelectorAll('.work-box'); // 获取所有展示框
    const scrollY = window.scrollY; // 获取滚动的距离
    const thirdWorkBoxTop = workBoxes[1].offsetTop; // 获取第三个展示框的顶部位置
    const sixthWorkBoxBottom = workBoxes[5].offsetTop; // 获取第六个展示框底部的位置

    // 判断是否滚动到第三个展示框及其以下
    if (scrollY >= thirdWorkBoxTop && scrollY < sixthWorkBoxBottom) {
        document.body.style.backgroundColor = "black"; // 滚动到第三个展示框时背景变黑
    } else if (scrollY >= sixthWorkBoxBottom) {
        document.body.style.backgroundColor = ""; // 滚动到第六个展示框底部时恢复原背景色
    } else {
        document.body.style.backgroundColor = ""; // 回到顶部时恢复原背景色
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const contactLink = document.getElementById('contact-link'); // 获取联系方式链接
    let isContact = true; // 设置一个状态，表示当前是“联系方式”还是“回到顶部”

    contactLink.addEventListener('click', function (event) {
        if (isContact) {
            // 如果当前是“联系方式”，点击后滚动到页面底部
            const footer = document.querySelector('#footer-image'); // 假设页面底部有 id="footer-image"
            footer.scrollIntoView({ behavior: 'smooth' }); // 平滑滚动到页面底部
            // 修改链接文本为“回到顶部”
            contactLink.textContent = '回到顶部';
            contactLink.setAttribute('href', '#'); // 设置为返回顶部
        } else {
            // 如果当前是“回到顶部”，点击后滚动回到页面顶部
            window.scrollTo({ top: 0, behavior: 'smooth' }); // 平滑滚动到顶部
            // 修改链接文本为“联系方式”
            contactLink.textContent = '联系方式';
            contactLink.setAttribute('href', '#contact'); // 恢复为跳转到联系方式部分
        }

        // 切换状态
        isContact = !isContact;

        // 阻止默认行为，避免点击链接时直接跳转
        event.preventDefault();
    });
});
