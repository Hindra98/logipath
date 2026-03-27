import { motion } from 'motion/react';
import { Link } from 'react-router';

export default function Header() {
  return (
    <motion.header
      className="fixed w-full bg-white/90 backdrop-blur z-30"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link to="/home" className="text-xl font-bold text-cameroun-green">
          LOGIPATH
        </Link>
        <div className="space-x-4">
          <a href="#hero" className="text-cameroun-green hover:underline">
            Accueil
          </a>
          <a href="#benefits" className="text-cameroun-green hover:underline">
            Avantages
          </a>
          <a href="#contact" className="text-cameroun-green hover:underline">
            Contact
          </a>
          <Link to="/user" className="text-cameroun-green hover:underline">
            Dashboard
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
