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

const BASE_URL = 'https://servicodados.ibge.gov.br/api/v1';

export const getUFs = async (): Promise<UF[]> => {
  const response = await fetch(`${BASE_URL}/localidades/estados?orderBy=nome`);
  return response.json();
};

export const getCidadesByUF = async (ufId: number): Promise<Cidade[]> => {
  const response = await fetch(`${BASE_URL}/localidades/estados/${ufId}/municipios?orderBy=nome`);
  return response.json();
};

// Note: A API do IBGE não fornece bairros diretamente.
// Esta é uma implementação mockada que você pode substituir pela sua API real de bairros
export const getBairrosByCidade = async (cidadeId: number): Promise<Bairro[]> => {
  // Simula uma chamada à API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Retorna alguns bairros mockados
  return [
    { id: 1, nome: 'Centro' },
    { id: 2, nome: 'Jardim América' },
    { id: 3, nome: 'Vila Nova' },
    { id: 4, nome: 'São José' },
  ];
}; 