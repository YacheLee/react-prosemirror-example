import React, {useContext} from 'react';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import ToolbarButton from '../ToolbarButton';
import EditorViewContext from '../../../contexts/EditorViewContext';
import {isValue, toggleType} from '../../../utils';

function UnderlineButton(){
    const {editorView} = useContext(EditorViewContext);
    const isActive = isValue(editorView, 'u');

    return <ToolbarButton component={FormatUnderlinedIcon} isActive={isActive} onClick={e=>{
        toggleType(e, editorView, 'u');
    }}/>
}

export default UnderlineButton;
