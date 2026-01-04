import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast'; //
import Dashboard from './pages/Dashboard';
import AddMedication from './pages/AddMedication';
import Inventory from './pages/Inventory';
import EditMedication from './pages/EditMedication';

const NavLink = ({ to, label }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link to={to} className="relative px-4 py-2 text-sm font-medium transition-colors">
      <span className={active ? 'text-black' : 'text-gray-400 hover:text-black'}>{label}</span>
      {active && (
        <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
      )}
    </Link>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/add" element={<AddMedication />} />
        <Route path="/edit/:id" element={<EditMedication />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] antialiased">
        {/* Global Notification Container */}
        <Toaster position="top-center" reverseOrder={false} /> 
        
        <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50">
          <div className="max-w-[1200px] mx-auto px-8 h-16 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-500">Healta</Link>
            <div className="flex gap-4">
              <NavLink to="/" label="Daily Schedule" />
              <NavLink to="/inventory" label="Stock & Refill" />
              <NavLink to="/add" label="Add Medication" />
            </div>
          </div>
        </nav>
        <main className="max-w-[1200px] mx-auto px-8 py-12 text-center">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;