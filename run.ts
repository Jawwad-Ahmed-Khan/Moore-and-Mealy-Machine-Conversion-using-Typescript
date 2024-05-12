import inquirer from "inquirer";

import {Mealy_Machine_Struture,Mealy_Output,Transiton,take_input_for_Mealy,Mealy_Machine} from "./Machine_Modules.js";

import {Moore_Machine_Structute,Moore_Machine,Moore_Machine_Outputs,Taking_Input_For_Moore,Convert_To_Mealy } from "./Machine_Modules.js";


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
  console.log("\n---------- | Mealy Machine Structure | -----------\n");
  console.table(firstMealy);

  console.table(Print_T);

  console.log("\nOutput Of Mealy Machine: ", Mealy_Output(Mymachine, firstMealy));

  Convert_To_Moore(Mymachine,firstMealy);
}

async function My_Moore() {
  
let abc = await inquirer.prompt([
  { message: "Please enter a number OF states:", type: "number", name: "f1"},
  {message: "Please enter a Inputs:", type: "string", name:"f2"},
  {message: "Please enter a Outputs:", type: "string", name:"f3"},
  {message: "Please enter a Inputed_string:", type: "string", name:"f4"}
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
      MM[i].Output_value=String(await Taking_Input_For_Moore(i,"Enter Output OF State Number "));
      for(let j=0;j<M1.Inputs.length;j++)
        {
                MM[i].Transition_on_state.push(Number(await Taking_Input_For_Moore(i,"Transion on Input "+M1.Inputs[j]+" for State ")));
        }

    }
console.clear();
console.log("--------- | Moore Machine Structure | ----------\n");
console.table(M1)
console.log();
console.table(MM);

console.log("Output of My Moore Machine : ",Moore_Machine_Outputs(MM,String(M1.Inputed_string),M1));

console.log("\n------------- | Created Mealy Machine Structure And Mealy Machine | -----------\n");
console.table(M1);
Convert_To_Mealy(MM,M1);

}

function Convert_To_Moore(Mealy_M:Mealy_Machine[],Struct:Mealy_Machine_Struture)
{
let New_Moore:Moore_Machine[]=[];

for(let i=0;i<Mealy_M.length;i++)
  {
    New_Moore.push(new Moore_Machine(i));
  } //Moore Me Mealy Jitne State Dil diye
    New_Moore[0].Output_value=Mealy_M[0].Move[0].output;
  
  for(let i=0;i<Mealy_M.length;i++)
    {
      let vars:number;
      for(let j=0;j<Mealy_M[0].Move.length;j++)
        {
          let Yad_state_num:number=New_Moore.length;
          vars=Mealy_M[i].Move[j].Jump_to_state_Number;
          if(New_Moore[vars].Output_value===""||New_Moore[vars].Output_value===Mealy_M[i].Move[j].output)
            {
              New_Moore[i].Transition_on_state.push(vars);
              New_Moore[vars].Output_value=Mealy_M[i].Move[j].output;
            }
            else
            {
              if(i>=vars)
                {
                  let x:number;
                  for(x=vars;x<New_Moore.length;x++)
                    {
                      if(New_Moore[x].State_Number===vars&&New_Moore[x].Output_value===Mealy_M[i].Move[j].output)
                        break;
                    }
                    if(x<New_Moore.length)
                      New_Moore[i].Transition_on_state.push(x);
                    else
                    {
                      New_Moore[i].Transition_on_state.push(x);
                      New_Moore.push(new Moore_Machine(vars,Mealy_M[i].Move[j].output));
                      Yad_state_num=x;
                    }
                }else
                {
              New_Moore[i].Transition_on_state.push(Yad_state_num);
              New_Moore.push(new Moore_Machine(vars,Mealy_M[i].Move[j].output));
                }
            }
          //   else if(i<=vars)
          //   {
              
          //     New_Moore[i].Transition_on_state.push(Moore_Machine.length);
          //     New_Moore.push(new Moore_Machine(vars,Mealy_M[i].Move[j].output));
            
          // }else {
          //     const break_array=New_Moore.slice(vars+1);
          //     const index=break_array.findIndex((obj)=>obj.State_Number===vars&&obj.Output_value===Mealy_M[i].Move[j].output);
          //     if(index>=0)
          //       {
          //         New_Moore[i].Transition_on_state.push(vars+index);
          //       }else
          //       {
          //         New_Moore[i].Transition_on_state.push(Moore_Machine.length);
          //     New_Moore.push(new Moore_Machine(vars,Mealy_M[i].Move[j].output));
          //       }
          //   }
          
          }          

        }

        for(let i=0;i<New_Moore.length;i++)
          {
            if(New_Moore[i].Transition_on_state.length===0)
              {
                New_Moore[i].Transition_on_state=New_Moore[New_Moore[i].State_Number].Transition_on_state;
                New_Moore[i].State_Number=i; 
              }
          }
          let New_Moore_Struct:Moore_Machine_Structute={
            Number_of_state: New_Moore.length,
             Inputs:String(Struct.Inputs),
             Outputs:String(Struct.Outputs) ,
             Inputed_string: String(Struct.Inputed_string)
          };
          console.log("\n-------  | Moore Machine Structure | ------------\n");
          console.table(New_Moore_Struct);
          console.table(New_Moore);
          console.log("Output Of Converted Moore Machine :",Moore_Machine_Outputs(New_Moore,New_Moore_Struct.Inputed_string,New_Moore_Struct));
    }

let Take_choice=await inquirer.prompt([{message:"Select choice Which you Have:",type:"list",name:"Machine",choices:["1 : Moore","2: Mealy"]}]);

switch(Take_choice.Machine)
{
  case "1 : Moore":
    My_Moore();
  break;
  case "2: Mealy":
    My_Mealy();
  break;
}