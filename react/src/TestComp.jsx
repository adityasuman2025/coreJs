import React from 'react';

function TestComp({ text, onClick }) {
    return <button onClick={onClick}>{text}</button>;
}

export default TestComp;