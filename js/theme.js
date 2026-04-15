/* ============================================
   6E Virtual - Theme Toggle System
   ============================================ */

const ThemeManager = {
    STORAGE_KEY: '6e-virtual-theme',

    MAP_TILES: {
        dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
    },

    MAP_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',

    currentTileLayer: null,
    mapInstance: null,

    init() {
        this.applyInitialTheme();
        this.setupToggleButtons();
        this.listenForSystemChanges();
        console.log('[Theme] Initialized:', this.getCurrentTheme());
    },

    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'dark';
    },

    getSavedTheme() {
        try {
            return localStorage.getItem(this.STORAGE_KEY);
        } catch (e) {
            return null;
        }
    },

    saveTheme(theme) {
        try {
            localStorage.setItem(this.STORAGE_KEY, theme);
        } catch (e) {}
    },

    getSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
        return 'dark';
    },

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateToggleButtons(theme);
        this.updateMapTiles(theme);
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    },

    updateMapTiles(theme) {
        if (this.mapInstance && this.currentTileLayer) {
            this.mapInstance.removeLayer(this.currentTileLayer);
            this.currentTileLayer = L.tileLayer(this.MAP_TILES[theme], {
                attribution: this.MAP_ATTRIBUTION,
                maxZoom: 19
            }).addTo(this.mapInstance);
        }
    },

    registerMap(map, tileLayer) {
        this.mapInstance = map;
        this.currentTileLayer = tileLayer;
    },

    getTileUrl() {
        return this.MAP_TILES[this.getCurrentTheme()];
    },

    applyInitialTheme() {
        const saved = this.getSavedTheme();
        if (saved) {
            this.applyTheme(saved);
        } else {
            this.applyTheme(this.getSystemPreference());
        }
    },

    toggle() {
        const current = this.getCurrentTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        this.applyTheme(next);
        this.saveTheme(next);
    },

    setupToggleButtons() {
        document.querySelectorAll('.theme-toggle, [data-theme-toggle]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle();
            });
        });
    },

    updateToggleButtons(theme) {
        document.querySelectorAll('.theme-toggle, [data-theme-toggle]').forEach(btn => {
            btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
            btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        });
    },

    listenForSystemChanges() {
        if (!window.matchMedia) return;
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
            if (!this.getSavedTheme()) {
                this.applyTheme(e.matches ? 'light' : 'dark');
            }
        });
    }
};

// Init on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
} else {
    ThemeManager.init();
}

// Prevent flash of wrong theme (runs immediately)
(function() {
    const KEY = '6e-virtual-theme';
    let theme = 'dark';
    try {
        const saved = localStorage.getItem(KEY);
        if (saved) { theme = saved; }
        else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) { theme = 'light'; }
    } catch (e) {}
    document.documentElement.setAttribute('data-theme', theme);
})();

window.ThemeManager = ThemeManager;
