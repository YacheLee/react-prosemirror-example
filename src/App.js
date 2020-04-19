import React, {useEffect, useRef} from 'react';
import {schema} from "prosemirror-schema-basic"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import './App.css';

function App() {
    const editor = useRef(null);
    const content = useRef(null);

    useEffect(() => {
        let state = EditorState.create({schema})
        let view = new EditorView(editor.current, {state})
    });
  return (
    <div className="ProseMirror-example-setup-style">
      <div ref={editor}>
          <div style={{display: "none"}} ref={content}>
              <h3>Hello ProseMirror</h3>
              <p>This is editable text. You can focus it and start typing.</p>
              <p>To apply styling, you can select a piece of text and manipulate
                  its styling from the menu. The basic schema
                  supports <em>emphasis</em>, <strong>strong
                      text</strong>, <a href="http://marijnhaverbeke.nl/blog">links</a>, <code>code
                      font</code>, and <img alt="img" src="https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg" /> images.</p>
              <p>Block-level structure can be manipulated with key bindings (try
                  ctrl-shift-2 to create a level 2 heading, or enter in an empty
                  textblock to exit the parent block), or through the menu.</p>
              <p>Try using the “list” item in the menu to wrap this paragraph in
                  a numbered list.</p>
          </div>
      </div>

    </div>
  );
}

export default App;
