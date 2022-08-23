import { SortArrayItem } from "../../contexts/SortAlgContext";
import { Command, init, compare, swap, finishItem } from "../helpers";

const bubbleSort = (array: SortArrayItem[]) => {
	const commands: Command[] = [];
	const values = array.map(({ value }) => value);
    let currCmd = init(values);

	// Sorting Algorithm with trace capture
	for (let i = 0; i < values.length; i++) {
		for (let j = 0; j < values.length - i - 1; j++) {
			// Visualize: Comparing A[j] and A[j + 1]
            currCmd = compare(currCmd, [j, j + 1])
			commands.push(currCmd);
			if (values[j] > values[j + 1]) {
                currCmd = swap(currCmd, j, j + 1);
				commands.push(currCmd);

				const temp = values[j];
				values[j] = values[j + 1];
				values[j + 1] = temp;
			}
		}

		// Visualize: final value is sorted
        currCmd = finishItem(currCmd, values.length - 1 - i);
		commands.push(currCmd);
	}

	return commands;
};

export default bubbleSort;