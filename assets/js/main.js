/**
 * 主脚本文件
 * 处理页面交互和动态内容生成
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化状态
    let currentCategory = 'jetbra';
    let currentLanguage = CONFIG.settings.defaultLanguage;
    let isDarkTheme = false;
    
    // 获取DOM元素
    const themeToggle = document.getElementById('theme-toggle');
    const languageToggle = document.getElementById('language-toggle');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const cardContainer = document.getElementById('card-container');
    const downloadInfo = document.querySelector('.download-info');
    
    // 检测系统主题偏好并应用
    function detectAndApplySystemTheme() {
        // 检查系统是否偏好深色模式
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-theme');
            isDarkTheme = true;
            
            // 更新主题切换按钮图标
            const themeIcon = themeToggle.querySelector('i');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
    
    // 监听系统主题变化
    function listenForSystemThemeChanges() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // 添加变化监听器
            mediaQuery.addEventListener('change', (e) => {
                if (e.matches) {
                    // 切换到深色模式
                    document.body.classList.add('dark-theme');
                    isDarkTheme = true;
                    
                    // 更新主题切换按钮图标
                    const themeIcon = themeToggle.querySelector('i');
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    // 切换到浅色模式
                    document.body.classList.remove('dark-theme');
                    isDarkTheme = false;
                    
                    // 更新主题切换按钮图标
                    const themeIcon = themeToggle.querySelector('i');
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            });
        }
    }
    
    // 应用系统主题设置
    detectAndApplySystemTheme();
    listenForSystemThemeChanges();
    
    // 初始化页面
    updateLanguageText();
    renderCards(currentCategory);
    
    // 主题切换
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        isDarkTheme = !isDarkTheme;
        
        // 保存主题设置到本地存储
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        
        // 切换图标
        const themeIcon = this.querySelector('i');
        if (isDarkTheme) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });
    
    // 语言切换
    languageToggle.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
        updateLanguageText();
        renderCards(currentCategory);
    });
    
    // 分类切换
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // 更新活动按钮
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 更新当前分类并重新渲染卡片
            currentCategory = category;
            renderCards(category);
        });
    });
    
    /**
     * 渲染卡片
     * @param {string} category - 要渲染的分类
     */
    function renderCards(category) {
        // 清空容器
        cardContainer.innerHTML = '';
        
        // 获取对应分类的软件数据
        const softwareList = CONFIG.software[category];
        
        // 为每个软件创建卡片
        softwareList.forEach(software => {
            // 创建卡片元素
            const card = document.createElement('div');
            card.className = 'card';
            
            // 获取默认版本（第一个版本）
            const defaultVersion = software.versions[0];
            const key = software.keys[defaultVersion];
            
            // 创建版本选择器选项
            const versionOptions = software.versions.map(version => 
                `<div class="version-option" data-version="${version}">${version}</div>`
            ).join('');
            
            // 设置卡片HTML
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-icon-container">
                        <img src="${software.icon}" alt="${software.name}" class="card-icon" draggable="false">
                        <div class="card-title" title="${software.name}">${software.name}</div>
                    </div>
                    <div class="version-selector">
                        <div class="version-display">${defaultVersion}</div>
                        <div class="version-options">
                            ${versionOptions}
                        </div>
                    </div>
                </div>
                <div class="key-display" data-key="${key}">
                    ${'*'.repeat(32)}
                    ${'*'.repeat(32)}
                    ${'*'.repeat(32)}
                    <div class="copy-key">${CONFIG.text[currentLanguage].copyKey}</div>
                </div>
            `;
            
            // 添加到容器
            cardContainer.appendChild(card);
            
            // 添加版本选择器事件
            const versionDisplay = card.querySelector('.version-display');
            const versionOptionsContainer = card.querySelector('.version-options');
            const keyDisplay = card.querySelector('.key-display');
            const copyKeyElement = card.querySelector('.copy-key');
            
            // 显示/隐藏版本选项
            versionDisplay.addEventListener('click', function(e) {
                e.stopPropagation();
                versionOptionsContainer.style.display = versionOptionsContainer.style.display === 'block' ? 'none' : 'block';
            });
            
            // 点击其他地方关闭版本选项
            document.addEventListener('click', function() {
                versionOptionsContainer.style.display = 'none';
            });
            
            // 版本选择
            card.querySelectorAll('.version-option').forEach(option => {
                option.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const selectedVersion = this.dataset.version;
                    const newKey = software.keys[selectedVersion];
                    
                    // 更新显示 - 只显示版本号
                    versionDisplay.textContent = selectedVersion;
                    keyDisplay.dataset.key = newKey;
                    versionOptionsContainer.style.display = 'none';
                });
            });
            
            // 复制密钥功能
            keyDisplay.addEventListener('click', function() {
                const keyToCopy = this.dataset.key;
                navigator.clipboard.writeText(keyToCopy).then(() => {
                    copyKeyElement.textContent = CONFIG.text[currentLanguage].copySuccess;
                    setTimeout(() => {
                        copyKeyElement.textContent = CONFIG.text[currentLanguage].copyKey;
                    }, 2000);
                });
            });
        });
    }
    
    /**
     * 更新语言文本
     */
    function updateLanguageText() {
        // 更新下载提示和免责声明
        document.getElementById('download-banner').querySelector('.download-text').innerHTML = CONFIG.text[currentLanguage].downloadInfo;
        document.getElementById('footer').querySelector('.disclaimer').textContent = CONFIG.text[currentLanguage].disclaimer;
        
        // 更新分类标签文本
        categoryButtons.forEach(button => {
            const category = button.dataset.category;
            button.textContent = CONFIG.text[currentLanguage].categories[category];
        });
    }
}); 