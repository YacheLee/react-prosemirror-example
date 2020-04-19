import React, {useEffect, useRef} from 'react';
import {schema} from "prosemirror-schema-basic"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import './App.css';

function App() {
    const editor = useRef(null);
    const content = useRef(null);

    useEffect(() => {
        let doc = schema.node('doc', null, [
            schema.node('paragraph', null, [schema.text("One,")]),
            schema.node('horizontal_rule'),
            schema.node('paragraph', null, [schema.text("Two!")])
        ])
        let state = EditorState.create({
            doc
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
            <p>
                This is
                <strong>
                    strong text with
                    <em>emphasis</em>
                </strong>
            </p>
            <hr />
        </div>
      <div ref={editor} />
    </div>
  );
}

export default App;
