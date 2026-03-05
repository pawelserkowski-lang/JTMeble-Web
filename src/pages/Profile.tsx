import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import PageWrapper from '../components/PageWrapper';
import { useUserStore } from '../store/useUserStore';
import { LogOut, Package, User as UserIcon, Building, MapPin } from 'lucide-react';

export default function Profile() {
  const { user, isLoggedIn, logout, orders } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <PageWrapper>
      <Helmet>
        <title>Profil B2B - JT Mebel</title>
      </Helmet>
      <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Panel Klienta B2B</h1>
            <button 
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-700 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl transition-colors font-medium"
            >
              <LogOut size={18} className="mr-2" /> Wyloguj się
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Dane konta */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mb-6">
                  <UserIcon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Osoba kontaktowa</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{user.name}</p>
                <p className="text-gray-500 text-sm mt-1">{user.email}</p>
                <p className="text-gray-500 text-sm mt-1">{user.phone}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-full flex items-center justify-center mb-6">
                  <Building size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Dane do faktury / Dostawy</h3>
                <p className="text-gray-900 dark:text-white font-medium">{user.companyName}</p>
                <p className="text-gray-500 text-sm mt-1">NIP: {user.nip}</p>
                <div className="flex items-start mt-4 text-gray-500 text-sm">
                  <MapPin size={16} className="mr-2 mt-0.5" />
                  <div>
                    {user.address}<br/>
                    {user.zipCode} {user.city}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Historia zamówień */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 h-full"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                  <Package size={24} className="text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Historia zamówień</h3>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <Package size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                    <p>Nie masz jeszcze żadnych zamówień w historii.</p>
                    <Link to="/katalog" className="text-blue-600 hover:underline mt-2 inline-block">
                      Przejdź do katalogu i złóż pierwsze zapytanie ofertowe.
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order, idx) => (
                      <div key={idx} className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 transition-colors">
                        <div className="flex justify-between items-center mb-3 border-b border-gray-50 dark:border-gray-800 pb-3">
                          <div>
                            <span className="font-bold text-gray-900 dark:text-white mr-3">Zamówienie #{order.id}</span>
                            <span className="text-sm text-gray-500">{order.date}</span>
                          </div>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'Zakończone' ? 'bg-green-100 text-green-700' :
                            order.status === 'W realizacji' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">Produkty:</p>
                          <ul className="text-sm text-gray-500 space-y-1">
                            {order.items.map((item, i) => (
                              <li key={i} className="line-clamp-1 flex justify-between">
                                <span>{item.quantity}x {item.name}</span>
                                <span>{item.price ? (item.price * (item.quantity || 1)).toFixed(2) + ' PLN' : 'Wycena'}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-50 dark:border-gray-800">
                          <span className="text-sm text-gray-500">Wartość brutto (z dostawą)</span>
                          <span className="font-bold text-gray-900 dark:text-white">{order.totalBrutto.toFixed(2)} PLN</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}