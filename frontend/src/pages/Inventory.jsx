import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL;

const Inventory = () => {
  const [meds, setMeds] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/medications`).then(res => setMeds(res.data));
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
      <h2 className="text-5xl font-bold tracking-tight mb-12">Inventory Management</h2>
      
      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-3 p-8 bg-gray-50/50 border-b border-gray-100 font-bold text-gray-400 uppercase tracking-widest text-xs">
          <div>Medication</div>
          <div>Quantity Remaining</div>
          <div className="text-right">Safety Status</div>
        </div>
        
        {meds.map(med => (
          <div key={med._id} className="grid grid-cols-3 p-8 items-center border-b border-gray-50 last:border-0 hover:bg-gray-50/30 transition-colors">
            <div className="text-xl font-bold">{med.name}</div>
            <div className="text-xl font-medium text-gray-600 font-mono">{med.stock} doses</div>
            <div className="text-right">
              {med.stock <= 3 ? (
                <span className="px-4 py-2 bg-red-50 text-red-600 rounded-full text-xs font-black uppercase animate-pulse">Low Stock</span>
              ) : (
                <span className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-xs font-black uppercase">Healthy</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
export default Inventory;