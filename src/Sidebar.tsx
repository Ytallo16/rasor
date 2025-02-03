import { useState } from 'react';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('cadastro');

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-screen">
        <div className="flex flex-col py-4">
          <button
            onClick={() => toggleTab('cadastro')}
            className={`py-2 px-4 text-left ${activeTab === 'cadastro' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            Cadastro de Objeto
          </button>
          <button
            onClick={() => toggleTab('acompanhamento')}
            className={`py-2 px-4 text-left ${activeTab === 'acompanhamento' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            Acompanhamento de Objeto
          </button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 p-4">
        {activeTab === 'cadastro' && (
          <div>
            <h1 className="text-2xl font-semibold text-center">Cadastro de Objeto</h1>
            {/* Adicione o formulário ou o conteúdo relevante aqui */}
          </div>
        )}
        {activeTab === 'acompanhamento' && (
          <div>
            <h1 className="text-2xl font-semibold text-center">Acompanhamento de Objeto</h1>
            {/* Adicione o conteúdo relevante para o acompanhamento aqui */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
