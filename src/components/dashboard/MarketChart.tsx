
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Données simulées pour les variations de prix d'actifs régionaux
const marketData = [
  { time: '09:00', or: 45000, petrole: 82, cacao: 2800, cafe: 1200 },
  { time: '10:00', or: 45200, petrole: 83, cacao: 2850, cafe: 1220 },
  { time: '11:00', or: 44800, petrole: 81, cacao: 2780, cafe: 1180 },
  { time: '12:00', or: 45400, petrole: 84, cacao: 2900, cafe: 1240 },
  { time: '13:00', or: 45600, petrole: 85, cacao: 2920, cafe: 1260 },
  { time: '14:00', or: 45300, petrole: 83, cacao: 2880, cafe: 1230 },
  { time: '15:00', or: 45800, petrole: 86, cacao: 2950, cafe: 1280 },
  { time: '16:00', or: 46000, petrole: 87, cacao: 2980, cafe: 1300 },
];

const MarketChart = () => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={marketData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="time" 
            stroke="#64748b"
            fontSize={12}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '0.75rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}
            labelStyle={{ color: '#475569' }}
          />
          <Line 
            type="monotone" 
            dataKey="or" 
            stroke="#475569" 
            strokeWidth={2}
            dot={{ fill: '#475569', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#475569', strokeWidth: 2 }}
            name="Or (FCFA/oz)"
          />
          <Line 
            type="monotone" 
            dataKey="petrole" 
            stroke="#64748b" 
            strokeWidth={2}
            dot={{ fill: '#64748b', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#64748b', strokeWidth: 2 }}
            name="Pétrole ($/baril)"
          />
          <Line 
            type="monotone" 
            dataKey="cacao" 
            stroke="#334155" 
            strokeWidth={2}
            dot={{ fill: '#334155', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#334155', strokeWidth: 2 }}
            name="Cacao (FCFA/tonne)"
          />
          <Line 
            type="monotone" 
            dataKey="cafe" 
            stroke="#94a3b8" 
            strokeWidth={2}
            dot={{ fill: '#94a3b8', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#94a3b8', strokeWidth: 2 }}
            name="Café (FCFA/kg)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;
