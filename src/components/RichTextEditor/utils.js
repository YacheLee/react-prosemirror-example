import {toggleMark} from 'prosemirror-commands';

export function markActive(state, type) {
    const ref = state.selection;
    const from = ref.from;
    const $from = ref.$from;
    const to = ref.to;
    const empty = ref.empty;
    if (empty) { return type.isInSet(state.storedMarks || $from.marks()) }
    else { return state.doc.rangeHasMark(from, to, type) }
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

export function getActiveColor(editorView) {
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

export function changeColor(editorView, color){
    const type = getType(editorView, 'textColor');
    const command = toggleMark(type, {color});
    command(editorView.state, editorView.dispatch, editorView);
}
