import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [meds, setMeds] = useState([]);

  useEffect(() => { fetchMeds(); }, []);
  const fetchMeds = async () => {
    const res = await axios.get(`${API_URL}/medications`);
    setMeds(res.data);
  };

  const handleAction = async (id, action) => {
    try {
      if (action === 'take') await axios.patch(`${API_URL}/medications/${id}/take`);
      if (action === 'delete') await axios.delete(`${API_URL}/medications/${id}`);
      fetchMeds();
    } catch (err) { alert(err.response?.data?.message || "Action failed"); }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <header className="mb-12">
        <h1 className="text-6xl font-extrabold tracking-tight mb-4 text-[#1D1D1F]">Schedule</h1>
        <p className="text-2xl text-gray-400 font-medium">Your daily doses, prioritized.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence>
          {meds.map((med) => (
            <motion.div
              layout
              key={med._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-bold mb-2">{med.name}</h3>
                  <p className="text-lg text-gray-500">{med.dosage || 'Standard dose'} • {med.frequency}x Daily</p>
                </div>
                <button 
                  onClick={() => handleAction(med._id, 'delete')}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              <div className="flex items-center gap-4">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAction(med._id, 'take')}
                  disabled={med.stock <= 0}
                  className="flex-1 h-14 bg-[#0071E3] text-white rounded-2xl font-bold text-lg hover:bg-[#0077ED] transition-colors disabled:bg-gray-200 disabled:text-gray-400"
                >
                  {med.stock > 0 ? 'Mark Taken' : 'Refill Required'}
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="px-8 h-14 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Skip
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
export default Dashboard;