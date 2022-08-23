export interface Command {
    indices: number[],
    sorted: number[],
    comparing: number[],
    swapping: number[],
}

const init = (values: number[]): Command => {
    const indices = Array.from(Array(values.length).keys());
    return {
        indices: indices,
        comparing: [],
        sorted: [],
        swapping: []
    };
}

const setIndices = (currCmd: Command, indices: number[]): Command => {
    const swapping = [];
    for(let i = 0; i < indices.length; i++) {
        if(currCmd.indices[i] !== indices[i])
            swapping.push(currCmd.indices[i])
    }

    // Only highlight differences between new and old indices
    return {
        indices: indices,
        sorted: currCmd.sorted,
        comparing: [],
        swapping: swapping
    };
}

const swap = (currCmd: Command, indexA: number, indexB: number): Command => {
    const indices = [...currCmd.indices];
    const tempInd = indices[indexA];
    indices[indexA] = indices[indexB];
    indices[indexB] = tempInd;

    return {
        indices: indices,
        sorted: currCmd.sorted,
        comparing: [],
        swapping: [indexA, indexB],
    };
};

const compare = (currCmd: Command, indices: number[]): Command => {
    return {
        indices: currCmd.indices,
        sorted: currCmd.sorted,
        swapping: [],
        comparing: indices,
    };
};

const finishItem = (currCmd: Command, index: number): Command => {
    return {
        indices: currCmd.indices,
        comparing: [],
        swapping: [],
        sorted: [...currCmd.sorted, index],
    };
};

const rangeArray = (start: number, end: number) => {
    return [...Array.from(Array(end - start + 1).keys())].map(x => x + start);
}

export {
    rangeArray,
    init,
    swap,
    setIndices,
    compare,
    finishItem,
}