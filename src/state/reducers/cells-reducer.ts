import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell, MoveDirections } from '../cell';
import produce from 'immer';
interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellsState = initialState, action: Action): CellsState | void => {
  /* eslint-disable @typescript-eslint/no-redeclare */
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      var { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    case ActionType.DELETE_CELL:
      //delete from both data obj and order array
      var id = action.payload;
      delete state.data[id];
      state.order = state.order.filter((cellId) => cellId !== id);
      return state;
    case ActionType.MOVE_CELL:
      var { id, direction } = action.payload;
      const index = state.order.findIndex((cellId) => cellId === id);
      const targetIndex = direction === MoveDirections.MOVE_UP ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= state.order.length) return state;
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id;
      return state;
    case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = {
        type: action.payload.type,
        id: uuid(),
        content: '',
      };
      state.data[cell.id] = cell;
      const foundIndex = state.order.findIndex((id) => id === action.payload.id);
      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else state.order.splice(foundIndex + 1, 0, cell.id);
      return state;
    default:
      return state;
  }
  /* eslint-enable @typescript-eslint/no-redeclare */
}, initialState);

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default reducer;
