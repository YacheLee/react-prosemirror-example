import React, {useContext} from 'react';
import {toggleMark} from 'prosemirror-commands';
import EditorViewContext from '../../contexts/EditorViewContext';
import {getType, markActive} from '../../utils';

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

function Toolbar() {
    const {editorView} = useContext(EditorViewContext);

    return (
        <div>
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
