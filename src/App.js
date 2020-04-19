import React, {useEffect, useRef} from 'react';
import {DOMParser} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import './App.css';

function App() {
    const editor = useRef(null);
    const content = useRef(null);

    useEffect(() => {
        let state = EditorState.create({
            doc: DOMParser.fromSchema(schema).parse(content.current)
        })
        let view = new EditorView(editor.current, {state, dispatchTransaction(transaction){
            console.log('Document size went from ', transaction.before.content.size, 'to', transaction.doc.content.size);
            let newState = view.state.apply(transaction);
            console.log(newState);
            view.updateState(newState);
        }})
    });
  return (
    <div className="ProseMirror-example-setup-style">
        <div ref={content}>
            asdakljl
            adsada
            ad
            嘿嘿嘿
            安安安
        </div>
      <div ref={editor} />
    </div>
  );
}

export default App;
