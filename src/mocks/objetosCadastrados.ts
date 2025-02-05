export interface ObjetoCadastrado {
  id: string;
  tipo: string;
  descricao: string;
  dataRegistro: string;
  numeroBO: string;
  imagens: string[];
}

export const objetosCadastrados: ObjetoCadastrado[] = [
  {
    id: '1',
    tipo: 'veiculo',
    descricao: 'Volkswagen Gol Preto 2020 - Roubado no estacionamento do shopping',
    dataRegistro: '2024-02-15',
    numeroBO: '12345678',
    imagens: ['carro1.jpg', 'carro2.jpg']
  },
  {
    id: '2',
    tipo: 'celular',
    descricao: 'iPhone 13 Pro Max Grafite - Furtado na praça central',
    dataRegistro: '2024-02-14',
    numeroBO: '87654321',
    imagens: ['celular1.jpg']
  },
  {
    id: '3',
    tipo: 'computador',
    descricao: 'MacBook Pro 16" 2023 - Roubado em assalto à residência',
    dataRegistro: '2024-02-13',
    numeroBO: '45678912',
    imagens: []
  },
  {
    id: '4',
    tipo: 'eletronicos',
    descricao: 'Smart TV Samsung 65" 4K - Furtada durante mudança',
    dataRegistro: '2024-02-12',
    numeroBO: '98765432',
    imagens: ['tv1.jpg', 'tv2.jpg', 'tv3.jpg']
  }
]; 