export enum CellTypes {
  CODE_CELL = 'code',
  TEXT_CELL = 'text',
}

export enum MoveDirections {
  MOVE_UP = 'move_up',
  MOVE_DOWN = 'move_down',
}

export interface Cell {
  id: string;
  type: CellTypes.CODE_CELL | CellTypes.TEXT_CELL;
  content: string;
}
