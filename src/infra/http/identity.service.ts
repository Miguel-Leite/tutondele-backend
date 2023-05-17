import { Injectable } from "@nestjs/common";
import axios, { AxiosResponse } from "axios";

interface SepeGovResponse {
  sucess: boolean;
  message: string;
  data: Data;
}

interface Data {
  numero: string;
  nome: string;
  nif: string;
  data_nasc: string;
  genero: string;
  naturalidade: string;
  pai_nome_completo: string;
  mae_nome_completo: string;
  estado_civil: string;
  data_emissao: string;
  emissao_local: string;
}

export interface IdentityServiceResponse {
  number: string;
  name: string;
  nif: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  father_full_name: string;
  mother_full_name: string;
  marital_status: string;
  issuance_date: string;
  issuance_location: string;
}

@Injectable()
export class IdentityService {
  async execute(bi: string): Promise<IdentityServiceResponse> {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://www.sepe.gov.ao/ao/actions/bi.ajcall.php?bi=${bi}`,
      headers: {
        'Cookie': 'PHPSESSID=fhu9c0h96fbgqhdae9sm9e8fh3'
      }
    };

    const { data } = await axios.request(config) as AxiosResponse<SepeGovResponse>

    return {
      number: this.capitalizeString(data.data.numero),
      name: this.capitalizeString(data.data.nome),
      nif: this.capitalizeString(data.data.nif),
      date_of_birth: this.capitalizeString(data.data.data_nasc),
      gender: this.capitalizeString(data.data.genero),
      nationality: this.capitalizeString(data.data.naturalidade),
      father_full_name: this.capitalizeString(data.data.pai_nome_completo),
      mother_full_name: this.capitalizeString(data.data.mae_nome_completo),
      marital_status: this.capitalizeString(data.data.estado_civil),
      issuance_date: this.capitalizeString(data.data.data_emissao),
      issuance_location: this.capitalizeString(data.data.emissao_local),
    };

  }

  private capitalizeString(str: string): string {
    const words = str.toLowerCase().split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  }
}