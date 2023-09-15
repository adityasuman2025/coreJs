import React from 'react';
import usePagination from "./usePagination";

export default function CustomHook() {
    const itemsPerPage = 10, totalItems = 35; //35
    const items = new Array(totalItems).fill(0).map((_, idx) => idx + 1);

    const [currentPageIdx, setCurrentPageIdx, getPaginationButtons, getCurrentPageItems] = usePagination({ itemsPerPage, totalItems });

    return (
        <div>
            {
                getCurrentPageItems(items).map(i => (
                    <div key={i}>{i}</div>
                ))
            }
            <br />

            <button
                disabled={currentPageIdx === 0}
                onClick={() => setCurrentPageIdx(currentPageIdx - 1)}
            >prev</button>
            {
                getPaginationButtons(items).map(i => (
                    <button
                        key={i}
                        onClick={() => setCurrentPageIdx(i - 1)}
                        style={{ background: (currentPageIdx === i - 1 ? "lime" : "") }}
                    >
                        {i}
                    </button>
                ))
            }
            <button
                disabled={currentPageIdx === Math.ceil(totalItems / itemsPerPage) - 1}
                onClick={() => setCurrentPageIdx(currentPageIdx + 1)}
            >next</button>
        </div>
    )
}