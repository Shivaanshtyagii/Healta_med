import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const AddMedication = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', dosage: '', frequency: 1, stock: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/medications`, form);
    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-5xl font-bold tracking-tight mb-12 text-center">New Medication</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-[24px] p-10 shadow-sm space-y-8">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Name</label>
          <input 
            required
            className="w-full text-xl py-3 border-b border-gray-200 focus:border-[#0071E3] outline-none transition-colors"
            placeholder="What is the medicine called?"
            onChange={e => setForm({...form, name: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Frequency</label>
            <input 
              type="number" min="1" required
              className="w-full text-xl py-3 border-b border-gray-200 focus:border-[#0071E3] outline-none transition-colors"
              value={form.frequency}
              onChange={e => setForm({...form, frequency: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Total Stock</label>
            <input 
              type="number" min="0" required
              className="w-full text-xl py-3 border-b border-gray-200 focus:border-[#0071E3] outline-none transition-colors"
              placeholder="e.g., 30"
              onChange={e => setForm({...form, stock: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#0071E3] text-white py-4 rounded-full text-xl font-bold hover:bg-[#0077ED] shadow-lg shadow-blue-100 transition-all active:scale-95"
        >
          Add to Health Story
        </button>
      </form>
    </div>
  );
};
export default AddMedication;