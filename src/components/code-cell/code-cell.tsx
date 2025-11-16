import React, { useEffect } from 'react';
import CodeEditor from '../code-editor/code-editor';
import Preview from '../preview/preview';
import Resizable from '../resizable/resizable';
import { Cell, CellTypes } from '../../state';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useTypedSelector<string[]>((state) => {
    const codeArr: string[] = [];
    const { data, order } = state.cells;
    for (let i = 0; i < order.length; i++) {
      const id = order[i];
      if (data[id].type === CellTypes.CODE_CELL) codeArr.push(data[id].content);
      if (id === cell.id) break;
    }
    return codeArr;
  });

  console.log(cumulativeCode);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'));
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'));
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode.join('\n'), cell.id, createBundle]);

  return (
    <div>
      <Resizable direction='vertical'>
        <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
          <Resizable direction={'horizontal'}>
            <CodeEditor initialValue={cell.content} onChange={(value: string) => updateCell(cell.id, value)} />
          </Resizable>
          <div className='progress-wrapper'>
            {!bundle || bundle.loading ? (
              <div className='progress-cover'>
                <progress className='progress is-small is=primary' max='100'>
                  Loading...
                </progress>
              </div>
            ) : (
              <Preview bundlingErr={bundle.err} code={bundle.code} />
            )}
          </div>
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
