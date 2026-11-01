import { useState } from 'react';
import ContinentalChart from './components/ContinentalChart';
import MalariaMap from './components/MalariaMap';

export default function App() {
  const [activeView, setActiveView] = useState('map');

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>MalariaScope: Global Dashboard</h1>
      
      {/* Main Navigation */}
      <div style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveView('map')}
          style={{ padding: '10px 20px', marginRight: '10px', fontSize: '16px', backgroundColor: activeView === 'map' ? '#3498db' : '#eee', color: activeView === 'map' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🗺️ Interactive Map
        </button>
        <button 
          onClick={() => setActiveView('chart')}
          style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: activeView === 'chart' ? '#3498db' : '#eee', color: activeView === 'chart' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          📊 Continental Data
        </button>
      </div>

      {/* Render the selected view */}
      {activeView === 'map' && <MalariaMap />}
      {activeView === 'chart' && <ContinentalChart />}
      
      {/* Small context note */}
      <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        *Note: Map uses CircleMarkers to indicate case severity. Dot size and color intensity scale with case numbers. Click a dot to see exact numbers.
      </p>
    </div>
  );
}