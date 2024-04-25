import inquirer from "inquirer";
// Take Input Fuction banaya me input lene k liye jis se me pore machine k inputs 
//outpouts or design krta ho or ek class me add kr deta hon
async function take_input(state: string, Inp: string): Promise<any> {
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
// Mealy Machine K structure he Jis ko me Program k start me istemal krta hon 
//pore machine ka structure pata laga ta hon k machine kis terh ho gi
interface Mealy_Machine_Struture {
  Number_of_state?: number;
  Inputs?: string;
  Outputs?: string;
  Inputed_string?: string;
}
// Transition class me Hr state se konse state me jaon ga or kiya input lon ga or konsa output don ga
class Transiton {
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

// Mealy_Machine class me Hr state ka number ot Transition class use kr us k Movement ko store krta hon
class Mealy_Machine {
  state_Number!: number;
  Move: Transiton[] = [];
}

// Mealy Machine k inputs jo output ay wo ye function kare ga
function Mealy_Output(
  Mac: Mealy_Machine[],
  Struct: Mealy_Machine_Struture
): string {
    // Parameters me pori Mealy_Machine or us ka pora structure utaya
  let Str: string = "";//is me output store ho kr return krta hon
  let Inp: string = String(Struct.Inputed_string); // Machine pr konsi string run ho gi
  let Tem: Mealy_Machine = Mac[0]; // Initail state store yhan kam start

  // Nested Loop is terh kam krta he k inputed string  k length tak phla loop chale hr input k index ko use kr k
  //second loop me transiton k array ko traverse kr k input compare kr k output or transition ka pata laga tha hon
  for (let i = 0; i < Inp.length; i++) {
    for (let j = 0; j < Tem.Move.length; j++) {
      if (Tem.Move[j].input == Inp[i]) {
        Str += Tem.Move[j].output;
        Tem = Mac[Tem.Move[j].Jump_to_state_Number];
        break;
      }
    }
  }
// Ye ek loop me b ho jay ga inputed string k current index pr input ko le kr inputs me us k index 
//search kr k phir usi index ko transition array use kr same point pr aon ga or kam ho jay ga
  return Str;
}

let Answer = await inquirer.prompt([
  {
    name: "State",
    type: "number",
    message: "Enter Number Of State For Mealy Machine:",
  },
  { name: "Input", type: "string", message: "Enter Inputs of Mealy Machine:" },
  { name: "Output", type: "string", message: "Enter Output of Mealy Machine:" },
  {
    name: "InputString",
    type: "string",
    message: "Enter Input String For Mealy Machine:",
  },
]);

let firstMealy: Mealy_Machine_Struture = {
  Number_of_state: Number(Answer.State),
  Inputs: String(Answer.Input),
  Outputs: String(Answer.Output),
  Inputed_string: String(Answer.InputString),
};

let Mymachine: Mealy_Machine[] = [];

for (let i = 0; i < Number(firstMealy.Number_of_state); i++) {
  Mymachine.push(new Mealy_Machine());
  Mymachine[i].state_Number = i;
}

for (let i = 0; i < Mymachine.length; i++) {
  for (let j = 0; j < String(firstMealy.Inputs).length; j++) {
    let variable: any;
    variable = await take_input(`${i}`, String(firstMealy.Inputs)[j]);
    Mymachine[i].Move.push(
      new Transiton(
        i,
        String(firstMealy.Inputs)[j],
        String(variable.I1),
        Number(variable.I2)
      )
    );
  }
}

let Print_T: Transiton[] = [];
for (let i = 0; i < Mymachine.length * String(firstMealy.Inputs).length; i++) {
  Print_T.push(new Transiton());
}
let temp: number = 0;
for (let i = 0; i < Mymachine.length; i++) {
  for (let j = 0; j < Mymachine[i].Move.length; j++) {
    Print_T[temp] = Mymachine[i].Move[j];
    ++temp;
  }
}
console.clear();
console.table(Print_T);

console.log("Output Of Mealy Machine: ", Mealy_Output(Mymachine, firstMealy));

// console.table(Mymachine.map((ele)=>{
//      console.table(ele.Move);
// }));
// console.table(Mymachine.map((element)=>{

//     let NewArray:Transiton[]=[];
//     for(let i=0;i<Mymachine.length*String(firstMealy.Inputs).length;i++)
//      {
//         for(let j=0;j<String(firstMealy.Inputs).length;j++)
//             {
//                 NewArray.push(new Transiton(element.Move[j].state_Num,element.Move[j].input,element.Move[j].output,element.Move[j].state_Number));
//             }
//      }
//     return NewArray;
// }))
