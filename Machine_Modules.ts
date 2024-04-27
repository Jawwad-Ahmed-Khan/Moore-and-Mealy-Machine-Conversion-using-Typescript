import inquirer from "inquirer";
export  async function take_input_for_Mealy(state: string, Inp: string): Promise<any> {
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

export class Mealy_Machine {
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


export class Moore_Machine{
    State_Number:number;
    Output_value:string;
    Transition_on_state:number[];

    constructor(stateNumber: number =0, outputValue: string="", transitionOnState: number[]=[]) {
        this.State_Number = stateNumber;
        this.Output_value = outputValue;
        this.Transition_on_state = transitionOnState;
    }
 
}

export interface Moore_Machine_Structute {
    Number_of_state: number;
    Inputs: string;
    Outputs: string;
    Inputed_string: string;
  }
export function Moore_Machine_Outputs(states:Moore_Machine[],inputed:string,struct:Moore_Machine_Structute):string
{
    let myvar:Moore_Machine;
    let mystring:string=states[0].Output_value
  myvar = states[0];
  for(let i=0; i<inputed.length; i++)
    {
       myvar = states[myvar.Transition_on_state[struct.Inputs.indexOf(inputed[i])]];
       mystring += myvar.Output_value;
    }
    return mystring;
}

export let Taking_Input_For_Moore =async (i:number,j:string)=>{
    let take_input=await inquirer.prompt([
        {message:`${j} ${i}:`,type:"string",name:"take_input"}]);
    return take_input.take_input;
    }

  export  function Convert_To_Mealy(Moore_M:Moore_Machine[],Struct:Moore_Machine_Structute){
      let Tem_M:Mealy_Machine[]=[];
      let Moo:Moore_Machine[]=Moore_M;
      let Inp=String(Struct.Inputs);
      const simple:Mealy_Machine_Struture={
       Number_of_state:Struct.Number_of_state,
       Inputs: Struct.Inputs,
       Outputs: Struct.Outputs,
       Inputed_string: Struct.Inputed_string,
      }
 
      
      for(let i=0; i< Moore_M.length;i++)
       {
         Tem_M.push(new Mealy_Machine());
         Tem_M[i].state_Number=i;
         
         for(let j=0;j<Moo[i].Transition_on_state.length;j++)
           {
             Tem_M[i].Move.push(new Transiton(i,Inp[j],Moo[Moo[i].Transition_on_state[j]].Output_value,Moo[i].Transition_on_state[j]));
           }
       } 
       console.log("\n------------------------ | Moore Machine Convert to Mealy Machine | -------------------------\n");
 
       let Print_T: Transiton[] = [];
       for (let i = 0; i < Tem_M.length * Inp.length; i++) {
         Print_T.push(new Transiton());
       }
       let temp: number = 0;
       for (let i = 0; i < Tem_M.length; i++) {
         for (let j = 0; j < Tem_M[i].Move.length; j++) {
           Print_T[temp] = Tem_M[i].Move[j];
           ++temp;
         }
       }
     console.table(Print_T);
     console.log("\nOutput Of Mealy Machine:",Mealy_Output(Tem_M,simple));
 }