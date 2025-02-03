import { useState } from 'react';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('cadastro');

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="bg-gray-800 text-white flex justify-around py-2">
        <button 
          onClick={() => toggleTab('cadastro')}
          className={`py-2 px-4 ${activeTab === 'cadastro' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
        >
          Cadastro de Objeto
        </button>
        <button 
          onClick={() => toggleTab('acompanhamento')}
          className={`py-2 px-4 ${activeTab === 'acompanhamento' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
        >
          Acompanhamento de Objeto
        </button>
      </div>

      <div className="p-4">
        {activeTab === 'cadastro' && (
          <div>
            {/* Conteúdo da tela de Cadastro de Objeto */}
            <h1 className=" flex justify-center text-2xl font-semibold">Cadastro de Objeto</h1>
            {/* Adicione o formulário ou o conteúdo relevante aqui */}
          </div>
        )}
        {activeTab === 'acompanhamento' && (
          <div>
            {/* Conteúdo da tela de Acompanhamento de Objeto */}
            <h1 className="flex justify-center  text-2xl font-semibold">Acompanhamento de Objeto</h1>
            {/* Adicione o conteúdo relevante para o acompanhamento aqui */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
