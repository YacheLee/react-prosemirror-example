import React, {useContext} from 'react';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import ToolbarButton from '../ToolbarButton';
import EditorViewContext from '../../../contexts/EditorViewContext';
import {isValue, toggleType} from '../../../utils';

function ItalicButton(){
    const {editorView} = useContext(EditorViewContext);
    const isActive = isValue(editorView, 'em');

    return <ToolbarButton component={FormatItalicIcon} isActive={isActive} onClick={e=>{
        toggleType(e, editorView, 'em');
    }}/>
}

export default ItalicButton;
