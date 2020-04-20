import React, {useState} from 'react';
import RichTextEditor from './components/RichTextEditor';

const defaultValue = {
    type: "doc",
    content: [{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"中文測試"}]}]
};

function App() {
    const [value, setValue] = useState(defaultValue);
    return (
        <div>
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
