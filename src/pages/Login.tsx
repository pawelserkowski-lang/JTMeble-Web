import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import PageWrapper from '../components/PageWrapper';
import { useUserStore } from '../store/useUserStore';
import { LogIn, UserPlus } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const login = useUserStore(state => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Symulacja logowania/rejestracji dla celów demonstracyjnych
    login({
      email,
      name: 'Jan Kowalski',
      companyName: 'Szkoła Podstawowa nr 1',
      nip: '1234567890',
      address: 'ul. Szkolna 1',
      zipCode: '00-001',
      city: 'Warszawa',
      phone: '123 456 789'
    });
    navigate('/profil');
  };

  return (
    <PageWrapper>
      <Helmet>
        <title>{isRegistering ? 'Rejestracja' : 'Logowanie'} (B2B) - JT Mebel</title>
      </Helmet>
      <div className="pt-32 pb-16 min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              {isRegistering ? <UserPlus size={32} /> : <LogIn size={32} />}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isRegistering ? 'Załóż konto B2B' : 'Zaloguj się do panelu B2B'}
            </h1>
            <p className="text-gray-500 mt-2">Dostęp do historii zamówień i szybkich wycen</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-mail</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hasło</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" 
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors mt-6"
            >
              {isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {isRegistering ? 'Masz już konto?' : 'Nie masz konta?'}
            <button 
              onClick={() => setIsRegistering(!isRegistering)} 
              className="ml-2 text-blue-600 font-semibold hover:underline"
            >
              {isRegistering ? 'Zaloguj się' : 'Zarejestruj się'}
            </button>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}