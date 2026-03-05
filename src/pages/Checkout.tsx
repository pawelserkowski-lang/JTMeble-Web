import { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { useCartStore } from '../store/useCartStore';
import { useUserStore } from '../store/useUserStore';
import { ArrowLeft, CheckCircle, Truck, Building2, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const { user, addOrder, isLoggedIn } = useUserStore();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [deliveryCost, setDeliveryCost] = useState(200);

  const totalNetto = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const vat = totalNetto * 0.23;
  const deliveryVat = deliveryCost * 0.23;
  const totalBrutto = totalNetto + vat + deliveryCost + deliveryVat;

  // Symulacja wysyłki
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Zbieranie danych z formularza
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const billingData = {
      nip: formData.get('nip') as string,
      companyName: formData.get('companyName') as string,
      address: formData.get('address') as string,
      zipCode: formData.get('zipCode') as string,
      city: formData.get('city') as string,
      name: formData.get('contactName') as string,
      phone: formData.get('phone') as string,
    };
    
    setTimeout(() => {
      if (isLoggedIn) {
        addOrder({
          id: `ZAM-${Math.floor(Math.random() * 10000)}/${new Date().getFullYear()}`,
          date: new Date().toLocaleDateString('pl-PL'),
          items: [...items],
          totalNetto,
          totalBrutto,
          status: 'Oczekujące',
          billingData,
          deliveryMethod: 'Transport własny producenta',
          paymentMethod: 'Faktura Proforma'
        });
      }
      setStatus('success');
      clearCart();
    }, 2000);
  };

  if (status === 'success') {
    return (
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center pt-20 bg-gray-50 dark:bg-gray-950">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 text-center max-w-lg">
            <CheckCircle className="text-green-500 w-20 h-20 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Zamówienie przyjęte!</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Dziękujemy za złożenie zamówienia. Na podany adres e-mail przesłaliśmy fakturę proforma. Realizacja zamówienia rozpocznie się po zaksięgowaniu wpłaty.
            </p>
            <Link to="/" className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
              Wróć do sklepu
            </Link>
          </motion.div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>Kasa (B2B) - JT Mebel</title>
      </Helmet>
      <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/katalog" className="p-2 bg-white dark:bg-gray-900 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800">
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Realizacja zamówienia (B2B)</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Krok 1: Dane firmy */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold">1</div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Building2 size={24} /> Dane instytucji / firmy
                  </h2>
                </div>
                
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">NIP</label>
                      <input type="text" name="nip" required defaultValue={user?.nip || ''} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" placeholder="np. 5891962096" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nazwa placówki / firmy</label>
                      <input type="text" name="companyName" required defaultValue={user?.companyName || ''} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ulica i numer</label>
                    <input type="text" name="address" required defaultValue={user?.address || ''} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kod pocztowy</label>
                      <input type="text" name="zipCode" required defaultValue={user?.zipCode || ''} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Miejscowość</label>
                      <input type="text" name="city" required defaultValue={user?.city || ''} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Osoba kontaktowa</label>
                      <input type="text" name="contactName" required defaultValue={user?.name || ''} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefon kontaktowy</label>
                      <input type="tel" name="phone" required defaultValue={user?.phone || ''} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" />
                    </div>
                  </div>
                </form>
              </div>

              {/* Krok 2: Dostawa i Płatność */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold">2</div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Truck size={24} /> Opcje logistyczne
                  </h2>
                </div>
                
                <div className="space-y-4 mb-8">
                  <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${deliveryCost === 200 ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="delivery" value="Transport własny / Kurier" checked={deliveryCost === 200} onChange={() => setDeliveryCost(200)} className="w-5 h-5 text-blue-600" />
                      <div>
                        <span className="block font-semibold text-gray-900 dark:text-white">Transport własny producenta / Kurier</span>
                        <span className="text-sm text-gray-500">Bezpieczny przewóz do 28 dni. Sztywna kwota niezależnie od wielkości.</span>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">200,00 zł netto</span>
                  </label>
                  
                  <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${deliveryCost === 0 ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="delivery" value="Odbiór osobisty" checked={deliveryCost === 0} onChange={() => setDeliveryCost(0)} className="w-5 h-5 text-blue-600" />
                      <div>
                        <span className="block font-semibold text-gray-900 dark:text-white">Odbiór osobisty</span>
                        <span className="text-sm text-gray-500">Odbiór w siedzibie firmy w Kartuzach (ul. Gdańska 45)</span>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">0,00 zł netto</span>
                  </label>
                </div>

                <div className="flex items-center gap-3 mb-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <CreditCard size={24} /> Płatność
                  </h2>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-300 rounded-xl cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" value="Faktura Proforma (Przedpłata)" defaultChecked className="w-5 h-5 text-blue-600" />
                      <div>
                        <span className="block font-semibold text-gray-900 dark:text-white">Faktura Proforma (Przedpłata)</span>
                        <span className="text-sm text-gray-500">Przelew bankowy z odroczonym startem realizacji (rekomendowane dla placówek).</span>
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-300 rounded-xl cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" value="Przelewy24 / BLIK / Karta" className="w-5 h-5 text-blue-600" />
                      <div>
                        <span className="block font-semibold text-gray-900 dark:text-white">Przelewy24 / BLIK / PayPo</span>
                        <span className="text-sm text-gray-500">Szybka bramka płatności (obsługuje karty, BLIK i płatności ratalne).</span>
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-300 rounded-xl cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" value="Przelew tradycyjny" className="w-5 h-5 text-blue-600" />
                      <div>
                        <span className="block font-semibold text-gray-900 dark:text-white">Przelew tradycyjny (BS Sierakowice)</span>
                        <span className="text-sm text-gray-500">Zwykła wpłata na oficjalny rachunek bankowy spółki.</span>
                      </div>
                    </div>
                  </label>
                </div>

              </div>

            </div>

            {/* Koszyk / Podsumowanie */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sticky top-28">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Podsumowanie</h3>
                
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3 items-start border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-gray-50 dark:bg-gray-800 rounded-lg p-1" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.quantity} szt. x {item.price ? `${item.price.toFixed(2)} PLN` : 'Wycena'}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Suma częściowa (netto)</span>
                    <span className="font-semibold">{totalNetto.toFixed(2)} PLN</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Koszt dostawy (netto)</span>
                    <span className="font-semibold">{deliveryCost.toFixed(2)} PLN</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Podatek VAT (23%)</span>
                    <span className="font-semibold">{(vat + deliveryVat).toFixed(2)} PLN</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800 mt-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Do zapłaty (brutto)</span>
                    <span className="text-2xl font-bold text-blue-600">{totalBrutto.toFixed(2)} PLN</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  form="checkout-form"
                  disabled={status === 'submitting' || items.length === 0}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl flex items-center justify-center transition-colors"
                >
                  {status === 'submitting' ? 'Przetwarzanie...' : 'Zamawiam i Płacę'}
                </button>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Złożenie zamówienia wiąże się z obowiązkiem zapłaty zgodnie z regulaminem sklepu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}