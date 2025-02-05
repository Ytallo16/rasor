interface ObjetoMockado {
  id: string;
  cpf: string;
  tipo: string;
  identificador: string;
  notaFiscal: string;
  descricao: string;
}

export const cpfsMockados = [
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555'
];

export const objetosMockados: ObjetoMockado[] = [
  // CPF 111.111.111-11
  {
    id: '1',
    cpf: '11111111111',
    tipo: 'veiculo',
    identificador: '9BWHE21JX24060960',
    notaFiscal: '111222',
    descricao: 'Volkswagen Gol Preto 2020'
  },
  {
    id: '2',
    cpf: '11111111111',
    tipo: 'celular',
    identificador: '359125780123456',
    notaFiscal: '111333',
    descricao: 'iPhone 13 Pro Max Grafite'
  },

  // CPF 222.222.222-22
  {
    id: '3',
    cpf: '22222222222',
    tipo: 'computador',
    identificador: 'SN22334455',
    notaFiscal: '222111',
    descricao: 'MacBook Pro 16" 2023'
  },
  {
    id: '4',
    cpf: '22222222222',
    tipo: 'celular',
    identificador: '359126789012345',
    notaFiscal: '222333',
    descricao: 'Samsung Galaxy S23 Ultra Preto'
  },

  // CPF 333.333.333-33
  {
    id: '5',
    cpf: '33333333333',
    tipo: 'veiculo',
    identificador: '9BWZZZ377VT004251',
    notaFiscal: '333111',
    descricao: 'Honda Civic Prata 2023'
  },
  {
    id: '6',
    cpf: '33333333333',
    tipo: 'eletronicos',
    identificador: 'SN33445566',
    notaFiscal: '333222',
    descricao: 'Smart TV Samsung 65" 4K'
  },

  // CPF 444.444.444-44
  {
    id: '7',
    cpf: '44444444444',
    tipo: 'computador',
    identificador: 'SN44556677',
    notaFiscal: '444111',
    descricao: 'Dell XPS 15 2023'
  },
  {
    id: '8',
    cpf: '44444444444',
    tipo: 'celular',
    identificador: '359127890123456',
    notaFiscal: '444222',
    descricao: 'iPhone 14 Pro Dourado'
  },

  // CPF 555.555.555-55
  {
    id: '9',
    cpf: '55555555555',
    tipo: 'veiculo',
    identificador: '9BRBL3HE0K0123456',
    notaFiscal: '555111',
    descricao: 'Toyota Corolla Branco 2023'
  },
  {
    id: '10',
    cpf: '55555555555',
    tipo: 'eletronicos',
    identificador: 'SN55667788',
    notaFiscal: '555222',
    descricao: 'PlayStation 5 Digital'
  }
]; 