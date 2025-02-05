import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface StatusObjeto {
  status: string;
  dataAtualizacao: string;
  mensagem: string;
}

const AcompanhamentoObjeto = () => {
  const [codigoHash, setCodigoHash] = useState('');
  const [statusObjeto, setStatusObjeto] = useState<StatusObjeto | null>(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const buscarStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigoHash.trim()) {
      setErro('Por favor, insira um código de rastreamento');
      return;
    }

    setCarregando(true);
    setErro('');
    setStatusObjeto(null);

    try {
      // Aqui você implementará a chamada à API real
      // Simulando uma chamada à API com timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados mockados para exemplo
      setStatusObjeto({
        status: 'Em análise',
        dataAtualizacao: new Date().toLocaleDateString(),
        mensagem: 'Objeto em processo de verificação'
      });
    } catch (error) {
      setErro('Erro ao buscar status do objeto. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Acompanhamento de Objeto</h2>
          
          <form onSubmit={buscarStatus} className="mb-8">
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="codigoHash" className="block text-gray-700 text-sm font-medium mb-2">
                  Código de Rastreamento
                </label>
                <input
                  type="text"
                  id="codigoHash"
                  value={codigoHash}
                  onChange={(e) => setCodigoHash(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite o código de rastreamento"
                />
              </div>
              <div className="self-end">
                <button
                  type="submit"
                  disabled={carregando}
                  className={`px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 ${
                    carregando ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <FaSearch />
                  {carregando ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
            </div>
          </form>

          {erro && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700">{erro}</p>
            </div>
          )}

          {statusObjeto && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Status do Objeto</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Status atual:</p>
                  <p className="font-medium text-gray-800">{statusObjeto.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Última atualização:</p>
                  <p className="font-medium text-gray-800">{statusObjeto.dataAtualizacao}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mensagem:</p>
                  <p className="font-medium text-gray-800">{statusObjeto.mensagem}</p>
                </div>
              </div>
            </div>
          )}

          {!statusObjeto && !erro && !carregando && (
            <div className="text-center text-gray-500 py-8">
              Digite um código de rastreamento para verificar o status do objeto
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcompanhamentoObjeto; 