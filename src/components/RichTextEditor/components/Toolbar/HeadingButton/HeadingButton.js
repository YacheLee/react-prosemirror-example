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
        color: BLACK_COLOR,
        "&:hover": {
            cursor: "pointer"
        }
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
});

function HeadingButton(){
    const {editorView} = useContext(EditorViewContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const value = getHeading(editorView);
    const label = types[value];
    const classes = useStyles();
    const rootClassName = cn(classes.root);

    return <Fragment>
        <div className={rootClassName} onClick={({currentTarget}) => {
            setAnchorEl(currentTarget);
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
                <HeadingList value={value} onClick={(level) => {
                    changeHeading(editorView, level);
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
