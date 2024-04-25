import inquirer from "inquirer";
import {Mealy_Machine_Struture,Mealy_Output,Transiton,take_input_for_Mealy,Mealy_Machine} from "./Machine_Modules.js";

import {Moore_Machine_Structute,Moore_Machine,Moore_Machine_Outputs,Taking_Input_For_Moore } from "./Machine_Modules.js";

async function My_Mealy(){
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
      variable = await take_input_for_Mealy(`${i}`, String(firstMealy.Inputs)[j]);
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
}

async function My_Moore() {
  
let abc = await inquirer.prompt([
  { message: "Please enter a number OF states", type: "number", name: "f1"},
  {message: "Please enter a Inputs", type: "string", name:"f2"},
  {message: "Please enter a Outputs", type: "string", name:"f3"},
  {message: "Please enter a Inputed_string", type: "string", name:"f4"}
]);

let M1: Moore_Machine_Structute={
    Number_of_state:abc.f1,
    Inputs:abc.f2,
    Outputs:abc.f3,
    Inputed_string:abc.f4
};

let MM:Moore_Machine[]=[];
for(let i =0;i<Number(M1.Number_of_state);i++)
    {
       MM.push(new Moore_Machine(i));
    } //Is ko niche wale loop me add krna jis se code chota ho jay ga

for(let i = 0;i<MM.length;i++)
    {
        // let take_input=await inquirer.prompt([
        //     {message:`output of ${i}:`,type:"string",name:"take_input"}]);
      MM[i].Output_value=String(await Taking_Input_For_Moore(i,"output of"));
      for(let j=0;j<M1.Inputs.length;j++)
        {
                MM[i].Transition_on_state.push(Number(await Taking_Input_For_Moore(i,"Transion on Input "+M1.Inputs[j]+" for State ")));
        }

    }
console.clear();
console.table(MM);

console.log("Output of My Moore Machine : ",Moore_Machine_Outputs(MM,String(M1.Inputed_string),M1));

}

let Take_choice=await inquirer.prompt([{message:"Select choice Which you Have:",type:"list",name:"Machine",choices:["1 : Moore","2: Mealy"]}]);

switch(Take_choice.Machine)
{
  case "1: Moore":
    My_Moore();
  break;
  case "2: Mealy":
    My_Mealy();
  break;
}