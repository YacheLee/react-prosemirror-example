import React, {Fragment, useContext} from 'react';
import {CompactPicker} from 'react-color';
import {createUseStyles} from 'react-jss';
import Popover from '@material-ui/core/Popover';
import AButton from './AButton';
import {EditorViewContext} from '../../../contexts';
import {changeColor, getActiveColor} from '../../../utils';

const useStyles = createUseStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
            cursor: "pointer"
        }
    },
});

function TextColorButton() {
    const classes = useStyles();
    const {editorView} = useContext(EditorViewContext);
    const color = getActiveColor(editorView);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return <Fragment>
        <div className={classes.root}>
            <AButton color={color} onClick={({currentTarget}) => {
                setAnchorEl(currentTarget);
            }}/>
        </div>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={() => {
                setAnchorEl(null);
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <CompactPicker onChangeComplete={({hex: value}) => {
                changeColor(editorView, value, editorView.state, editorView.dispatch);
                setAnchorEl(null);
            }}/>
        </Popover>
    </Fragment>;
}

export default TextColorButton;
