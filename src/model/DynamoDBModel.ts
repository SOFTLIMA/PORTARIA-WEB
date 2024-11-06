export interface Funcionario {
  funcional: number;
  nomeCompleto: string;
  setor: string;
  foto: string;
}

export interface Veiculo {
  placa: string;
  modelo: string;
}

export interface Funcionarios {
  id: number;
  funcionario: Funcionario;
  entrada: Date; /* precisa conter data e hora */
  saida: Date; /* precisa conter data e hora */
  status: string; /*Antigo campo Condicao*/
  dataAlteracao: Date;
}

export interface OcorrenciaFuncionario {
  id: string;
  funcionario: Funcionario;
  entrada: Date; /* precisa conter data e hora */
  saida: Date; /* precisa conter data e hora */
  dataOcorrencia: Date; /* precisa conter data e hora, antigo campo Fato */
  descricao: string; /*Antigo campo TipoFato*/
}

export interface FuncionarioHistorico {
  id: string;
  funcionario: Funcionario;
  entrada: Date; /* precisa conter data e hora */
  saida: Date; /* precisa conter data e hora */
}

export interface Veiculos {
  id: string;
  veiculo: Veiculo;
}

export interface OcorrenciaVeiculos {
  id: string;
  idVeiculo: string;
  saida: Date; /* precisa conter data e hora */
  destino: string;
  condutor: string;
  saidaKM: number;
  entradaKM: number;
  entrada: Date; /* foco na hora */
  dataOcorrencia: Date;
  descricao: string;
}

export interface VeiculosHistorico {
  id: string;
  idVeiculo: string;
  saida: Date;
  destino: string;
  condutor: string;
  saidaKM: number;
  entradaKM: number;
  entrada: Date;
}
