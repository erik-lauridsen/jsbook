import { useEffect, useRef } from 'react';
import './preview.css';

interface PreviewProps {
  code: string;
  bundlingErr: string;
}

const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <div id="handleErr"></div>
      <script>
      const handleError = (err) => {
        const node = document.getElementById('handleErr');
        node.innerHTML = err ? '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>' : "";   
      };
      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error)
      });
        window.addEventListener('message', (event) => {
          try {
            var root = document.querySelector("#root");
            root.innerHTML = "";
            eval(event.data);
            handleError("");
          } catch (err) {
            handleError(err);
          }
        }, false);
      </script>
    </body>
  </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, bundlingErr }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className='iframe-preview-wrapper'>
      <iframe ref={iframe} title='preview' srcDoc={html} sandbox='allow-scripts' />
      {bundlingErr && <div className='preview-error'>{bundlingErr}</div>}
    </div>
  );
};

export default Preview;
