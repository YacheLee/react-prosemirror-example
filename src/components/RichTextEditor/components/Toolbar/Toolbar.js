import React, {useContext} from 'react';
import {createUseStyles} from 'react-jss';
import {setBlockType} from 'prosemirror-commands';
import EditorViewContext from '../../contexts/EditorViewContext';
import {getHeadingAttribute, getSchema} from '../../utils';
import BoldButton from './BoldButton';
import ItalicButton from './ItalicButton';
import UnderlineButton from './UnderlineButton';
import DelButton from './DelButton';
import TextColorButton from './TextColorButton';

const useStyles = createUseStyles({
    root: {
        width: '100%',
        flexWrap: "nowrap",
        overflowX: "auto",
        display: "flex",
        flex: '0 0 auto',
        flexShrink: 0,
        padding: 0,
    },
    division: {
        margin: 12,
        width: 'auto',
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        "&:hover": {
            cursor: "pointer"
        }
    }
});

function Toolbar() {
    const classes = useStyles();
    const {editorView} = useContext(EditorViewContext);

    return (
        <div className={classes.root} onMouseDown={e=>e.preventDefault()}>
            <select value={getHeadingAttribute(editorView)} onChange={(e)=>{
                e.preventDefault();
                editorView.focus();
                const schema = getSchema(editorView);

                let command;
                if(e.target.value===''){
                    command = setBlockType(schema.nodes.paragraph);
                }
                else{
                    command = setBlockType(schema.nodes.heading, {level: e.target.value});
                }
                command(editorView.state, editorView.dispatch);
            }}>
                <option value="">Normal text</option>
                <option value={1}>Heading 1</option>
                <option value={2}>Heading 2</option>
                <option value={3}>Heading 3</option>
                <option value={4}>Heading 4</option>
                <option value={5}>Heading 5</option>
                <option value={6}>Heading 6</option>
            </select>
            <BoldButton />
            <ItalicButton />
            <UnderlineButton />
            <DelButton />
            <TextColorButton />
        </div>
    );
}

Toolbar.defaultProps = {
};

Toolbar.propTypes = {
};

export default Toolbar;
