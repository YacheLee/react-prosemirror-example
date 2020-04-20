import React, {useContext} from 'react';
import {setBlockType, toggleMark} from 'prosemirror-commands';
import EditorViewContext from '../../contexts/EditorViewContext';
import {getSchema, getType, markActive} from '../../utils';

function isValue(editorView, type_name){
    return !!markActive(editorView.state, getType(editorView, type_name));
}

function toggleType(e, editorView, type_name){
    e.preventDefault();
    editorView.focus()
    const type = getType(editorView, type_name);
    const command = toggleMark(type);
    command(editorView.state, editorView.dispatch, editorView);
}

function isHeadingActive(editorView){
    const schema = getSchema(editorView);
    const command = setBlockType(schema.nodes.heading, {level: 1});
    return !command(editorView.state, null, editorView);
}

function Toolbar() {
    const {editorView} = useContext(EditorViewContext);

    return (
        <div>
            <button style={{border: `solid ${isHeadingActive(editorView) ? "5px" : "1px"} blue`}} onClick={(e)=>{
                e.preventDefault();
                editorView.focus();

                const schema = getSchema(editorView);
                let command;
                if(isHeadingActive(editorView)){
                    command = setBlockType(schema.nodes.paragraph);
                }
                else{
                    command = setBlockType(schema.nodes.heading, {level: 1});
                }
                command(editorView.state, editorView.dispatch);
            }}>H1</button>
            <button style={{border: `solid ${isValue(editorView, 'strong') ? "5px" : "1px"} blue`}} onClick={e=>toggleType(e, editorView, 'strong')}>B</button>
            <button
                style={{border: `solid ${isValue(editorView, 'em') ? "5px" : "1px"} blue`}}
                onClick={e=>toggleType(e, editorView, 'em')}>I</button>
            <button
                style={{border: `solid ${isValue(editorView, 'u') ? "5px" : "1px"} blue`}}
                onClick={e=>toggleType(e, editorView, 'u')}>U</button>
            <button
                style={{border: `solid ${isValue(editorView, 'del') ? "5px" : "1px"} blue`}}
                onClick={e=>toggleType(e, editorView, 'del')}>D</button>
        </div>
    );
}

Toolbar.defaultProps = {
};

Toolbar.propTypes = {
};

export default Toolbar;
