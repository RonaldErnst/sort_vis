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
    const values = array.map((item) => item.value);
	const indices = rangeArray(0, values.length - 1);
	let currCmd = init(values);

	function merge(start: number, mid: number, end: number) {
		const leftInd = indices.slice(start, mid);
		const rightInd = indices.slice(mid, end);

		let i = 0;
		let j = 0;
		let k = 0;
		while (i < leftInd.length && j < rightInd.length) {
			if (values[leftInd[i]] <= values[rightInd[j]]) {
				indices[start + k] = leftInd[i];
				i++;
			} else {
				indices[start + k] = rightInd[j];
				j++;
			}

            currCmd = setIndices(currCmd, [...indices]);
			currCmd.swapping = [start + k];
            commands.push(currCmd);

			k++;
		}
		while (i < leftInd.length) {
			indices[start + k] = leftInd[i];

            currCmd = setIndices(currCmd, [...indices]);
			currCmd.swapping = [start + k];
            commands.push(currCmd);

			i++;
			k++;
		}
		while (j < rightInd.length) {
			indices[start + k] = rightInd[j];
            
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
