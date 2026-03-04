import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Send } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useState } from 'react';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, clearCart } = useCartStore();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      products: items.map((i) => i.name).join(', '),
    };

    try {
      await fetch('https://formspree.io/f/mrgvoyab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        clearCart();
        toggleCart();
      }, 3000);
    } catch (err) {
      setStatus('idle');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-900 z-[70] shadow-2xl flex flex-col border-l border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Zapytanie ofertowe
              </h2>
              <button
                onClick={toggleCart}
                className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                  <p>Brak produktów na liście zapytania.</p>
                </div>
              ) : (
                <div className="space-y-4 mb-8">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain mix-blend-multiply dark:mix-blend-normal bg-white dark:bg-gray-700 rounded-lg p-1"
                        onError={(e) =>
                          (e.currentTarget.src =
                            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80')
                        }
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2">
                          {item.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {items.length > 0 && status !== 'success' && (
                <form onSubmit={handleSend} className="space-y-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Dane kontaktowe</h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Imię i nazwisko"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Adres E-mail"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                  <textarea
                    name="message"
                    placeholder="Dodatkowe uwagi (opcjonalnie)"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center transition-colors"
                  >
                    {status === 'sending' ? (
                      'Wysyłanie...'
                    ) : (
                      <>
                        <Send size={18} className="mr-2" /> Wyślij zapytanie
                      </>
                    )}
                  </button>
                </form>
              )}

              {status === 'success' && (
                <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-6 rounded-xl text-center border border-green-100 dark:border-green-800">
                  <h3 className="font-bold text-lg mb-2">Zapytanie wysłane!</h3>
                  <p>Dziękujemy. Skontaktujemy się z Tobą najszybciej jak to możliwe.</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
