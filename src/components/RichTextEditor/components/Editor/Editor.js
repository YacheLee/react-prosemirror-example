import React, {Fragment, useCallback, useContext, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {Schema} from 'prosemirror-model';
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import EditorViewContext from '../../contexts/EditorViewContext';

function Editor({value, onChange}) {
    const {editorView, setEditorView} = useContext(EditorViewContext);
    const editor = useRef(null);

    const init = useCallback(()=>{
        if(!editorView){
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
                    },
                    em: {
                        parseDOM: [{tag: "i"}, {tag: "em"}, {style: "font-style=italic"}],
                        toDOM: function toDOM() { return ['em', 0] }
                    }
                }
            });
            const _editorState = EditorState.create({
                schema: _schema,
                doc: _schema.nodeFromJSON(value)
            })
            const _editorView = new EditorView(editor.current, {
                state: _editorState,
                autofocus: true,
                dispatchTransaction(transaction){
                    const newState = _editorView.state.apply(transaction);
                    _editorView.updateState(newState);
                    onChange(newState.toJSON());
                }}
            )
            setEditorView(_editorView);
        }
    }, [editorView, setEditorView, value, onChange]);

    useEffect(() => {
        init()
    }, [init]);

    return (
        <Fragment>
            <div style={{border: "solid 1px red"}} ref={editor} />
        </Fragment>
    );
}

Editor.defaultProps = {
    value: {
        type: "doc",
        content: []
    },
    onChange: ()=>{}
};

Editor.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func
};

export default Editor;
