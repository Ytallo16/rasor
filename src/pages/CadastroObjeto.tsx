import { useState, useEffect } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import { getUFs, getCidadesByUF, getBairrosByCidade } from '../lib/api';
import { objetosMockados, cpfsMockados } from '../mocks/objetosMockados';
import Swal from 'sweetalert2';

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

interface ObjetoSelecionado {
  id: string;
  descricao: string;
  identificador: string;
  notaFiscal: string;
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
  const [objetosDisponiveis, setObjetosDisponiveis] = useState<ObjetoSelecionado[]>([]);
  const [objetoSelecionadoId, setObjetoSelecionadoId] = useState('');

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

  // Efeito para buscar objetos quando CPF e tipo são selecionados
  useEffect(() => {
    if (cpf && tipoObjeto) {
      const cpfLimpo = cpf.replace(/\D/g, '');
      const objetosFiltrados = objetosMockados
        .filter(obj => obj.cpf === cpfLimpo && obj.tipo === tipoObjeto)
        .map(({ id, descricao, identificador, notaFiscal }) => ({
          id,
          descricao,
          identificador,
          notaFiscal
        }));
      setObjetosDisponiveis(objetosFiltrados);
    } else {
      setObjetosDisponiveis([]);
    }
    setObjetoSelecionadoId('');
  }, [cpf, tipoObjeto]);

  // Efeito para preencher os campos quando um objeto é selecionado
  useEffect(() => {
    if (objetoSelecionadoId) {
      const objetoSelecionado = objetosDisponiveis.find(obj => obj.id === objetoSelecionadoId);
      if (objetoSelecionado) {
        setIdentificador(objetoSelecionado.identificador);
        setNotaFiscal(objetoSelecionado.notaFiscal);
      }
    } else {
      setIdentificador('');
      setNotaFiscal('');
    }
  }, [objetoSelecionadoId]);

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
      // Verifica se o CPF está na lista de CPFs mockados
      if (cpfsMockados.includes(value)) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        setCpf(value);
      } else if (value.length === 11) {
        alert('CPF não encontrado na base de dados!');
      } else {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        setCpf(value);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ufSelecionadaObj = ufs.find(uf => uf.id === ufSelecionada);
    const cidadeSelecionadaObj = cidades.find(cidade => cidade.id === cidadeSelecionada);

    try {
      // Aqui você implementará a lógica para enviar os dados para o backend
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

      // Simula um delay para representar o envio ao backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mostra o alerta de sucesso bonito
      await Swal.fire({
        title: 'Sucesso!',
        text: 'Objeto cadastrado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2563eb',
        background: '#ffffff',
        customClass: {
          popup: 'rounded-xl shadow-xl',
          title: 'text-2xl font-bold text-gray-800',
          confirmButton: 'px-6 py-2.5 rounded-lg text-white font-medium hover:bg-blue-700 transition-all duration-200'
        }
      });
      
      // Recarrega a página
      window.location.reload();
      
    } catch (error) {
      // Mostra o alerta de erro bonito
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao cadastrar objeto. Tente novamente.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#dc2626',
        background: '#ffffff',
        customClass: {
          popup: 'rounded-xl shadow-xl',
          title: 'text-2xl font-bold text-gray-800',
          confirmButton: 'px-6 py-2.5 rounded-lg text-white font-medium hover:bg-red-700 transition-all duration-200'
        }
      });
      console.error('Erro:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Cabeçalho */}
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Cadastro de Objeto</h2>
            <p className="text-blue-100 mt-1">Preencha as informações do objeto perdido ou roubado</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Seção de Identificação */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full inline-flex items-center justify-center mr-2">1</span>
                Identificação
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CPF */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                  <input
                    type="text"
                    value={cpf}
                    onChange={handleCpfChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="000.000.000-00"
                    required
                    maxLength={14}
                  />
                </div>

                {/* Tipo do Objeto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo do Objeto</label>
                  <select
                    value={tipoObjeto}
                    onChange={(e) => setTipoObjeto(e.target.value as TipoObjeto)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    required
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="veiculo">Veículo</option>
                    <option value="celular">Celular</option>
                    <option value="computador">Computador</option>
                    <option value="eletronicos">Eletrônicos</option>
                  </select>
                </div>
              </div>

              {/* Combobox de Objetos Disponíveis */}
              {objetosDisponiveis.length > 0 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Objetos Cadastrados
                  </label>
                  <select
                    value={objetoSelecionadoId}
                    onChange={(e) => setObjetoSelecionadoId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="">Selecione um objeto</option>
                    {objetosDisponiveis.map(obj => (
                      <option key={obj.id} value={obj.id}>
                        {obj.descricao}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Seção de Ocorrência */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full inline-flex items-center justify-center mr-2">2</span>
                Dados da Ocorrência
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Número do B.O. */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nº B.O</label>
                  <input
                    type="text"
                    value={numeroBO}
                    onChange={(e) => setNumeroBO(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Digite o número do B.O."
                    required
                  />
                </div>

                {/* Data do Ocorrido */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data do Ocorrido</label>
                  <input
                    type="date"
                    value={dataOcorrido}
                    onChange={(e) => setDataOcorrido(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Endereço */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select
                    value={ufSelecionada}
                    onChange={(e) => setUfSelecionada(Number(e.target.value) || '')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    required
                  >
                    <option value="">Selecione o estado</option>
                    {ufs.map(uf => (
                      <option key={uf.id} value={uf.id}>{uf.nome}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                  <select
                    value={cidadeSelecionada}
                    onChange={(e) => setCidadeSelecionada(Number(e.target.value) || '')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                  <input
                    type="text"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Digite o nome do bairro"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ponto de Referência</label>
                  <input
                    type="text"
                    value={pontoReferencia}
                    onChange={(e) => setPontoReferencia(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Ex: Próximo à praça central"
                  />
                </div>
              </div>
            </div>

            {/* Seção de Detalhes do Objeto */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full inline-flex items-center justify-center mr-2">3</span>
                Detalhes do Objeto
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Número da Nota Fiscal */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nº Nota Fiscal</label>
                  <input
                    type="text"
                    value={notaFiscal}
                    onChange={(e) => setNotaFiscal(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Digite o número da nota fiscal"
                  />
                </div>

                {/* Telefone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone para Contato</label>
                  <input
                    type="text"
                    value={telefone}
                    onChange={handleTelefoneChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="(00) 00000-0000"
                    required
                    maxLength={15}
                  />
                </div>
              </div>

              {/* Campo dinâmico baseado na seleção */}
              {tipoObjeto && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {camposEspecificos[tipoObjeto]}
                  </label>
                  <input
                    type="text"
                    value={identificador}
                    onChange={(e) => setIdentificador(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={`Digite o ${camposEspecificos[tipoObjeto]}`}
                    required
                  />
                </div>
              )}

              {/* Upload de arquivo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adicionar Imagens ou Vídeos
                </label>
                <div className="mt-1 flex items-center gap-4">
                  <div className="flex-1">
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
                      className="flex items-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-all"
                    >
                      <FaFileUpload className="text-blue-600 text-xl" />
                      <span className="text-gray-600">
                        {nomesArquivos.length > 0 
                          ? `${nomesArquivos.length} arquivo(s) selecionado(s)`
                          : 'Escolha os arquivos...'}
                      </span>
                    </label>
                  </div>
                </div>
                {nomesArquivos.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {nomesArquivos.map((nome, index) => (
                      <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <FaFileUpload className="text-blue-600" />
                        {nome}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Descreva detalhes adicionais sobre o objeto..."
                  rows={4}
                  required
                />
              </div>
            </div>

            {/* Botão de envio */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105"
              >
                Cadastrar Objeto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroObjeto; 