import {toggleMark} from 'prosemirror-commands';
import {HEADING_DEFAULT_TYPE} from './components/Toolbar/HeadingButton/types';

export function isValue(editorView, type_name){
    return !!markActive(editorView.state, getType(editorView, type_name));
}

export function markActive(state, type) {
    const ref = state.selection;
    const from = ref.from;
    const $from = ref.$from;
    const to = ref.to;
    const empty = ref.empty;
    if (empty) { return type.isInSet(state.storedMarks || $from.marks()) }
    else { return state.doc.rangeHasMark(from, to, type) }
}

export function toggleType(e, editorView, type_name){
    e.preventDefault();
    editorView.focus()
    const type = getType(editorView, type_name);
    const command = toggleMark(type);
    command(editorView.state, editorView.dispatch, editorView);
}

export function getHeadingAttribute(editorView){
    const node = getTopLevelNode(editorView);
    if(!node){
        return HEADING_DEFAULT_TYPE;
    }
    const {type, attrs} = node;
    if(type.name==='heading'){
        return String(attrs.level);
    }
    return HEADING_DEFAULT_TYPE;
}

export function getSchema(editorView){
    return editorView.state.schema;
}

export function getMarks(editorView){
    return getSchema(editorView).marks;
}

export function getType(editorView, name=""){
    return getMarks(editorView)[name];
}

export function getTopLevelNode(editorView){
    return editorView.state.selection.$from.node(1);
}

export function getColor(editorView) {
    const state = editorView.state;
    let {$from, $to, $cursor} = state.selection;
    const textColor = state.schema.marks.textColor;
    let marks = [];
    if ($cursor) {
        marks.push(textColor.isInSet(state.storedMarks || $cursor.marks()) || undefined);
    }
    else {
        state.doc.nodesBetween($from.pos, $to.pos, function (currentNode) {
            if (currentNode.isLeaf) {
                let mark = textColor.isInSet(currentNode.marks) || undefined;
                marks.push(mark);
                return !mark;
            }
            return true;
        });
    }
    let prevMark;
    marks = marks.filter(function (mark) {
        if (mark && prevMark && mark.attrs.color === prevMark.attrs.color) {
            return false;
        }
        prevMark = mark;
        return true;
    });
    const marksWithColor = marks.filter(function (mark) { return !!mark; });
    if (marksWithColor.length > 1 ||
        (marksWithColor.length === 1 && marks.length > 1)) {
        return null;
    }
    return marksWithColor.length
        ? marksWithColor[0].attrs.color
        : "black";
}

function removeColor(){ return (state, dispatch) =>{
    let {schema, selection, tr} = state;
    const textColor = schema.marks.textColor;
    const {from, to, $cursor} = selection;
    if ($cursor) {
        tr = state.tr.removeStoredMark(textColor);
    }
    else {
        tr = state.tr.removeMark(from, to, textColor);
    }
    dispatch(tr.scrollIntoView());
    return true;
};}

export function toggleColor(editorView, color){
    const type = getType(editorView, 'textColor');
    const command = toggleMark(type, {color});
    command(editorView.state, editorView.dispatch, editorView);
}

export function changeColor(editorView, color, state, dispatch) {
    removeColor()(state, dispatch);
    toggleColor(editorView, color);
}
