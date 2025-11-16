import { useTypedSelector } from '../../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from '../add-cell/add-cell';
import { Fragment } from 'react/jsx-runtime';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell) => {
    return (
      <Fragment key={cell.id}>
        <AddCell previousCellId={cell.id} />
        <CellListItem cell={cell} />
      </Fragment>
    );
  });
  return (
    <div>
      <AddCell previousCellId={null} forceVisible={cells.length === 0} />
      {renderedCells}
    </div>
  );
};

export default CellList;
