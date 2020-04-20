import React, {useEffect, useRef, useState} from 'react';
import {Schema} from 'prosemirror-model';
import {EditorState} from "prosemirror-state"
//import {EditorState} from "prosemirror-example-setup"
import {EditorView} from "prosemirror-view"
import {toggleMark} from "prosemirror-commands"
import './App.css';

function markActive(state, type) {
    var ref = state.selection;
    var from = ref.from;
    var $from = ref.$from;
    var to = ref.to;
    var empty = ref.empty;
    if (empty) { return type.isInSet(state.storedMarks || $from.marks()) }
    else { return state.doc.rangeHasMark(from, to, type) }
}

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [schema, setSchema] = useState(null);
    const [editorView, setEditorView] = useState(null);
    const editor = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        const _schema = new Schema({
            nodes: {
                doc: {content: "paragraph+"},
                paragraph: {
                    content: "text*",
                    toDOM(node) { return ["p", 0] }
                },
                text: {inline: true}
            },
            marks: {
                strong: {
                    toDOM: ()=>{
                        return ['strong', 0];
                    }
                }
            }
        });
        const _editorState = EditorState.create({
            schema: _schema,
        })
        const _editorView = new EditorView(editor.current, {state: _editorState})
        setSchema(_schema);
        setEditorView(_editorView);
        setIsLoading(false);
    }, [isLoading]);

    return (
        <div className="ProseMirror-example-setup-style">
            {!isLoading && <input type="checkbox" checked={!!markActive(editorView.state, schema.marks.strong)} />}
            {!isLoading && <button onClick={()=>{
                const command = toggleMark(schema.marks.strong);
                command(editorView.state, editorView.dispatch, editorView);
                console.log(markActive(editorView.state, schema.marks.strong));
            }}>B</button>}
            <div style={{border: "solid 1px red"}} ref={editor} />
        </div>
    );
}

export default App;
