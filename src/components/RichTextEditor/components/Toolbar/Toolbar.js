import React, {useContext} from 'react';
import {setBlockType, toggleMark} from 'prosemirror-commands';
import EditorViewContext from '../../contexts/EditorViewContext';
import {getSchema, getTopLevelNode, getType, markActive} from '../../utils';

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

function getHeadingAttribute(editorView){
    const node = getTopLevelNode(editorView);
    if(!node){
        return "";
    }
    const {type, attrs} = node;
    if(type.name==='heading'){
        return attrs.level;
    }
    return "";
}

function Toolbar() {
    const {editorView} = useContext(EditorViewContext);

    return (
        <div>
            <select value={getHeadingAttribute(editorView)} readOnly={true} onChange={(e)=>{
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
