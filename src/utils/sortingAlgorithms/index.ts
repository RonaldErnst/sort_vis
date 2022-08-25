import bubbleSort from "./bubbleSort";
import insertionSort from "./insertionSort";
import mergeSort from "./mergeSort";

const algorithms = [
  {
    title: "BubbleSort",
    alg: bubbleSort,
  },
  {
    title: "MergeSort",
    alg: mergeSort,
  },
  {
    title: "InsertionSort",
    alg: insertionSort,
  },
];

export default algorithms;
