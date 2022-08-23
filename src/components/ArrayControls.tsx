import { useAlg } from "../contexts/SortAlgContext";
import Select from "react-select";
import { Shuffle, SortDown, SortDownAlt } from "react-bootstrap-icons";

export default function ArrayControls() {
	const options = [
		{ value: 10, label: 10 },
		{ value: 25, label: 25 },
		{ value: 50, label: 50 },
		{ value: 100, label: 100 },
		{ value: 150, label: 150 },
		{ value: 200, label: 200 },
		{ value: 250, label: 250 },
	];

	const { shuffleArray, reverseOrder, sortedOrder, setArraySize } = useAlg();

	function setSize(size: number | undefined) {
		if (size === undefined) throw new Error("Size is undefined");

		setArraySize(size);
	}

	return (
		<div className="flex flex-row gap-x-4 justify-center items-center">
			<button
				className="w-10 h-10 p-2 bg-slate-800 rounded-lg hover:bg-slate-600"
				onClick={shuffleArray}
			>
				<Shuffle className="w-full h-full" />
			</button>
			<button
				className="w-10 h-10 p-2 bg-slate-800 rounded-lg hover:bg-slate-600"
				onClick={sortedOrder}
			>
				<SortDownAlt className="w-full h-full" />
			</button>
			<button
				className="w-10 h-10 p-2 bg-slate-800 rounded-lg hover:bg-slate-600"
				onClick={reverseOrder}
			>
				<SortDown className="w-full h-full" />
			</button>
			<Select
				styles={{
					menu: (provided, state) => ({
						...provided,
						color: "black",
					}),
				}}
				options={options}
				defaultValue={options[1]}
				isClearable={false}
				onChange={(option) => setSize(option?.value)}
			/>
		</div>
	);
}
