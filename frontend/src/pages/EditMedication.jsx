import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL;

const EditMedication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', dosage: '', frequency: 1, stock: 0 });

  useEffect(() => {
    const fetchMed = async () => {
      try {
        const res = await axios.get(`${API_URL}/medications`);
        const med = res.data.find(m => m._id === id);
        if (med) setForm({ name: med.name, dosage: med.dosage, frequency: med.frequency, stock: med.stock });
      } catch (err) { console.error(err); }
    };
    fetchMed();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/medications/${id}`, {
        ...form,
        frequency: Number(form.frequency),
        stock: Number(form.stock)
      });
      navigate('/');
    } catch (err) { alert("Error updating medication"); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto">
      <h1 className="text-5xl font-bold tracking-tight mb-12 text-center text-[#1D1D1F]">Edit Medication</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-[24px] p-10 shadow-sm space-y-8">
        <div className="space-y-1 text-left">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 block">Name</label>
          <input required className="w-full text-xl py-3 border-b border-gray-200 outline-none focus:border-[#0071E3]" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        </div>
        <div className="space-y-1 text-left">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 block">Dosage (Optional)</label>
          <input className="w-full text-xl py-3 border-b border-gray-200 outline-none focus:border-[#0071E3]" value={form.dosage} onChange={e => setForm({...form, dosage: e.target.value})} />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 block">Frequency</label>
            <input type="number" required className="w-full text-xl py-3 border-b border-gray-200 outline-none focus:border-[#0071E3]" value={form.frequency} onChange={e => setForm({...form, frequency: e.target.value})} />
          </div>
          <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 block">Stock</label>
            <input type="number" required className="w-full text-xl py-3 border-b border-gray-200 outline-none focus:border-[#0071E3]" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
          </div>
        </div>
        <button type="submit" className="w-full bg-[#0071E3] text-white py-4 rounded-full text-xl font-bold hover:bg-[#0077ED] transition-all">Update Medication</button>
      </form>
    </motion.div>
  );
};

export default EditMedication;