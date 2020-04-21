import React, {useState} from 'react';
import RichTextEditor from './components/RichTextEditor';

const defaultValue = [
    {
        "type":"paragraph",
        "content":[
            {
                "marks": [{type: "textColor", attrs:{ color: "#00b8d9"}}],
                "type":"text",
                "text":"中文"
            }
        ]
    },
    {"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"中文"}]},
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"測試"}]},
    {"type":"paragraph","content":[{"type":"text","text":"asdadddddasda"}]}
];

function App() {
    const [value, setValue] = useState(defaultValue);
    return (
        <div style={{padding: 10}}>
            <RichTextEditor value={value} onChange={(value)=>{
                setValue(value);
            }} />
            <div style={{color: "green"}}>
                {JSON.stringify(value)}
            </div>
        </div>

    );
}

export default App;
