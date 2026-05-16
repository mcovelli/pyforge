import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorState } from '@codemirror/state';

export default function PythonEditor({ code, onChange, readOnly = false }) {
  const containerRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateListener = EditorView.updateListener.of(update => {
      if (update.docChanged && onChange) {
        onChange(update.state.doc.toString());
      }
    });

    const state = EditorState.create({
      doc: code || '',
      extensions: [
        basicSetup,
        python(),
        oneDark,
        updateListener,
        EditorView.theme({
          '&': { backgroundColor: '#0a0e1a', fontSize: '14px' },
          '.cm-content': { fontFamily: "'JetBrains Mono', monospace", padding: '8px 0' },
          '.cm-gutters': { backgroundColor: '#0a0e1a', borderRight: '1px solid #1e293b' },
          '.cm-activeLineGutter': { backgroundColor: '#111827' },
          '.cm-activeLine': { backgroundColor: 'rgba(0,212,255,0.05)' },
        }),
        ...(readOnly ? [EditorState.readOnly.of(true)] : []),
      ],
    });

    const view = new EditorView({ state, parent: containerRef.current });
    viewRef.current = view;

    return () => view.destroy();
  }, []);// eslint-disable-line

  // Update content when code prop changes externally
  useEffect(() => {
    if (viewRef.current && code !== undefined) {
      const currentDoc = viewRef.current.state.doc.toString();
      if (currentDoc !== code) {
        viewRef.current.dispatch({
          changes: { from: 0, to: currentDoc.length, insert: code }
        });
      }
    }
  }, [code]);

  return <div ref={containerRef} className="editor-container" />;
}
