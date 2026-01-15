document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('global-menu');
    if (!menuContainer) return;

    // Determine current path to highlight active link
    const currentPath = window.location.pathname;

    // Project root check (for local development, paths might differ slightly depending on where it's served)
    // We assume pages are at /pages/filename.html or /index.html

    // Helper to check if link is active
    const isActive = (path) => {
        if (path === '/' && (currentPath === '/' || currentPath === '/index.html')) return 'active';
        return currentPath.includes(path) ? 'active' : '';
    };

    const menuHTML = `
        <a href="/" class="menu-logo">✨ Class Manager</a>
        <ul class="menu-list">
            <li class="menu-item"><a href="/" class="${isActive('/')}">홈 (Home)</a></li>
            <li class="menu-item"><a href="/pages/observation.html" class="${isActive('observation.html')}">학생 관찰일지</a></li>
            <li class="menu-item"><a href="/pages/notice.html" class="${isActive('notice.html')}">오늘의 알림장</a></li>
            <li class="menu-item"><a href="/pages/timer.html" class="${isActive('timer.html')}">타이머</a></li>
        </ul>
    `;

    menuContainer.innerHTML = menuHTML;
});
