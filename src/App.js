import React from 'react';
import RichTextEditor from './components/RichTextEditor';

const value = {
    type: "doc",
    content:[{"type":"paragraph","content":[{"type":"text","text":"asdadad"}]}]
};
function App() {
    return (
        <RichTextEditor value={value} onChange={(value)=>{
            console.log(value);
        }} />
    );
}

export default App;
