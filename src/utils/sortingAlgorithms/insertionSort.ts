import { SortArrayItem } from "../../contexts/SortAlgContext";
import {
	Command,
	compare,
	init,
	rangeArray,
	setIndices,
} from "../helpers";

const insertionSort = (array: SortArrayItem[]) => {
	const commands: Command[] = [];
	const values = array.map((i) => i.value);
	const indices = rangeArray(0, values.length - 1);
	let currCmd = init(values);

	for (let i = 1; i < indices.length; i++) {
		const tmp = indices[i];
		let j = i - 1;
		// Iterate while J is out of place.
		currCmd = compare(currCmd, [i]);
		commands.push(currCmd);
		while (j >= 0 && values[indices[j]] > values[tmp]) {
			indices[j + 1] = indices[j];

			// currCmd = swap(currCmd, j, j + 1);
			currCmd = setIndices(currCmd, [...indices]);
			currCmd.swapping = [j + 1];
			commands.push(currCmd);

			j--;
		}
		// Assign the correct location of i where j stops.
		indices[j + 1] = tmp;

		currCmd = setIndices(currCmd, [...indices]);
		currCmd.swapping = [j + 1];
		commands.push(currCmd);
	}

	commands.push({
		...currCmd,
		sorted: rangeArray(0, values.length - 1),
	});

	return commands;
};

export default insertionSort;
