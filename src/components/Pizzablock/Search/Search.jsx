import { useContext } from 'react';
import { SearchContext } from '../../../App';
import styles from './Search.module.scss';

function Search() {
    const { searchValue, setSearchValue } = useContext(SearchContext);

    return (
        <div
            className={styles.root}
        >
            <svg
                className={styles.icon}
                enable-background="new 0 0 64 64"
                id="EditableLine"
                version="1.1"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="14"
                    cy="14"
                    fill="none"
                    id="XMLID_42_"
                    r="9"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                >
                </circle>
                <line
                    fill="none"
                    id="XMLID_44_"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    x1="27"
                    x2="20.366"
                    y1="27"
                    y2="20.366"
                >
                </line>
            </svg>
            <input
                onChange={(e) => setSearchValue(e.target.value)}
                className={styles.input}
                placeholder="Поиск пиццы..."
                value={searchValue}
            />
            {searchValue && (
                <svg
                    onClick={() => setSearchValue('')}
                    className={styles.clear}
                    xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <path d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z" fill="black" />
                </svg>
            )}
        </div>
    )
}

export default Search;