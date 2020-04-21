import React, {Fragment, useContext} from 'react';
import {createUseStyles} from 'react-jss';
import cn from 'classnames';
import Popover from '@material-ui/core/Popover';
import {ArrowDropDown} from "@material-ui/icons";
import HeadingList from "./HeadingList";
import {BLACK_COLOR} from '../../../config';
import {EditorViewContext} from '../../../contexts';
import {changeHeading, getHeading} from '../../../utils';
import types from './types';

const useStyles = createUseStyles({
    root: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        color: ({disabled=false})=>{
            return disabled ? "grey" : BLACK_COLOR;
        },
        "&:hover": {
            cursor: "not-allowed"
        }
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    enabled_hover: {
        "&:hover": {
            cursor: "pointer"
        }
    },
    disabled_hover: {
        "&:hover": {
            cursor: "not-allowed"
        }
    },
});

function HeadingButton(){
    const {editorView} = useContext(EditorViewContext);
    const disabled = false;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const value = getHeading(editorView);
    const label = types[value];
    const classes = useStyles({disabled});
    const rootClassName = cn(classes.root, {[classes.enabled_hover]: !disabled, [classes.disabled_hover]: disabled});

    return <Fragment>
        <div className={rootClassName} onClick={({currentTarget}) => {
            if(!disabled){
                setAnchorEl(currentTarget);
            }
        }}>
            <span className={classes.center}>{label}</span>
            <span className={classes.center}><ArrowDropDown /></span>
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
            <div className={classes.popover}>
                <HeadingList value={value} onClick={(e, level) => {
                    changeHeading(e, editorView, level);
                    setAnchorEl(null);
                }} />
            </div>
        </Popover>
    </Fragment>;
}

HeadingButton.defaultProps = {
};

HeadingButton.propTypes = {
};

export default HeadingButton;
