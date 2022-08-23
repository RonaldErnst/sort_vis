import {
	PauseFill,
	PlayFill,
	SkipEndFill,
	SkipStartFill,
	SkipBackwardFill,
} from "react-bootstrap-icons";
import { useAlg } from "../contexts/SortAlgContext";
import Select from "react-select";

export default function AlgControls() {
	const options = [
		{ value: 100, label: "0.1s" },
		{ value: 250, label: "0.25s" },
		{ value: 500, label: "0.5s" },
		{ value: 1000, label: "1s" },
		{ value: 1500, label: "1.5s" },
		{ value: 2000, label: "2s" },
	];

	const {
		algName,
		running,
		currCmdIndex,
		commands,
		setDuration,
		stepBackward,
		stepForward,
		start,
		pause,
		reset,
	} = useAlg();

	function setDur(dur: number | undefined) {
		if (dur === undefined) throw new Error("Duration is undefined");

		setDuration(dur);
	}

	return (
		<div className="flex flex-col gap-y-2 items-center justify-center">
			<div className="flex flex-row gap-x-4 justify-center items-center">
				<button
					className="w-10 h-10 bg-slate-800 rounded-lg hover:bg-slate-600 disabled:bg-slate-600 disabled:text-gray-400"
					disabled={algName === null || currCmdIndex <= 0}
					onClick={() => {
						reset();
					}}
				>
					<SkipBackwardFill className="w-full h-full p-1" />
				</button>
				<button
					className="w-10 h-10 bg-slate-800 rounded-lg hover:bg-slate-600 disabled:bg-slate-600 disabled:text-gray-400"
					disabled={algName === null || currCmdIndex <= 0}
					onClick={() => {
						stepBackward();
					}}
				>
					<SkipStartFill className="w-full h-full" />
				</button>
				<button
					className="w-10 h-10 bg-slate-800 rounded-lg hover:bg-slate-600 disabled:bg-slate-600 disabled:text-gray-400"
					disabled={
						algName === null || currCmdIndex >= commands.length
					}
					onClick={() => {
						if (running) pause();
						else start();
					}}
				>
					{running ? (
						<PauseFill className="w-full h-full" />
					) : (
						<PlayFill className="w-full h-full" />
					)}
				</button>

				<button
					className="w-10 h-10 bg-slate-800 rounded-lg hover:bg-slate-600 disabled:bg-slate-600 disabled:text-gray-400"
					disabled={
						algName === null || currCmdIndex >= commands.length
					}
					onClick={() => {
						stepForward();
					}}
				>
					<SkipEndFill className="w-full h-full" />
				</button>
				<Select
					styles={{
						menu: (provided, state) => ({
							...provided,
							color: "black",
						}),
					}}
					options={options}
					defaultValue={options[2]}
					isClearable={false}
					onChange={(option) => setDur(option?.value)}
				/>
			</div>
			{commands.length <= 0 ? <br></br> : (
				<div className="flex flex-row gap-x-4 justify-center items-center">
					Step {currCmdIndex} / {commands.length}
				</div>
			)}
		</div>
	);
}
