import { useState } from 'react';

type TipoObjeto = 'carro' | 'celular' | 'notebook';

interface CampoEspecifico {
  carro: string;
  celular: string;
  notebook: string;
}

const CadastroObjeto = () => {
  const [tipoObjeto, setTipoObjeto] = useState<TipoObjeto | ''>('');
  const [identificador, setIdentificador] = useState('');
  const [descricao, setDescricao] = useState('');
  const [arquivo, setArquivo] = useState<File | null>(null);

  const camposEspecificos: CampoEspecifico = {
    carro: 'Número do Chassi',
    celular: 'Número IMEI',
    notebook: 'Número de Série'
  };

  const handleArquivoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setArquivo(event.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementará a lógica para enviar os dados
    console.log({
      tipoObjeto,
      identificador,
      descricao,
      arquivo
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Cadastro de Objeto</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Seleção do tipo de objeto */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Tipo do Objeto</label>
          <select
            value={tipoObjeto}
            onChange={(e) => setTipoObjeto(e.target.value as TipoObjeto)}
            className="w-full p-2 border rounded-md bg-white text-gray-900"
            required
          >
            <option value="">Selecione o tipo</option>
            <option value="carro">Carro</option>
            <option value="celular">Celular</option>
            <option value="notebook">Notebook</option>
          </select>
        </div>

        {/* Campo dinâmico baseado na seleção */}
        {tipoObjeto && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              {camposEspecificos[tipoObjeto]}
            </label>
            <input
              type="text"
              value={identificador}
              onChange={(e) => setIdentificador(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder={`Digite o ${camposEspecificos[tipoObjeto]}`}
              required
            />
          </div>
        )}

        {/* Upload de arquivo */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Adicionar Imagem ou Vídeo
          </label>
          <input
            type="file"
            onChange={handleArquivoChange}
            accept="image/*,video/*"
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Campo de descrição */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full p-2 border rounded-md h-32"
            placeholder="Descreva detalhes adicionais sobre o objeto..."
            required
          />
        </div>

        {/* Botão de envio */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Cadastrar Objeto
        </button>
      </form>
    </div>
  );
};

export default CadastroObjeto; 