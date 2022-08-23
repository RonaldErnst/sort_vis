import { SortArrayItem } from "../../contexts/SortAlgContext";
import {
	Command,
	init,
	compare,
	setIndices,
	rangeArray,
} from "../helpers";

const mergeSort = (array: SortArrayItem[]) => {
	const commands: Command[] = [];
	const original = array.map((item) => item.value);
    const values = [...original];
	const indices = rangeArray(0, values.length - 1);
	let currCmd = init(values);

	function merge(start: number, mid: number, end: number) {
		const left = values.slice(start, mid);
		const right = values.slice(mid, end);
		let i = 0;
		let j = 0;
		let k = 0;
		while (i < left.length && j < right.length) {
			if (left[i] <= right[j]) {
				values[start + k] = left[i];
				indices[start + k] = original.indexOf(values[start + k]);

				i++;
			} else {
				values[start + k] = right[j];
				indices[start + k] = original.indexOf(values[start + k]);

				j++;
			}

            //const newInd = values.map(v => original.indexOf(v));
            // currCmd = setIndices(currCmd, newInd);
            currCmd = setIndices(currCmd, [...indices]);
			currCmd.swapping = [start + k];
            commands.push(currCmd);

			k++;
		}
		while (i < left.length) {
			values[start + k] = left[i];
			indices[start + k] = original.indexOf(values[start + k]);

            // const newInd = values.map(v => original.indexOf(v));
            // currCmd = setIndices(currCmd, newInd);
            currCmd = setIndices(currCmd, [...indices]);
			currCmd.swapping = [start + k];
            commands.push(currCmd);

			i++;
			k++;
		}
		while (j < right.length) {
			values[start + k] = right[j];
			indices[start + k] = original.indexOf(values[start + k]);
            
            // const newInd = values.map(v => original.indexOf(v));
            // currCmd = setIndices(currCmd, newInd);
            currCmd = setIndices(currCmd, [...indices]);
			currCmd.swapping = [start + k];
            commands.push(currCmd);

			k++;
			j++;
		}
	}

	function recursiveMergeSort(start: number, end: number) {
		const length = end - start;
		if (length < 2)
			return;

		const midPoint = Math.floor((start + end) / 2);

		// Visualize: First Half
		currCmd = compare(currCmd, rangeArray(start, midPoint - 1));
        commands.push(currCmd);
		recursiveMergeSort(start, midPoint);

		// Visualize: Second Half
		currCmd = compare(currCmd, rangeArray(midPoint, end - 1));
        commands.push(currCmd);
		recursiveMergeSort(midPoint, end);

		merge(start, midPoint, end);
	}

	recursiveMergeSort(0, values.length);

	commands.push({
		...currCmd,
		sorted: rangeArray(0, values.length - 1),
	});

	return commands;
};

export default mergeSort;
