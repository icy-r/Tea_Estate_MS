import React from 'react';
import tea from '@assets/product/tea.png';
import bop from '@assets/product/BOP.jpg';
import bp from '@assets/product/BP.jpg';
import bpf from '@assets/product/BPF.jpg';
import dust from '@assets/product/dust.jpg';
import fop from '@assets/product/FOP.jpg';
import golden from '@assets/product/GOLDEN.jpg';
import op from '@assets/product/OP.jpg';
import p from '@assets/product/P.jpeg';

const teas = [
  { name: 'BOP', image: bop },
  { name: 'BP', image: bp },
  { name: 'BPF', image: bpf },
  { name: 'Dust', image: dust },
  { name: 'FOP', image: fop },
  { name: 'Golden', image: golden },
  { name: 'OP', image: op },
  { name: 'P', image: p }
];

const TeaCollection = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Our Tea Collection</h1>
        
        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teas.map((tea, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={tea.image} alt={tea.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{tea.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeaCollection;
