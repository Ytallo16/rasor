import { useState } from 'react';
import { FaFileUpload, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { objetosCadastrados, ObjetoCadastrado } from '../mocks/objetosCadastrados';

const AdicionarInformacoes = () => {
  const [objetos, setObjetos] = useState(objetosCadastrados);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [novaDescricao, setNovaDescricao] = useState('');
  const [arquivosSelecionados, setArquivosSelecionados] = useState<{ [key: string]: File[] }>({});

  const handleArquivoChange = (objetoId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const novosArquivos = Array.from(event.target.files);
      setArquivosSelecionados(prev => ({
        ...prev,
        [objetoId]: [...(prev[objetoId] || []), ...novosArquivos]
      }));
    }
  };

  const handleEditarDescricao = (objeto: ObjetoCadastrado) => {
    setEditandoId(objeto.id);
    setNovaDescricao(objeto.descricao);
  };

  const handleSalvarDescricao = async (objetoId: string) => {
    try {
      // Simula um delay para representar o envio ao backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      setObjetos(objetos.map(obj => 
        obj.id === objetoId 
          ? { ...obj, descricao: novaDescricao }
          : obj
      ));

      setEditandoId(null);
      setNovaDescricao('');
      alert('Descrição atualizada com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar descrição. Tente novamente.');
    }
  };

  const handleUploadImagens = async (objetoId: string) => {
    try {
      const arquivos = arquivosSelecionados[objetoId];
      if (!arquivos?.length) {
        alert('Selecione pelo menos uma imagem para fazer upload.');
        return;
      }

      // Simula um delay para representar o upload
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simula o sucesso do upload adicionando os nomes dos arquivos
      setObjetos(objetos.map(obj => 
        obj.id === objetoId 
          ? { 
              ...obj, 
              imagens: [...obj.imagens, ...arquivos.map(file => file.name)]
            }
          : obj
      ));

      // Limpa os arquivos selecionados para este objeto
      setArquivosSelecionados(prev => {
        const newState = { ...prev };
        delete newState[objetoId];
        return newState;
      });

      alert('Imagens adicionadas com sucesso!');
    } catch (error) {
      alert('Erro ao fazer upload das imagens. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Adicionar Informações aos Objetos</h2>
        
        <div className="space-y-4">
          {objetos.map(objeto => (
            <div key={objeto.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{objeto.tipo.charAt(0).toUpperCase() + objeto.tipo.slice(1)}</h3>
                  <p className="text-sm text-gray-500">B.O: {objeto.numeroBO} - Registrado em: {new Date(objeto.dataRegistro).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Descrição */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Descrição</label>
                  {editandoId !== objeto.id ? (
                    <button
                      onClick={() => handleEditarDescricao(objeto)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <FaEdit className="text-lg" />
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSalvarDescricao(objeto.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <FaSave className="text-lg" />
                      </button>
                      <button
                        onClick={() => setEditandoId(null)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <FaTimes className="text-lg" />
                      </button>
                    </div>
                  )}
                </div>
                
                {editandoId === objeto.id ? (
                  <textarea
                    value={novaDescricao}
                    onChange={(e) => setNovaDescricao(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-600">{objeto.descricao}</p>
                )}
              </div>

              {/* Upload de Imagens */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagens ({objeto.imagens.length} existentes)
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      onChange={(e) => handleArquivoChange(objeto.id, e)}
                      accept="image/*"
                      className="hidden"
                      id={`arquivo-${objeto.id}`}
                      multiple
                    />
                    <label
                      htmlFor={`arquivo-${objeto.id}`}
                      className="flex items-center gap-2 w-full px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <FaFileUpload className="text-blue-600 text-xl" />
                      <span className="text-gray-600">
                        {arquivosSelecionados[objeto.id]?.length
                          ? `${arquivosSelecionados[objeto.id].length} arquivo(s) selecionado(s)`
                          : 'Escolher imagens...'}
                      </span>
                    </label>
                  </div>
                  {arquivosSelecionados[objeto.id]?.length > 0 && (
                    <button
                      onClick={() => handleUploadImagens(objeto.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Upload
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdicionarInformacoes; 