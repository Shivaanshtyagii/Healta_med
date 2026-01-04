import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast'; //

const API_URL = import.meta.env.VITE_API_URL;

const AddMedication = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', dosage: '', frequency: 1, stock: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Saving medication...");
    try {
      const payload = { ...form, frequency: Number(form.frequency), stock: Number(form.stock) };
      await axios.post(`${API_URL}/medications`, payload);
      toast.success(`${form.name} added to schedule!`, { id: loadingToast });
      navigate('/');
    } catch (err) {
      toast.error("Failed to save medication", { id: loadingToast });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto">
      <h1 className="text-5xl font-bold tracking-tight mb-12 text-center text-[#1D1D1F]">New Medication</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-[24px] p-10 shadow-sm space-y-8 text-left">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 block">Name (Required)</label>
          <input required className="w-full text-xl py-3 border-b border-gray-200 outline-none focus:border-[#0071E3]" placeholder="e.g., Paracetamol" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 block">Dosage (Optional)</label>
          <input className="w-full text-xl py-3 border-b border-gray-200 outline-none focus:border-[#0071E3]" placeholder="e.g., 500mg" value={form.dosage} onChange={e => setForm({...form, dosage: e.target.value})} />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 block">Times Per Day</label>
            <input type="number" min="1" required className="w-full text-xl py-3 border-b border-gray-200 outline-none focus:border-[#0071E3]" value={form.frequency} onChange={e => setForm({...form, frequency: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 block">Total Stock</label>
            <input type="number" min="0" required className="w-full text-xl py-3 border-b border-gray-200 outline-none focus:border-[#0071E3]" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
          </div>
        </div>
        <button type="submit" className="w-full bg-[#0071E3] text-white py-4 rounded-full text-xl font-bold hover:bg-[#0077ED] shadow-lg transition-all active:scale-95">Add to Health Story</button>
      </form>
    </motion.div>
  );
};

export default AddMedication;