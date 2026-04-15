/* ============================================
   6E Virtual - Flight Map Module
   
   STATUS: COMMENTED OUT
   Enable when vAMSYS backend proxy is configured.
   
   Uses the same secure architecture:
   Frontend → Backend Proxy → vAMSYS API
   ============================================ */

/*
const FlightMap = {
    map: null,
    tileLayer: null,
    markers: {},
    routeLines: {},
    flights: [],
    selectedFlightId: null,
    refreshTimer: null,

    init() {
        const mapEl = document.getElementById('flight-map');
        if (!mapEl) return;

        this.map = L.map('flight-map', {
            center: CONFIG.map.center,
            zoom: CONFIG.map.zoom,
            zoomControl: true,
            attributionControl: true
        });

        const theme = ThemeManager ? ThemeManager.getCurrentTheme() : 'dark';
        const tileUrl = ThemeManager ? ThemeManager.getTileUrl() : CONFIG.map.tileUrl;

        this.tileLayer = L.tileLayer(tileUrl, {
            attribution: '&copy; OpenStreetMap &copy; CARTO',
            maxZoom: CONFIG.map.maxZoom
        }).addTo(this.map);

        // Register with ThemeManager for tile switching
        if (ThemeManager) {
            ThemeManager.registerMap(this.map, this.tileLayer);
        }

        this.loadFlights();
        this.startAutoRefresh();
    },

    async loadFlights() {
        try {
            const response = await fetch(CONFIG.api.baseUrl + '/api/vamsys/flight-map', {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
                signal: AbortSignal.timeout(CONFIG.api.timeout)
            });

            if (!response.ok) throw new Error(`API Error: ${response.status}`);

            const result = await response.json();
            const rawFlights = extractFlightData(result);

            this.flights = rawFlights
                .map(f => transformFlightData(f))
                .filter(f => f && f.position[0] && f.position[1]);

            this.updateMap();
            this.updateFlightList();
            this.updateFlightCount();
        } catch (error) {
            console.error('Failed to load flights:', error);
        }
    },

    updateMap() {
        // Clear old markers
        Object.values(this.markers).forEach(m => this.map.removeLayer(m));
        Object.values(this.routeLines).forEach(l => this.map.removeLayer(l));
        this.markers = {};
        this.routeLines = {};

        this.flights.forEach(flight => {
            const icon = L.divIcon({
                html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${flight.phase.color}" style="transform: rotate(${flight.heading}deg)">
                    <path d="M12 2L8 10H2L6 14L4 22L12 18L20 22L18 14L22 10H16L12 2Z"/>
                </svg>`,
                className: 'custom-plane-icon',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });

            const marker = L.marker(flight.position, { icon })
                .addTo(this.map)
                .bindPopup(this.createPopupContent(flight));

            this.markers[flight.id] = marker;

            // Draw route line
            if (flight.departure.position[0] && flight.arrival.position[0]) {
                const line = L.polyline(
                    [flight.departure.position, flight.position, flight.arrival.position],
                    { color: flight.phase.color, weight: 1.5, opacity: 0.4, dashArray: '5, 10' }
                ).addTo(this.map);
                this.routeLines[flight.id] = line;
            }
        });
    },

    createPopupContent(flight) {
        return `
            <div style="padding: 8px; min-width: 200px;">
                <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 4px;">${flight.callsign}</div>
                <div style="color: #999; font-size: 0.85rem; margin-bottom: 8px;">${flight.departure.icao} → ${flight.arrival.icao}</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 0.8rem;">
                    <span style="color: #666;">Altitude</span><span>${flight.altitude.toLocaleString()} ft</span>
                    <span style="color: #666;">Speed</span><span>${flight.groundspeed} kts</span>
                    <span style="color: #666;">Phase</span><span style="color: ${flight.phase.color}">${flight.phase.name}</span>
                    <span style="color: #666;">Pilot</span><span>${flight.pilot.username}</span>
                    <span style="color: #666;">Aircraft</span><span>${flight.aircraft.name}</span>
                </div>
            </div>
        `;
    },

    updateFlightList() {
        const listEl = document.getElementById('flight-list');
        if (!listEl) return;

        if (this.flights.length === 0) {
            listEl.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--text-muted);">No active flights</div>';
            return;
        }

        listEl.innerHTML = this.flights.map(f => `
            <div class="flight-card ${this.selectedFlightId === f.id ? 'selected' : ''}" data-booking-id="${f.id}">
                <div class="flight-icon">
                    <svg viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
                </div>
                <div class="flight-info">
                    <div class="flight-number">${f.callsign}</div>
                    <div class="flight-route">${f.departure.icao} → ${f.arrival.icao}</div>
                </div>
                <span class="flight-status status-${f.phase.status}">${f.phase.name}</span>
            </div>
        `).join('');
    },

    updateFlightCount() {
        const countEl = document.getElementById('flight-count');
        if (countEl) countEl.textContent = this.flights.length;
        const sidebarCount = document.getElementById('sidebar-flight-count');
        if (sidebarCount) sidebarCount.textContent = this.flights.length;
    },

    focusFlight(bookingId) {
        const flight = this.flights.find(f => f.id === bookingId);
        if (!flight) return;

        this.selectedFlightId = bookingId;
        this.map.setView(flight.position, 8, { animate: true });

        const marker = this.markers[bookingId];
        if (marker) marker.openPopup();

        this.updateFlightList();
    },

    startAutoRefresh() {
        if (this.refreshTimer) clearInterval(this.refreshTimer);
        this.refreshTimer = setInterval(() => this.loadFlights(), CONFIG.api.refreshInterval);
    }
};
*/
