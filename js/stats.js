/* ============================================
   6E Virtual - Statistics Loader
   vAMSYS API Integration
   
   STATUS: COMMENTED OUT
   Enable when vAMSYS backend proxy is configured.
   ============================================ */

/*
const StatsLoader = {
    apiUrl: CONFIG.api.baseUrl + '/api/vamsys/statistics/general',
    _initialized: false,
    _refreshInterval: null,

    async init() {
        if (this._initialized) return;
        this._initialized = true;

        await this.loadStatistics();

        if (this._refreshInterval) clearInterval(this._refreshInterval);
        this._refreshInterval = setInterval(() => this.loadStatistics(), 5 * 60 * 1000);
    },

    async loadStatistics() {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) throw new Error(`API Error: ${response.status}`);

            const result = await response.json();
            const data = result.data || result;

            if (!data || Object.keys(data).length === 0) {
                console.warn('Statistics API returned empty data');
                this.showEmptyState();
                return;
            }

            this.updateUI(data);
        } catch (error) {
            console.error('Failed to load statistics:', error);
            this.showErrorState();
        }
    },

    updateUI(data) {
        const formatNumber = (num) => {
            if (num === undefined || num === null) return '--';
            return num.toLocaleString();
        };

        const formatHours = (seconds) => {
            if (!seconds) return '--';
            return formatNumber(Math.floor(seconds / 3600));
        };

        const totalFlights = data.pireps?.total ?? data.total_flights ?? null;
        const flightSeconds = data.flightTime?.seconds ?? data.flight_time_seconds ?? null;
        const activePilots = data.pilots?.current ?? data.active_pilots ?? null;
        const avgLandingRate = data.pireps?.averageLandingRate ?? data.average_landing_rate ?? null;
        const passengers = data.transport?.passengers ?? data.total_passengers ?? null;
        const distanceFlown = data.transport?.distanceFlown ?? data.total_distance ?? null;
        const fuelUsed = data.transport?.fuelUsed ?? data.total_fuel ?? null;
        const cargo = data.transport?.cargo ?? data.total_cargo ?? null;
        const acceptedPireps = data.pireps?.accepted ?? data.accepted_pireps ?? null;

        this.setElement('stat-total-flights', formatNumber(totalFlights));
        this.setElement('stat-flight-hours', formatHours(flightSeconds));
        this.setElement('stat-active-pilots', formatNumber(activePilots));
        this.setElement('stat-landing-rate', avgLandingRate ? Math.round(avgLandingRate).toLocaleString() : '--');
        this.setElement('stat-passengers', formatNumber(passengers));
        this.setElement('stat-pireps', formatNumber(acceptedPireps));
        this.setElement('stat-distance', formatNumber(distanceFlown));
        this.setElement('stat-fuel', formatNumber(fuelUsed));
        this.setElement('stat-cargo', formatNumber(cargo));
    },

    showEmptyState() {
        ['stat-total-flights', 'stat-flight-hours', 'stat-active-pilots',
         'stat-landing-rate', 'stat-passengers', 'stat-pireps',
         'stat-distance', 'stat-fuel', 'stat-cargo'].forEach(id => this.setElement(id, '--'));
    },

    showErrorState() {
        this.showEmptyState();
    },

    setElement(id, value) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = value;
            el.classList.remove('loading');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    StatsLoader.init();
});
*/
