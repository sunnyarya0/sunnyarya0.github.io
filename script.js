document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const syncThemeLabel = () => themeToggle.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
    syncThemeLabel();
    themeToggle.addEventListener('click', () => {
        const dark = root.dataset.theme !== 'dark';
        if (dark) root.dataset.theme = 'dark'; else delete root.dataset.theme;
        try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
        syncThemeLabel();
    });

    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const setNav = open => { navLinks.classList.toggle('active', open); navToggle.setAttribute('aria-expanded', String(open)); };
    navToggle.addEventListener('click', () => setNav(!navLinks.classList.contains('active')));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setNav(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });
});
