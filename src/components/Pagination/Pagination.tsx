import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
    currPage: number;
    onChangePage: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({ currPage, onChangePage }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={((event) => onChangePage(event.selected + 1))}
            pageRangeDisplayed={3}
            pageCount={3}
            forcePage={currPage - 1}
            previousLabel="<"
        />
    )
}
export default Pagination;