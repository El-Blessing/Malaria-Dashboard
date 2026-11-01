import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ContinentalChart() {
  const [continentData, setContinentData] = useState({});
  const [selectedContinent, setSelectedContinent] = useState('Africa');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the external JSON file
    fetch('/malariaData.json')
      .then((res) => res.json())
      .then((data) => {
        setContinentData(data.continentData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching chart data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{ padding: '20px' }}>Loading chart data...</h2>;
  if (!continentData[selectedContinent]) return null;

  const currentData = continentData[selectedContinent];
  const isEradicated = currentData.status === 'Eradicated';

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0', flexWrap: 'wrap' }}>
        {Object.keys(continentData).map((continent) => (
          <button key={continent} onClick={() => setSelectedContinent(continent)}
            style={{ padding: '10px 15px', backgroundColor: selectedContinent === continent ? '#2c3e50' : '#eee', color: selectedContinent === continent ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            {continent}
          </button>
        ))}
      </div>

      <div style={{ padding: '15px', backgroundColor: isEradicated ? '#d4edda' : '#f8d7da', color: isEradicated ? '#155724' : '#721c24', borderRadius: '5px', marginBottom: '20px', fontWeight: 'bold' }}>
        Status in {selectedContinent}: {currentData.status}
      </div>

      <div style={{ width: '100%', height: 400, backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        {isEradicated ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
            <h2 style={{ color: '#155724' }}>🎉 Malaria has been eradicated here!</h2>
            <p>Countries included: {currentData.countries.map(c => c.name).join(', ')}</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData.countries} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Cases (Thousands)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => `${value}k cases`} />
              <Bar dataKey="cases" name="Annual Cases" fill="#e74c3c">
                {currentData.countries.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#c0392b' : '#e74c3c'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}