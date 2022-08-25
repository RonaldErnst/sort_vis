import { SortArrayItem } from "../../contexts/SortAlgContext";
import { Command, compare, finishItem, init, rangeArray, swap } from "../helpers";

const selectionSort = (array: SortArrayItem[]) => {
    const commands: Command[] = [];
    const values = array.map(a => a.value);
    let currCmd = init(values);

    for(let i = 0; i < values.length - 1; i++)
       {
           let min = i;
           
           for(let j = i + 1; j < values.length; j++)
           {
                currCmd = compare(currCmd, [min, j]);
                commands.push(currCmd);
               if(values[j] < values[min])
               {
                   // Choose the lesser of the two:
                   min = j;
               }
           }
           // In-place swap:
           const tmp = values[min];
           values[min] = values[i];
           values[i] = tmp;

           currCmd = swap(currCmd, min, i);
           commands.push(currCmd);
           
           currCmd = finishItem(currCmd, i);
       }
       
    commands.push({
		...currCmd,
		sorted: rangeArray(0, values.length - 1),
	});

    return commands;
};

export default selectionSort;