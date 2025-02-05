import { useState } from 'react';
import { FaFileUpload } from 'react-icons/fa';

type TipoObjeto = 'veiculo' | 'celular' | 'computador' | 'eletronicos';

interface CampoEspecifico {
  veiculo: string;
  celular: string;
  computador: string;
  eletronicos: string;
}

const CadastroObjeto = () => {
  const [tipoObjeto, setTipoObjeto] = useState<TipoObjeto | ''>('');
  const [cpf, setCpf] = useState('');
  const [numeroBO, setNumeroBO] = useState('');
  const [dataOcorrido, setDataOcorrido] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [notaFiscal, setNotaFiscal] = useState('');
  const [identificador, setIdentificador] = useState('');
  const [descricao, setDescricao] = useState('');
  const [telefone, setTelefone] = useState('');
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [nomesArquivos, setNomesArquivos] = useState<string[]>([]);

  const camposEspecificos: CampoEspecifico = {
    veiculo: 'Número do Chassi',
    celular: 'Número IMEI',
    computador: 'Número de Série',
    eletronicos: 'Número de Série'
  };

  const handleArquivoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const novosArquivos = Array.from(event.target.files);
      setArquivos(novosArquivos);
      setNomesArquivos(novosArquivos.map(arquivo => arquivo.name));
    }
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
    
    if (value.length <= 11) {
      // Formata o número conforme vai digitando
      if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      }
      if (value.length > 9) {
        value = `${value.slice(0, 9)}-${value.slice(9)}`;
      }
      setTelefone(value);
    }
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      setCpf(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      cpf,
      tipoObjeto,
      identificador,
      numeroBO,
      dataOcorrido,
      endereco: {
        estado,
        cidade,
        bairro
      },
      notaFiscal,
      descricao,
      arquivos,
      telefone
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Cadastro de Objeto</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* CPF */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={handleCpfChange}
            className="w-full p-2 border rounded-md"
            placeholder="000.000.000-00"
            required
            maxLength={14}
          />
        </div>

        {/* Seleção do tipo de objeto - Atualizado */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Tipo do Objeto</label>
          <select
            value={tipoObjeto}
            onChange={(e) => setTipoObjeto(e.target.value as TipoObjeto)}
            className="w-full p-2 border rounded-md bg-white text-gray-900"
            required
          >
            <option value="">Selecione o tipo</option>
            <option value="veiculo">Veículo</option>
            <option value="celular">Celular</option>
            <option value="computador">Computador</option>
            <option value="eletronicos">Eletrônicos</option>
          </select>
        </div>

        {/* Número do B.O. */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Nº B.O (Registro PPE)</label>
          <input
            type="text"
            value={numeroBO}
            onChange={(e) => setNumeroBO(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Digite o número do B.O."
            required
          />
        </div>

        {/* Data do Ocorrido */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Data do Ocorrido</label>
          <input
            type="date"
            value={dataOcorrido}
            onChange={(e) => setDataOcorrido(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Endereço da Ocorrência */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Estado</label>
            <input
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Estado"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Cidade</label>
            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Cidade"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Bairro</label>
            <input
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Bairro"
              required
            />
          </div>
        </div>

        {/* Número da Nota Fiscal */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Nº Nota Fiscal</label>
          <input
            type="text"
            value={notaFiscal}
            onChange={(e) => setNotaFiscal(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Digite o número da nota fiscal"
          />
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

        {/* Campo de telefone */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Telefone para Contato</label>
          <input
            type="text"
            value={telefone}
            onChange={handleTelefoneChange}
            className="w-full p-2 border rounded-md"
            placeholder="(00) 00000-0000"
            required
            maxLength={15}
          />
        </div>

        {/* Upload de arquivo */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Adicionar Imagens ou Vídeos
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={handleArquivoChange}
              accept="image/*,video/*"
              className="hidden"
              id="arquivo"
              multiple
            />
            <label
              htmlFor="arquivo"
              className="flex items-center gap-2 w-full p-2 border rounded-md bg-white cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <FaFileUpload className="text-blue-600 text-xl" />
              <span className="text-gray-600">
                {nomesArquivos.length > 0 
                  ? `${nomesArquivos.length} arquivo(s) selecionado(s)`
                  : 'Escolha os arquivos...'}
              </span>
            </label>
          </div>
          {nomesArquivos.length > 0 && (
            <div className="mt-2 space-y-1">
              {nomesArquivos.map((nome, index) => (
                <div key={index} className="text-sm text-gray-600">
                  {nome}
                </div>
              ))}
            </div>
          )}
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