import React, {useContext} from 'react';
import {toggleMark} from 'prosemirror-commands';
import EditorViewContext from '../../contexts/EditorViewContext';
import {markActive} from '../../utils';

function Toolbar() {
    const {editorView} = useContext(EditorViewContext);
    const type = editorView.state.schema.marks.strong;
    const isActive = !!markActive(editorView.state, type);

    return (
        <div>
            <button style={{border: `solid ${isActive ? "5px" : "1px"} blue`}} onClick={(e)=>{
                e.preventDefault();
                editorView.focus()
                const command = toggleMark(type);
                command(editorView.state, editorView.dispatch, editorView);
            }}>B</button>
        </div>
    );
}

Toolbar.defaultProps = {
};

Toolbar.propTypes = {
};

export default Toolbar;
