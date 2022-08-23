import SortAlgSelector from "./components/SortAlgSelector";
import SortArray from "./components/SortArray";
import AlgControls from "./components/AlgControls";
import { AlgProvider } from "./contexts/SortAlgContext";
import ArrayControls from "./components/ArrayControls";

export default function App() {
	return (
		<AlgProvider>
			<div className="w-full h-full flex flex-col items-center gap-y-8">
				<SortAlgSelector />
				<AlgControls />
				<SortArray />
				<ArrayControls />
			</div>
		</AlgProvider>
	);
}
