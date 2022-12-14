import { FC } from "react";
import { BarChart, YAxis, Bar, ResponsiveContainer, Cell } from "recharts";
import { useAlg } from "../contexts/SortAlgContext";

const SortArray: FC = () => {
	const { sortArray } = useAlg();

	return (
		<ResponsiveContainer width="100%" height={400}>
			<BarChart data={sortArray}>
				<YAxis type="number" hide={true} domain={[0, sortArray.length]}/>
				<Bar dataKey="value">
					{sortArray.map((item) => {
						return (
							<Cell
								key={item.key}
								className={
									item.correct ? "fill-green-500" : item.color
								}
							/>
						);
					})}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
};

export default SortArray;
