import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Schema} from 'prosemirror-model';
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {toggleMark} from "prosemirror-commands"

function markActive(state, type) {
    const ref = state.selection;
    const from = ref.from;
    const $from = ref.$from;
    const to = ref.to;
    const empty = ref.empty;
    if (empty) { return type.isInSet(state.storedMarks || $from.marks()) }
    else { return state.doc.rangeHasMark(from, to, type) }
}

function RichTextEditor({value, onChange}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [schema, setSchema] = useState(null);
    const [editorView, setEditorView] = useState(null);
    const editor = useRef(null);

    const init = useCallback(()=>{
        if(!isLoading && !editorView){
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
            console.log(_schema);

            const _editorState = EditorState.create({
                schema: _schema,
                doc: _schema.nodeFromJSON(value)
            })
            const _editorView = new EditorView(editor.current, {
                state: _editorState,
                autofocus: true,
                dispatchTransaction(transaction){
                    let newState = _editorView.state.apply(transaction);
                    _editorView.updateState(newState);
                    setIsActive(!!markActive(_editorView.state, _schema.marks.strong));
                    onChange(newState.toJSON());
                }}
            )
            setSchema(_schema);
            setEditorView(_editorView);
            setIsLoading(false);
        }
    }, [isLoading, editorView, value, onChange]);

    useEffect(() => {
        init()
    }, [init]);

    return (
        <Fragment>
            {isLoading ?
                <div>Loading</div> :
                <div className="ProseMirror-example-setup-style">
                    <button style={{border: `solid ${isActive ? "5px" : "1px"} blue`}} onClick={(e)=>{
                        e.preventDefault();
                        editorView.focus()
                        const command = toggleMark(schema.marks.strong);
                        command(editorView.state, editorView.dispatch, editorView);
                    }}>B</button>
                </div>
            }
            <div style={{border: "solid 1px red"}} ref={editor} />
        </Fragment>
    );
}

RichTextEditor.defaultProps = {
    value: {
        type: "doc",
        content: []
    },
    onChange: ()=>{}
};

RichTextEditor.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func
};

export default RichTextEditor;
