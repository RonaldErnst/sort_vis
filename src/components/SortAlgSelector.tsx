import algorithms from "../utils/sortingAlgorithms";
import { useAlg } from "../contexts/SortAlgContext";

export default function SortAlgSelector() {
	const sortingAlgs: string[] = algorithms.map(a => a.title);
	const { algName, setAlgorithm, sortArray } = useAlg();

	return (
		<div className="pt-8 flex flex-row justify-center items-center gap-8">
			{sortingAlgs.map((alg) => {
				return (
					<button
						key={alg}
						className={`py-4 px-8 rounded-lg hover:bg-slate-500 ${
							algName === alg ? "bg-slate-800" : "bg-slate-600"
						}`}
						onClick={() => setAlgorithm(alg, sortArray)}
					>
						{alg}
					</button>
				);
			})}
		</div>
	);
}
