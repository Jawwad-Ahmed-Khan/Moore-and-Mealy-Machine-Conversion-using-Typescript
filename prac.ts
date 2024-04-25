import inquirer from "inquirer";
export  async function take_input(state: string, Inp: string): Promise<any> {
  let take_input = await inquirer.prompt([
    {
      message: `State ${state} -> Enter Output ON Input ${Inp} : `,
      type: "string",
      name: "I1",
    },
    {
      message: `State ${state} -> Enter Transion State on Input ${Inp} :`,
      type: "number",
      name: "I2",
    },
  ]);
  return take_input;
}
export  interface Mealy_Machine_Struture {
  Number_of_state?: number;
  Inputs?: string;
  Outputs?: string;
  Inputed_string?: string;
}

export class Transiton {
  state_Num!: number;
  input!: string;
  output!: string;
  Jump_to_state_Number!: number;

  constructor(
    state_Num: number = 0,
    input: string = "",
    output: string = "",
    state_Number: number = 0
  ) {
    this.state_Num = state_Num;
    this.input = input;
    this.output = output;
    this.Jump_to_state_Number = state_Number;
  }
}

export default class Mealy_Machine {
  state_Number!: number;
  Move: Transiton[] = [];
}

export function Mealy_Output(
  Mac: Mealy_Machine[],
  Struct: Mealy_Machine_Struture
): string {
  let Str: string = "";//is me output store ho kr return krta hon
  let Inp: string = String(Struct.Inputed_string); // Machine pr konsi string run ho gi
  let Tem: Mealy_Machine = Mac[0]; // Initail state store yhan kam start

  for (let i = 0; i < Inp.length; i++) {
    for (let j = 0; j < Tem.Move.length; j++) {
      if (Tem.Move[j].input == Inp[i]) {
        Str += Tem.Move[j].output;
        Tem = Mac[Tem.Move[j].Jump_to_state_Number];
        break;
      }
    }
  }
  return Str;
}


