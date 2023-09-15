import React, { useState } from "react";

function usePagination({ itemsPerPage, totalItems }) {
    const [currentPageIdx, setCurrentPageIdx] = useState(0);

    function getCurrentPageItems(items) {
        const start = itemsPerPage * currentPageIdx;
        const end = start + itemsPerPage;

        return items.slice(start, end);
    }

    function getPaginationButtons() {
        const buttonsCount = Math.ceil(totalItems / itemsPerPage);

        return new Array(buttonsCount).fill(0).map((_, idx) => idx + 1);
    }

    return [
        currentPageIdx,
        setCurrentPageIdx,
        getPaginationButtons,
        getCurrentPageItems,
    ]
}

export default usePagination;
