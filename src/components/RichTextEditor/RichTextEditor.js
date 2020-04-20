import React, {useState} from 'react';
import PropTypes from 'prop-types';
import EditorViewContext from "./contexts/EditorViewContext"
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';

function RichTextEditor({value, onChange}) {
    const [editorView, setEditorView] = useState(null);

    return (
        <EditorViewContext.Provider value={{editorView, setEditorView}}>
            {editorView && <Toolbar />}
            <Editor value={value} onChange={onChange} />
        </EditorViewContext.Provider>
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
