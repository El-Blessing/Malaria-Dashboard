import { useState, useEffect } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// One source of truth for colors + legend
const LEVELS = [
  { min: 50000, color: '#800026', label: 'High (50k+)' },
  { min: 20000, color: '#E31A1C', label: 'High-Mild (20k-50k)' },
  { min: 10000, color: '#FC4E2A', label: 'Mild (10k-20k)' },
  { min: 5000,  color: '#FD8D3C', label: 'Mild-Small (5k-10k)' },
  { min: 1,     color: '#FEB24C', label: 'Small (0-5k)' },
];

const getColor = (cases) => {
  const level = LEVELS.find(l => cases >= l.min);
  return level ? level.color : '#ffffff';
};

const GEO_URLS = [
  '/countries.geo.json',
  'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json',
];

async function loadGeoJson() {
  for (const url of GEO_URLS) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch { /* try next */ }
  }
  throw new Error('Could not load countries.geo.json');
}

export default function MalariaMap() {
  const [geoData, setGeoData] = useState(null);
  const [malariaByIso, setMalariaByIso] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      loadGeoJson(),
      fetch('/malariaData.json').then(r => r.json()),
    ])
      .then(([geoJson, data]) => {
        const lookup = {};
        data.mapData.forEach(d => { lookup[d.iso] = d; });
        setGeoData(geoJson);
        setMalariaByIso(lookup);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const countryStyle = (feature) => {
    const d = malariaByIso[feature.id]; // feature.id = ISO3 code
    if (d) {
      return {
        fillColor: getColor(d.cases),
        fillOpacity: 0.9,
        color: '#555',
        weight: 1,
      };
    }
    return {
      fillColor: '#ffffff',
      fillOpacity: 1,
      color: '#bbb',
      weight: 0.8,
    };
  };

  const onEachCountry = (feature, layer) => {
    const d = malariaByIso[feature.id];
    const name = feature.properties.name;

    layer.bindPopup(
      d
        ? `<b>${name}</b><br/>Cases: ${d.cases.toLocaleString()}`
        : `<b>${name}</b><br/>No data / eradicated`
    );

    layer.on({
      mouseover: (e) => e.target.setStyle({ weight: 2.5, color: '#000' }),
      mouseout: (e) => e.target.setStyle(countryStyle(feature)),
    });
  };

  if (loading) return <h2 style={{ padding: 20 }}>Loading map data...</h2>;
  if (error) return <h2 style={{ padding: 20, color: 'crimson' }}>Map failed to load: {error}</h2>;

  return (
    <div style={{ height: 600, width: '100%', marginTop: 20, borderRadius: 8, overflow: 'hidden', position: 'relative', border: '1px solid #ddd', background: '#fff' }}>

      {/* Legend */}
      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 1000, background: '#fff', padding: 15, borderRadius: 5, boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: 14 }}>Malaria Severity</h4>
        {LEVELS.map(l => (
          <div key={l.label} style={{ fontSize: 12, marginBottom: 4, display: 'flex', alignItems: 'center' }}>
            <span style={{ width: 15, height: 15, background: l.color, marginRight: 6, display: 'inline-block' }} />
            {l.label}
          </div>
        ))}
        <div style={{ fontSize: 12, display: 'flex', alignItems: 'center' }}>
          <span style={{ width: 15, height: 15, background: '#fff', border: '1px solid #bbb', marginRight: 6, display: 'inline-block', boxSizing: 'border-box' }} />
          No Data / Eradicated
        </div>
      </div>

      {/* No TileLayer = pure white background */}
      <MapContainer
        center={[15, 20]}
        zoom={2}
        minZoom={2}
        maxBounds={[[-85, -180], [85, 180]]}
        style={{ height: '100%', width: '100%', background: '#ffffff' }}
      >
        <GeoJSON
          key="malaria-layer"
          data={geoData}
          style={countryStyle}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
    </div>
  );
}