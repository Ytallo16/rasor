import { useState } from 'react';
import { IoExitOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import CadastroObjeto from './pages/CadastroObjeto';
import AcompanhamentoObjeto from './pages/AcompanhamentoObjeto';
import AdicionarInformacoes from './pages/AdicionarInformacoes';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('cadastro');

  const toggleTab = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'cadastro':
        return <CadastroObjeto />;
      case 'acompanhamento':
        return <AcompanhamentoObjeto />;
      case 'adicionar':
        return <AdicionarInformacoes />;
      default:
        return <CadastroObjeto />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar - Adicionado fixed e h-screen */}
      <div className="fixed w-64 bg-gray-800 text-white h-screen flex flex-col">
        {/* Informações do Usuário */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <FaUserCircle className="text-3xl text-gray-400" />
            <div className="flex flex-col">
              <span className="font-medium">João da Silva</span>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            CPF: 123.456.789-00
          </div>
        </div>

        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
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
          <button
            onClick={() => toggleTab('adicionar')}
            className={`py-2 px-4 text-left ${activeTab === 'adicionar' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            Adicionar Informações
          </button>
        </div>
        {/* Botão de Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => console.log('Logout clicked')}
            className="w-full py-2 px-4 text-left text-red-300 hover:text-red-400 rounded flex items-center gap-2 transition-colors duration-200"
          >
            <IoExitOutline className="text-xl" />
            Sair
          </button>
        </div>
      </div>

      {/* Conteúdo Principal - Adicionado ml-64 para compensar a largura da sidebar fixa */}
      <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
        {renderContent()}
      </div>
    </div>
  );
};

export default Sidebar;
