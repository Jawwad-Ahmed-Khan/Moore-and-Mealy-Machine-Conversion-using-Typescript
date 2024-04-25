import inquirer from "inquirer";
export async function take_input(state, Inp) {
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
export class Transiton {
    state_Num;
    input;
    output;
    Jump_to_state_Number;
    constructor(state_Num = 0, input = "", output = "", state_Number = 0) {
        this.state_Num = state_Num;
        this.input = input;
        this.output = output;
        this.Jump_to_state_Number = state_Number;
    }
}
export default class Mealy_Machine {
    state_Number;
    Move = [];
}
export function Mealy_Output(Mac, Struct) {
    let Str = ""; //is me output store ho kr return krta hon
    let Inp = String(Struct.Inputed_string); // Machine pr konsi string run ho gi
    let Tem = Mac[0]; // Initail state store yhan kam start
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
