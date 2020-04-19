import React, {useEffect, useRef} from 'react';
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"
import './App.css';

const data = window.data = {"doc":{"type":"doc","content":[{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Hello ProseMirror"}]},{"type":"paragraph","content":[{"type":"text","text":"This is editable text. You can focus it and start typing."}]},{"type":"paragraph","content":[{"type":"text","text":"To apply styling, you can select a piece of text and manipulate its styling from the menu. The basic schema supports "},{"type":"text","marks":[{"type":"em"}],"text":"emphasis"},{"type":"text","text":", "},{"type":"text","marks":[{"type":"strong"}],"text":"strong text"},{"type":"text","text":", "},{"type":"text","marks":[{"type":"link","attrs":{"href":"http://marijnhaverbeke.nl/blog","title":null}}],"text":"links"},{"type":"text","text":", "},{"type":"text","marks":[{"type":"code"}],"text":"code font"},{"type":"text","text":", and "},{"type":"image","attrs":{"src":"https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg","alt":"img","title":null}},{"type":"text","text":" images."}]},{"type":"paragraph","content":[{"type":"text","text":"Block-level structure can be manipulated with key bindings (try ctrl-shift-2 to create a level 2 heading, or enter in an empty textblock to exit the parent block), or through the menu."}]},{"type":"paragraph","content":[{"type":"text","text":"Try using the “list” item in the menu to wrap this paragraph in a numbered list."}]}]},"selection":{"type":"node","anchor":241}};

function App() {
    const editor = useRef(null);
    const content = useRef(null);

    useEffect(() => {
        const mySchema = window.mySchema = new Schema({
            nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
            marks: schema.spec.marks
        })

        window.view = new EditorView(editor.current, {
            state: EditorState.create({
                doc: window.mySchema.nodeFromJSON(data.doc),
                plugins: exampleSetup({schema: mySchema})
            })
        })
    });
  return (
    <div className="ProseMirror-example-setup-style">
      <div ref={editor}>
          <div style={{display: "none"}} ref={content} />
      </div>
    </div>
  );
}

export default App;
