import React, {Fragment, useCallback, useContext, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {Schema} from 'prosemirror-model';
import {EditorState} from "prosemirror-state"
import {history, redo, undo} from "prosemirror-history";
import {keymap} from "prosemirror-keymap";
import {baseKeymap} from "prosemirror-commands";
import {EditorView} from "prosemirror-view"
import EditorViewContext from '../../contexts/EditorViewContext';

function Editor({value, onChange}) {
    const {editorView, setEditorView} = useContext(EditorViewContext);
    const editor = useRef(null);

    const init = useCallback(()=>{
        if(!editorView){
            const schema = new Schema({
                nodes: {
                    doc: {content: "block+"},
                    paragraph: {
                        group: "block",
                        content: "text*",
                        toDOM(node) { return ["p", 0] }
                    },
                    heading: {
                        attrs: {level: {default: 1}},
                        content: "inline*",
                        group: "block",
                        defining: true,
                        parseDOM: [
                            {
                                tag: "h1",
                                attrs: {level: 1}},
                            {tag: "h2", attrs: {level: 2}},
                            {tag: "h3", attrs: {level: 3}},
                            {tag: "h4", attrs: {level: 4}},
                            {tag: "h5", attrs: {level: 5}},
                            {tag: "h6", attrs: {level: 6}}
                        ],
                        toDOM(node) { return ["h" + node.attrs.level, 0] }
                    },
                    text: {
                        group: "inline",
                        inline: true
                    },
                },
                marks: {
                    strong: {
                        parseDOM: [{tag: "strong"}, {tag: "b"}],
                        toDOM: () => ['strong', 0]
                    },
                    em: {
                        parseDOM: [{tag: "i"}, {tag: "em"}, {style: "font-style=italic"}],
                        toDOM: () => ['em', 0]
                    },
                    u: {
                        parseDOM: [{tag: "u"}],
                        toDOM: () => ['u', 0]
                    },
                    del: {
                        parseDOM: [{tag: "del"}],
                        toDOM: () => ['del', 0]
                    },
                    textColor: {
                        attrs: { color: {} },
                        inclusive: true,
                        parseDOM: [
                            {
                                style: 'color',
                                getAttrs: function (value) {
                                    return {color: value};
                                },
                            },
                        ],
                        toDOM: (mark) => {
                            return [
                                'span',
                                {
                                    style: "color: " + mark.attrs.color,
                                },
                            ];
                        }
                    }
                }
            });
            const editorState = EditorState.create({
                schema,
                doc: schema.nodeFromJSON(value),
                plugins: [
                    history(),
                    keymap({'Mod-z': undo, 'Mod-y': redo}),
                    keymap(baseKeymap)
                ]
            })
            const editorView = new EditorView(editor.current, {
                state: editorState,
                autofocus: true,
                dispatchTransaction(transaction){
                    const newState = editorView.state.apply(transaction);
                    editorView.updateState(newState);
                    onChange(newState.toJSON().doc);
                }}
            )
            setEditorView(editorView);
        }
    }, [editorView, setEditorView, value, onChange]);

    useEffect(() => {
        init();
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
