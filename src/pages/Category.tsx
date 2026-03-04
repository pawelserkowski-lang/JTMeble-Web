import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import catalog from '../data/catalog.json';

export default function Category() {
  const { slug } = useParams();
  const category = catalog.categories.find(c => c.slug === slug);

  if (!category) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <h1 className="text-3xl font-bold">Kategoria nie znaleziona</h1>
        <Link to="/oferta" className="text-orange-500 mt-4 inline-block hover:underline">Wróć do oferty</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/oferta" className="inline-flex items-center text-gray-500 hover:text-orange-500 mb-8 transition-colors">
          <ChevronLeft size={20} className="mr-1" /> Wróć do pełnej oferty
        </Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="h-64 bg-gray-200 relative">
               <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/40"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4 drop-shadow-md">{category.title}</h1>
               </div>
            </div>
            
            <div className="p-8 md:p-12 text-center">
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Przeglądasz zarchiwizowaną kategorię: <strong>{category.title}</strong>. 
                W nowej wersji strony produkty z tej kategorii zostaną wkrótce zaktualizowane o nowe zdjęcia i opisy.
              </p>
              
              <button className="px-8 py-3 bg-gray-900 hover:bg-orange-500 text-white rounded-full font-medium transition-colors shadow-md">
                Zapytaj o produkty z tej kategorii
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
