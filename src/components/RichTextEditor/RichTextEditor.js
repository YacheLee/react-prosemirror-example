import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {createUseStyles} from 'react-jss';
import Divider from '@material-ui/core/Divider';
import EditorViewContext from "./contexts/EditorViewContext"
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';

const useStyles = createUseStyles({
    paper: {
        padding: 12
    }
});

function RichTextEditor({value, onChange}) {
    const classes = useStyles();
    const [editorView, setEditorView] = useState(null);

    return (
        <EditorViewContext.Provider value={{editorView, setEditorView}}>
            <Paper elevation={3} className={classes.paper}>
                {editorView && <Toolbar/>}
                <Divider light={true} />
                <div style={{margin: 12}}>
                    <Editor value={value} onChange={onChange}/>
                </div>
            </Paper>
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
