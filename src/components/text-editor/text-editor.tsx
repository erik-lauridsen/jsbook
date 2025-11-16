import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import './text-editor.css';
import { Cell } from '../../state';
import { useActions } from '../../hooks/use-actions';

interface TextCellProps {
  cell: Cell;
}

const TextEditor: React.FC<TextCellProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const editorWrapper = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!editorWrapper.current || !e.target || editorWrapper.current.contains(e.target as Node)) {
        return;
      }

      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className='text-editor' ref={editorWrapper}>
        <MDEditor
          value={cell.content || 'Click to edit'}
          onChange={(v) => {
            updateCell(cell.id, v || '');
          }}
        />
      </div>
    );
  }
  return (
    <div
      className='text-editor card'
      onClick={() => {
        setEditing(true);
      }}
    >
      <div className='card-content'>
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
};

export default TextEditor;
