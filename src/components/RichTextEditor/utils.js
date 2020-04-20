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
