import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { Calendar, User } from 'lucide-react';

const posts = [
  { id: 1, title: 'Wdrażamy nowy system mebli modułowych', date: '2026-03-01', author: 'Zespół JTMeble', excerpt: 'Nasza najnowsza kolekcja stawia na elastyczność. Zobacz, jak łatwo dopasować przestrzeń do dynamicznego środowiska biurowego.', image: '/images/product-2.jpg' },
  { id: 2, title: 'Sukces w programie Laboratoria Przyszłości', date: '2026-02-15', author: 'Jan Kowalski', excerpt: 'Kolejne 50 szkół w Polsce otrzymało od nas dedykowane pracownie druku 3D i robotyki. Dziękujemy za zaufanie!', image: '/images/hero-bg-4.jpg' },
  { id: 3, title: 'Jak wybrać idealny fotel ergonomiczny?', date: '2026-01-20', author: 'Anna Nowak', excerpt: 'Ból pleców w pracy to przeszłość. Przygotowaliśmy krótki poradnik o kluczowych cechach dobrego fotela.', image: '/images/hero-bg-5.jpg' },
];

export default function Blog() {
  return (
    <PageWrapper>
      <Helmet>
        <title>Aktualności i Blog - JTMeble</title>
        <meta name="description" content="Najnowsze informacje z życia firmy JTMeble, porady wnętrzarskie i relacje z wdrożeń." />
      </Helmet>
      
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Aktualności</h1>
          <div className="w-24 h-1 bg-blue-600 rounded-full mb-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map(post => (
              <motion.article key={post.id} whileHover={{ y: -5 }} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 gap-4">
                    <span className="flex items-center"><Calendar size={14} className="mr-1" /> {post.date}</span>
                    <span className="flex items-center"><User size={14} className="mr-1" /> {post.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">{post.excerpt}</p>
                  <button className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline mt-auto text-left">Czytaj więcej &rarr;</button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
