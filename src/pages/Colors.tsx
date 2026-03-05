import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'motion/react';

const boards = [
  { name: 'Biały (K110)', color: '#FFFFFF' },
  { name: 'Kość Słoniowa', color: '#FFFFF0' },
  { name: 'Popiel / Szary Naturalny', color: '#D3D3D3' },
  { name: 'Wiąz Toronto', color: '#A0522D' },
  { name: 'Dąb Sonoma', color: '#D2B48C' },
  { name: 'Buk', color: '#DEB887' },
  { name: 'Klon', color: '#FDF5E6' },
  { name: 'Olcha', color: '#DAA520' },
  { name: 'Czarny (231)', color: '#222222' }
];

const frames = [
  { name: 'Biały (RAL 9003)', color: '#F4F4F4' },
  { name: 'Popielaty (RAL 7035)', color: '#C5C7C4' },
  { name: 'Srebrny (RAL 9006)', color: '#A5A5A5' },
  { name: 'Szary (RAL 7000)', color: '#78858B' },
  { name: 'Czarny mat (RAL 9005)', color: '#0A0A0A' },
  { name: 'Niebieski (RAL 5002)', color: '#20155E' },
  { name: 'Zielony (RAL 6029)', color: '#007243' },
  { name: 'Czerwony (RAL 3002)', color: '#9B111E' },
  { name: 'Żółty (RAL 1007)', color: '#E88C00' },
  { name: 'Pomarańczowy (RAL 2004)', color: '#E73E01' }
];

export default function Colors() {
  const [board, setBoard] = useState(boards[0]);
  const [frame, setFrame] = useState(frames[0]);

  return (
    <PageWrapper>
      <Helmet>
        <title>Konfigurator Kolorów - JTMeble</title>
        <meta name="description" content="Sprawdź dostępne kolory płyt meblowych oraz stelaży. Dopasuj meble JTMeble idealnie do swojego wnętrza." />
        <meta property="og:title" content="Konfigurator Kolorów - JTMeble" />
      </Helmet>
      
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Konfigurator Kolorów</h1>
          <div className="w-24 h-1 bg-blue-600 rounded-full mb-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Wybierz kolor płyty: {board.name}</h3>
                <div className="flex flex-wrap gap-4">
                  {boards.map(b => (
                    <button key={b.name} onClick={() => setBoard(b)} title={b.name} className={`w-12 h-12 rounded-full border-2 shadow-sm transition-transform hover:scale-110 ${board.name === b.name ? 'border-blue-600 scale-110' : 'border-gray-300 dark:border-gray-600'}`} style={{ backgroundColor: b.color }} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Wybierz kolor stelaża: {frame.name}</h3>
                <div className="flex flex-wrap gap-4">
                  {frames.map(f => (
                    <button key={f.name} onClick={() => setFrame(f)} title={f.name} className={`w-12 h-12 rounded-full border-2 shadow-sm transition-transform hover:scale-110 ${frame.name === f.name ? 'border-blue-600 scale-110' : 'border-gray-300 dark:border-gray-600'}`} style={{ backgroundColor: f.color }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold mb-8">Podgląd wizualny</h3>
              <div className="relative w-64 h-64">
                {/* Frame */}
                <motion.div animate={{ backgroundColor: frame.color }} className="absolute bottom-0 left-8 right-8 h-48 rounded-t-lg opacity-80 border-2 border-black/10" />
                {/* Board */}
                <motion.div animate={{ backgroundColor: board.color }} className="absolute top-8 left-0 right-0 h-16 rounded-lg shadow-xl border-b-4 border-black/20" />
              </div>
              <p className="text-sm text-gray-500 mt-8 text-center">* Podgląd ma charakter wyłącznie poglądowy. Rzeczywiste odcienie mogą się nieznacznie różnić.</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
