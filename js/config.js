/* ============================================
   6E Virtual - Configuration
   ============================================
   
   SECURE ARCHITECTURE:
   All API calls go through the backend proxy.
   Frontend → Backend Proxy → vAMSYS API
   
   NO TOKENS ARE STORED IN THIS FILE.
   ============================================ */

const CONFIG = {
    /* ==========================================
       API Configuration
       ==========================================
       TODO: Replace with your actual backend proxy URL
    */
    api: {
        // Backend proxy URL
        // TODO: Set your Cloudflare Worker / backend proxy URL
        baseUrl: 'https://YOUR-API-PROXY.workers.dev',
        
        // Refresh interval (ms) - 30 seconds
        refreshInterval: 30000,
        
        // Request timeout (ms)
        timeout: 10000
    },

    // Map Configuration
    map: {
        center: [20.5937, 78.9629], // India center
        zoom: 5,
        tileUrl: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        maxZoom: 19
    },

    // Brand Colors
    colors: {
        primary: '#1A1A8E',
        primaryBright: '#2B2DB8',
        secondary: '#E8B931',
        success: '#22C55E',
        info: '#3B82F6',
        warning: '#F59E0B'
    },

    /* ==========================================
       Flight Phase Mapping
       ==========================================
       vAMSYS numeric phase codes → human labels
    */
    flightPhases: {
        0: { name: 'Preflight', status: 'preflight', color: '#8B5CF6' },
        1: { name: 'Pushback', status: 'pushback', color: '#6B7280' },
        2: { name: 'Taxi Out', status: 'taxi', color: '#F59E0B' },
        3: { name: 'Takeoff', status: 'takeoff', color: '#22C55E' },
        4: { name: 'Climb', status: 'climb', color: '#22C55E' },
        5: { name: 'Cruise', status: 'cruise', color: '#3B82F6' },
        6: { name: 'Descent', status: 'descent', color: '#F97316' },
        7: { name: 'Approach', status: 'approach', color: '#F97316' },
        8: { name: 'Landing', status: 'landing', color: '#EF4444' },
        9: { name: 'Taxi In', status: 'taxi', color: '#F59E0B' },
        10: { name: 'Arrived', status: 'arrived', color: '#10B981' }
    }
};


/* ==========================================
   Helper Functions
   ==========================================
*/

function getPhaseInfo(phase) {
    return CONFIG.flightPhases[phase] || {
        name: 'Unknown',
        status: 'unknown',
        color: '#6B7280'
    };
}

function transformFlightData(flight) {
    if (!flight) {
        console.warn('transformFlightData: received null/undefined flight');
        return null;
    }

    const phaseInfo = getPhaseInfo(flight.phase);

    const booking = flight.booking || {};
    const pilot = flight.pilot || {};
    const aircraft = flight.aircraft || {};
    const departureAirport = flight.departureAirport || {};
    const arrivalAirport = flight.arrivalAirport || {};
    const progress = flight.progress || {};

    return {
        id: flight.bookingId,
        callsign: booking.callsign || 'N/A',
        flightNumber: booking.flightNumber || 'N/A',
        pilot: {
            username: pilot.username || 'Unknown',
            rank: pilot.rank?.abbreviation || ''
        },
        aircraft: {
            name: aircraft.name || 'Unknown Aircraft',
            type: aircraft.type || 'N/A',
            registration: aircraft.registration || 'N/A'
        },
        departure: {
            icao: departureAirport.icao || '----',
            iata: departureAirport.iata || '---',
            name: departureAirport.name || 'Unknown',
            position: [departureAirport.lat, departureAirport.lon]
        },
        arrival: {
            icao: arrivalAirport.icao || '----',
            iata: arrivalAirport.iata || '---',
            name: arrivalAirport.name || 'Unknown',
            position: [arrivalAirport.lat, arrivalAirport.lon]
        },
        position: [
            progress.latitude || progress.location?.lat,
            progress.longitude || progress.location?.lon
        ],
        heading: progress.magneticHeading || 0,
        altitude: progress.altitude || 0,
        groundspeed: progress.groundSpeed || 0,
        phase: phaseInfo,
        network: booking.network || 'OFFLINE',
        distanceRemaining: progress.distanceRemaining || 0,
        timeRemaining: progress.timeRemaining || 0
    };
}

function isValidApiResponse(response) {
    if (!response) return false;
    if (response.data && Array.isArray(response.data)) return true;
    if (Array.isArray(response)) return true;
    return false;
}

function extractFlightData(response) {
    if (!response) return [];
    if (response.data && Array.isArray(response.data)) return response.data;
    if (Array.isArray(response)) return response;
    console.warn('extractFlightData: unexpected response format', response);
    return [];
}
