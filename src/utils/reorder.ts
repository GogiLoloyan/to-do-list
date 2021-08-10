import { reorderEvent } from "interfaces";

export default function reorder({ array, sourceIndex, destinationIndex }: reorderEvent) {
    const result = Array.from(array);
    const [removed] = result.splice(sourceIndex, 1);
    result.splice(destinationIndex, 0, removed);
    return result;
  }
