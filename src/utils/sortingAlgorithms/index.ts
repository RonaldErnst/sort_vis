import bubbleSort from "./bubbleSort";
import insertionSort from "./insertionSort";
import mergeSort from "./mergeSort";
import selectionSort from "./selectionSort";

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
  {
    title: "SelectionSort",
    alg: selectionSort
  }
];

export default algorithms;
