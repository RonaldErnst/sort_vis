import {
	createContext,
	useContext,
	FC,
	PropsWithChildren,
	useState,
	useCallback,
	useRef,
	useEffect,
	useMemo,
} from "react";
import algorithms from "../utils/sortingAlgorithms";
import { Command } from "../utils/helpers";
import useStateCallback from "../utils/useStateCallback";

export interface SortArrayItem {
	key: string;
	value: number;
	color: string;
	correct: boolean;
}

const COLORS = {
    COMPARE: "fill-yellow-500",
    SWAP: "fill-red-500",
    UNSORTED: "fill-blue-500",
    SORTED: "fill-green-500"
};

interface IContext {
	sortArray: SortArrayItem[];
	setArraySize: (size: number) => void;
	shuffleArray: () => void;
	reverseOrder: () => void;
	sortedOrder: () => void;

	algName: string | null;
	stepDuration: number;
	currCmdIndex: number;
	commands: Command[];
	running: boolean;
	setAlgorithm: (newAlg: string, sortArray: SortArrayItem[]) => void;
	calculateCommands: (newAlg: string, sortArray: SortArrayItem[]) => void;
	setDuration: (duration: number) => void;
	stepForward: () => void;
	stepBackward: () => void;
	start: () => void;
	pause: () => void;
	reset: () => void;
}
const AlgContext = createContext<IContext | undefined>(undefined);

function useAlg() {
	const context = useContext(AlgContext);

	if (context === undefined) throw new Error("Alg Context not initialized");

	return context;
}

const AlgProvider: FC<PropsWithChildren> = ({ children }) => {
	const [sortArray, setSortArray] = useStateCallback<SortArrayItem[]>(
		createArray(25)
	);

	const [algName, setAlgName] = useState<string | null>(null);
	const [stepDuration, setStepDuration] = useStateCallback(500);
	const [currCmdIndex, setCurrCmdIndex] = useState(0);
	const [commands, setCommands] = useState<Command[]>([]);
	const [timeoutIDs, setTimeoutIDs] = useState<NodeJS.Timer[]>([]);
	const origArray = useRef<SortArrayItem[] | null>(null);
	const running = useMemo(() => timeoutIDs.length > 0, [timeoutIDs]);

	function shuffleArray(): void {
		setSortArray(
			(oldArray) => createArray(oldArray.length).sort(() => Math.random() - 0.5),
			(array) => {
				if (algName === null) return;

				calculateCommands(algName, array);
			}
		);
	}

	function reverseOrder() {
		setSortArray(
			(oldArray) => createArray(oldArray.length).sort((a, b) => b.value - a.value),
			(array) => {
				if (algName === null) return;

				calculateCommands(algName, array);
			}
		);
	}

	function sortedOrder() {
		setSortArray(
			(oldArray) => createArray(oldArray.length).sort((a, b) => a.value - b.value),
			(array) => {
				if (algName === null) return;

				calculateCommands(algName, array);
			}
		);
	}

	function createArray(size: number): SortArrayItem[] {
		return Array.from(Array(size).keys()).map((num) => {
			return {
				key: `${num + 1}`,
				value: num + 1,
				color: COLORS.UNSORTED,
				correct: false,
			};
		});
	}

	function setArraySize(size: number) {
		setSortArray(createArray(size), (array) => {
			if (algName === null) return;

			calculateCommands(algName, array);
		});
	}

	const clearTimeouts = useCallback(() => {
		timeoutIDs.forEach((tid) => clearTimeout(tid));
		setTimeoutIDs([]);
	}, [timeoutIDs]);

	function setAlgorithm(newAlg: string, sortArray: SortArrayItem[]) {
		setAlgName(newAlg);
		calculateCommands(newAlg, sortArray);
	}

	function calculateCommands(newAlg: string, sortArray: SortArrayItem[]) {
		clearTimeouts();
		setCurrCmdIndex(0);
		origArray.current = sortArray;
		setCommands(sort(newAlg, sortArray));
	}

	function sort(algName: string, sortArray: SortArrayItem[]): Command[] {
		let cmds: Command[] = [];

		const algorithm = algorithms.find(a => a.title === algName);

		if(algorithm !== undefined)
			cmds = algorithm.alg(sortArray);

		return cmds;
	}

	// When currCmdIndex has changed
	// Display command
	useEffect(() => {
		if (
			commands.length === 0 ||
			currCmdIndex < 0 ||
			currCmdIndex > commands.length
		)
			return;

        if(currCmdIndex === 0) {
            setSortArray(origArray.current!);
            return;
        }

		const cmd = commands[currCmdIndex - 1];

        const newArray = cmd.indices.map(i => origArray.current![i]);

        newArray.forEach((item, i) => {
            let color;
            if(cmd.sorted.includes(i))
                color = COLORS.SORTED;
            else if(cmd.comparing.includes(i))
                color = COLORS.COMPARE;
            else if(cmd.swapping.includes(i))
                color = COLORS.SWAP;
            else
                color = COLORS.UNSORTED;

            newArray[i] = {...item, color};
        });

		setSortArray(newArray);
	}, [commands, currCmdIndex, setSortArray]);

	const run = (cmds: Command[], duration: number) => {
		const timeouts = [];

		cmds.forEach((_, i) => {
			const timeoutID = setTimeout(() => {
				setCurrCmdIndex((ind) => ind + 1);
			}, i * duration);

			timeouts.push(timeoutID);
		});

		timeouts.push(
			setTimeout(() => {
				clearTimeouts();
			}, (timeouts.length - 1) * duration)
		);

		setTimeoutIDs(timeouts);
	};

	function start(duration = stepDuration) {
		const cmdSlice = commands.slice(currCmdIndex);
		run(cmdSlice, duration);
	}

	function pause() {
		clearTimeouts();
	}

	function reset() {
		if (algName === null || origArray.current === null) return;

		clearTimeouts();
		setCurrCmdIndex(0);
	}

	function stepForward() {
		pause();

		if (currCmdIndex >= commands.length) return;

		setCurrCmdIndex((ind) => ind + 1);
	}

	function stepBackward() {
		pause();

		if (currCmdIndex <= 0) return;

		setCurrCmdIndex((ind) => ind - 1);
	}

	function setDuration(duration: number) {
		// Run last step normally, clear all other steps
		timeoutIDs.forEach((tid, i) => {
			if (i >= currCmdIndex) clearTimeout(tid);
		});

		setStepDuration(duration, (dur) => {
			if (running) {
				const cmdSlice = commands.slice(currCmdIndex);
				setTimeout(() => {
					// Wait a little bit so the next step won't start immediately
					run(cmdSlice, dur);
				}, dur);
			}
		});
	}

	const value = {
		sortArray,
		shuffleArray,
		reverseOrder,
		sortedOrder,
		setArraySize,

		algName,
		stepDuration,
		currCmdIndex,
		commands,
		running,
		setAlgorithm,
		calculateCommands,
		setDuration,
		stepForward,
		stepBackward,
		start,
		pause,
		reset,
	};

	return <AlgContext.Provider value={value}>{children}</AlgContext.Provider>;
};

export { AlgProvider, useAlg };
