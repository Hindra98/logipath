import { motion } from 'motion/react';

const benefits = [
  { title: 'Gain de temps', desc: 'Automatisation des tâches répétitives.' },
  { title: 'Zéro erreur', desc: 'Suivi précis et notifications en temps réel.' },
  { title: 'Clients satisfaits', desc: 'Livraisons rapides et transparentes.' },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-cameroun-green mb-8">
          Pourquoi choisir notre solution ?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              className="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <h3 className="text-xl font-bold text-cameroun-green mb-2">
                {b.title}
              </h3>
              <p className="text-cameroun-green/80">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
