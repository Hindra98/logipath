import { motion } from 'motion/react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-cameroun-green/10"
    >
      <motion.div
        className="text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-cameroun-green">
          Automatisez votre logistique au Cameroun avec l'IA
        </h1>
        <p className="mt-4 text-lg text-cameroun-green/80">
          Un système intelligent pour suivre et livrer vos colis sans effort.
        </p>
      </motion.div>
    </section>
  );
}
