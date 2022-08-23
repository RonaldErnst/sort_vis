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
    const values = [...original]
	let currCmd = init(values);

	function merge(start: number, mid: number, end: number) {
		const left = values.slice(start, mid);
		const right = values.slice(mid, end);
		let i = 0;
		let j = 0;
		let k = 0;
		while (i < left.length && j < right.length) {
			if (left[i] <= right[j]) {
				values[start + k++] = left[i++];
			} else {
				values[start + k++] = right[j++];
			}

            const newInd = values.map(v => original.indexOf(v));
            currCmd = setIndices(currCmd, newInd);
            commands.push(currCmd);
		}
		while (i < left.length) {
			values[start + k++] = left[i++];

            const newInd = values.map(v => original.indexOf(v));
            currCmd = setIndices(currCmd, newInd);
            commands.push(currCmd);
		}
		while (j < right.length) {
			values[start + k++] = right[j++];
            
            const newInd = values.map(v => original.indexOf(v));
            currCmd = setIndices(currCmd, newInd);
            commands.push(currCmd);
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
