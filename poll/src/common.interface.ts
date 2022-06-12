export interface DataInterface {
  code: number;
  result: any;
}

export interface PacketInterface {
  execute?: {
    function: string;
    args: any[];
  };
  data: any;
}

export interface QuestionInterface {
  id: number;
  question: string;
  options: string[];
  answer?: number;
  poll?: number[];
}
