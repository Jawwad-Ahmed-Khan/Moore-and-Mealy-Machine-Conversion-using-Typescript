import inquirer from "inquirer";
export async function take_input_for_Mealy(state, Inp) {
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
export class Mealy_Machine {
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
export class Moore_Machine {
    State_Number;
    Output_value;
    Transition_on_state;
    constructor(stateNumber = 0, outputValue = "", transitionOnState = []) {
        this.State_Number = stateNumber;
        this.Output_value = outputValue;
        this.Transition_on_state = transitionOnState;
    }
}
export function Moore_Machine_Outputs(states, inputed, struct) {
    let myvar;
    let mystring = states[0].Output_value;
    myvar = states[0];
    for (let i = 0; i < inputed.length; i++) {
        myvar = states[myvar.Transition_on_state[struct.Inputs.indexOf(inputed[i])]];
        mystring += myvar.Output_value;
    }
    return mystring;
}
export let Taking_Input_For_Moore = async (i, j) => {
    let take_input = await inquirer.prompt([
        { message: `${j} ${i}:`, type: "string", name: "take_input" }
    ]);
    return take_input.take_input;
};
