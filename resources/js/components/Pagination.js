import React, { useState, useEffect } from 'react';

export default function Pagination({ dataContainerClasses, strings, locale, data, RenderComponent, title, pageLimit, dataLimit }) {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <div>
            {/* show the posts, 10 posts at a time */}
            <div className={dataContainerClasses ? dataContainerClasses : ""}>
                {getPaginatedData().map((d, idx) => (
                    <RenderComponent key={idx} property={d} strings={strings} locale={locale} />
                ))}
            </div>

            {/* show the pagiantion
            it consists of next and previous buttons
            along with page numbers, in our case, 5 page
            numbers at a time
        */}
            <div className="pagination">
                {/* previous button */}
                <button
                    onClick={goToPreviousPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                >{
                    locale=='ar'?
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.2381 12.856C18.7045 12.3896 18.7045 11.6104 18.2381 11.1428L7.47715 0.354267C7.00479 -0.118089 6.23876 -0.118089 5.7676 0.354267C5.29524 0.826624 5.29524 1.59385 5.7676 2.06621L15.6737 12L5.7664 21.9325C5.29404 22.406 5.29404 23.1721 5.7664 23.6456C6.23876 24.118 7.00479 24.118 7.47595 23.6456L18.2381 12.856Z" fill={currentPage === 1 ? '#6A6A6A' : "#02044F"} />
                    </svg>:
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.76189 11.144C5.29552 11.6104 5.29552 12.3896 5.76189 12.8572L16.5229 23.6457C16.9952 24.1181 17.7612 24.1181 18.2324 23.6457C18.7048 23.1734 18.7048 22.4061 18.2324 21.9338L8.32627 12L18.2336 2.06751C18.706 1.59395 18.706 0.827919 18.2336 0.354366C17.7612 -0.11799 16.9952 -0.11799 16.524 0.354366L5.76189 11.144Z" fill={currentPage === 1 ? '#6A6A6A' : "#02044F"}/>
                    </svg>}
                </button>

                {/* show page numbers */}
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                {/* next button */}
                <button
                    onClick={goToNextPage}
                    className={`next ${currentPage === pages ? 'disabled' : ''}`}
                >
                    {locale=="ar"?
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.76189 11.144C5.29552 11.6104 5.29552 12.3896 5.76189 12.8572L16.5229 23.6457C16.9952 24.1181 17.7612 24.1181 18.2324 23.6457C18.7048 23.1734 18.7048 22.4061 18.2324 21.9338L8.32627 12L18.2336 2.06751C18.706 1.59395 18.706 0.827919 18.2336 0.354366C17.7612 -0.11799 16.9952 -0.11799 16.524 0.354366L5.76189 11.144Z" fill={currentPage === pages ? '#6A6A6A' : "#02044F"} />
            </svg>  :  
                
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.2381 12.856C18.7045 12.3896 18.7045 11.6104 18.2381 11.1428L7.47715 0.354267C7.00479 -0.118089 6.23876 -0.118089 5.7676 0.354267C5.29524 0.826624 5.29524 1.59385 5.7676 2.06621L15.6737 12L5.7664 21.9325C5.29404 22.406 5.29404 23.1721 5.7664 23.6456C6.23876 24.118 7.00479 24.118 7.47595 23.6456L18.2381 12.856Z" fill={currentPage === pages ? '#6A6A6A' : "#02044F"} />
                    </svg>}
                </button>
            </div>
        </div>
    );
}