import { useState, useEffect } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import { getUFs, getCidadesByUF, getBairrosByCidade } from '../lib/api';

type TipoObjeto = 'veiculo' | 'celular' | 'computador' | 'eletronicos';

interface CampoEspecifico {
  veiculo: string;
  celular: string;
  computador: string;
  eletronicos: string;
}

interface UF {
  id: number;
  sigla: string;
  nome: string;
}

interface Cidade {
  id: number;
  nome: string;
}

interface Bairro {
  id: number;
  nome: string;
}

const CadastroObjeto = () => {
  const [tipoObjeto, setTipoObjeto] = useState<TipoObjeto | ''>('');
  const [cpf, setCpf] = useState('');
  const [numeroBO, setNumeroBO] = useState('');
  const [dataOcorrido, setDataOcorrido] = useState('');
  const [notaFiscal, setNotaFiscal] = useState('');
  const [identificador, setIdentificador] = useState('');
  const [descricao, setDescricao] = useState('');
  const [telefone, setTelefone] = useState('');
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [nomesArquivos, setNomesArquivos] = useState<string[]>([]);

  // Estados para UF, cidade e bairro
  const [ufs, setUfs] = useState<UF[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [ufSelecionada, setUfSelecionada] = useState<number | ''>('');
  const [cidadeSelecionada, setCidadeSelecionada] = useState<number | ''>('');
  const [bairro, setBairro] = useState('');
  const [pontoReferencia, setPontoReferencia] = useState('');
  const [carregandoCidades, setCarregandoCidades] = useState(false);

  // Buscar UFs ao carregar o componente
  useEffect(() => {
    const fetchUFs = async () => {
      try {
        const data = await getUFs();
        setUfs(data);
      } catch (error) {
        console.error('Erro ao buscar UFs:', error);
      }
    };
    fetchUFs();
  }, []);

  // Buscar cidades quando UF for selecionada
  useEffect(() => {
    const fetchCidades = async () => {
      if (ufSelecionada) {
        setCarregandoCidades(true);
        try {
          const data = await getCidadesByUF(ufSelecionada);
          setCidades(data);
        } catch (error) {
          console.error('Erro ao buscar cidades:', error);
        } finally {
          setCarregandoCidades(false);
        }
      } else {
        setCidades([]);
      }
      setCidadeSelecionada('');
      setBairro('');
    };
    fetchCidades();
  }, [ufSelecionada]);

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
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
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
    const ufSelecionadaObj = ufs.find(uf => uf.id === ufSelecionada);
    const cidadeSelecionadaObj = cidades.find(cidade => cidade.id === cidadeSelecionada);

    console.log({
      cpf,
      tipoObjeto,
      identificador,
      numeroBO,
      dataOcorrido,
      endereco: {
        estado: ufSelecionadaObj?.nome || '',
        cidade: cidadeSelecionadaObj?.nome || '',
        bairro,
        pontoReferencia
      },
      notaFiscal,
      descricao,
      arquivos,
      telefone
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Cadastro de Objeto</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* CPF */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={handleCpfChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="000.000.000-00"
              required
              maxLength={14}
            />
          </div>

          {/* Tipo do Objeto */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Tipo do Objeto</label>
            <select
              value={tipoObjeto}
              onChange={(e) => setTipoObjeto(e.target.value as TipoObjeto)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
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
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Nº B.O (Registro PPE)</label>
            <input
              type="text"
              value={numeroBO}
              onChange={(e) => setNumeroBO(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Digite o número do B.O."
              required
            />
          </div>

          {/* Data do Ocorrido */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Data do Ocorrido</label>
            <input
              type="date"
              value={dataOcorrido}
              onChange={(e) => setDataOcorrido(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Endereço da Ocorrência */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Estado</label>
              <select
                value={ufSelecionada}
                onChange={(e) => setUfSelecionada(Number(e.target.value) || '')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                required
              >
                <option value="">Selecione o estado</option>
                {ufs.map(uf => (
                  <option key={uf.id} value={uf.id}>{uf.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Cidade</label>
              <select
                value={cidadeSelecionada}
                onChange={(e) => setCidadeSelecionada(Number(e.target.value) || '')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                required
                disabled={!ufSelecionada || carregandoCidades}
              >
                <option value="">
                  {carregandoCidades 
                    ? 'Carregando...' 
                    : ufSelecionada 
                      ? 'Selecione a cidade'
                      : 'Selecione um estado primeiro'
                  }
                </option>
                {cidades.map(cidade => (
                  <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Bairro</label>
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Digite o nome do bairro"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Ponto de Referência</label>
              <input
                type="text"
                value={pontoReferencia}
                onChange={(e) => setPontoReferencia(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Ex: Próximo à praça central"
              />
            </div>
          </div>

          {/* Número da Nota Fiscal */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Nº Nota Fiscal</label>
            <input
              type="text"
              value={notaFiscal}
              onChange={(e) => setNotaFiscal(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Digite o número da nota fiscal"
            />
          </div>

          {/* Campo dinâmico baseado na seleção */}
          {tipoObjeto && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                {camposEspecificos[tipoObjeto]}
              </label>
              <input
                type="text"
                value={identificador}
                onChange={(e) => setIdentificador(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder={`Digite o ${camposEspecificos[tipoObjeto]}`}
                required
              />
            </div>
          )}

          {/* Campo de telefone */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Telefone para Contato</label>
            <input
              type="text"
              value={telefone}
              onChange={handleTelefoneChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="(00) 00000-0000"
              required
              maxLength={15}
            />
          </div>

          {/* Upload de arquivo */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
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
                className="flex items-center gap-2 w-full px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-50 transition-colors"
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
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Descreva detalhes adicionais sobre o objeto..."
              required
            />
          </div>

          {/* Botão de envio */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cadastrar Objeto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroObjeto; 