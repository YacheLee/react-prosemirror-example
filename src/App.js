import React, {useEffect, useRef} from 'react';
import {schema} from "prosemirror-schema-basic"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import './App.css';

function App() {
    const editor = useRef(null);

    useEffect(() => {
        let state = EditorState.create({schema})
        let view = new EditorView(editor.current, {state, dispatchTransaction(transaction){
            console.log('Document size went from ', transaction.before.content.size, 'to', transaction.doc.content.size);
            let newState = view.state.apply(transaction);
            console.log(newState);
            view.updateState(newState);
        }})
    });
  return (
    <div className="ProseMirror-example-setup-style">
      <div ref={editor}>
      </div>
    </div>
  );
}

export default App;
