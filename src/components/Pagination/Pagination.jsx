import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

function Pagination({ currPage, onChangePage }) {
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
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination;