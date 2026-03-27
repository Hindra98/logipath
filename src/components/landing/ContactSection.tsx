import { motion } from 'motion/react';
import { useState } from 'react';

export default function ContactSection() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // envoyer à API ou webhook
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-cameroun-green/10">
      <div className="max-w-lg mx-auto">
        <motion.h2
          className="text-3xl font-semibold text-cameroun-green mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Contactez-nous
        </motion.h2>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-cameroun-green"
          />
          <textarea
            placeholder="Votre message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-cameroun-green"
          />
          <button
            type="submit"
            className="w-full bg-cameroun-green text-white py-2 rounded hover:bg-cameroun-green/90 transition"
          >
            Envoyer
          </button>
          {submitted && <p className="text-green-700">Merci ! Nous reviendrons vers vous.</p>}
        </motion.form>
      </div>
    </section>
  );
}
