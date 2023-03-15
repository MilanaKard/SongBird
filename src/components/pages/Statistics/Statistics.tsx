import './Statistics.scss';
import { useAppSelector } from '../../../hooks/redux';
import { useActions } from '../../../hooks/actions';
import ReactPaginate from 'react-paginate';
import { useEffect } from 'react';
import Loader from '../../Loader/Loader';
import { useGetPlayersQuery } from '../../../store/api';

const Statistics = (): JSX.Element => {
  const { dictionary } = useAppSelector((state) => state.language);
  const { currentResults, pageCount, currentPage, sortParams } = useAppSelector(
    (state) => state.result
  );
  const { setPage, sortResults } = useActions();
  const { data, isError, isLoading, isFetching } = useGetPlayersQuery();

  useEffect(() => {
    if (data) {
      sortResults(sortParams);
      setPage(currentPage);
    }
  }, [data]);

  const handlePageClick = (data: { selected: number }) => {
    setPage(data.selected);
  };

  const handleScoreButtonClick = () => {
    sortResults({ sortBy: 'score', order: sortParams.order === 'asc' ? 'desc' : 'asc' });
    setPage(currentPage);
  };

  return (
    <div className="container">
      <table className="table">
        <thead className="table-head">
          <tr>
            <th>
              <div className="table-head-cell">№</div>
            </th>
            <th>
              <div className="table-head-cell table-head-name">{dictionary.name}</div>
            </th>
            <th>
              <div className="table-head-cell">{dictionary.date}</div>
            </th>
            <th>
              <div
                className="table-head-cell table-clickable sort-score"
                onClick={handleScoreButtonClick}
              >
                {dictionary.score}
                <span
                  className={`arrow ${sortParams.sortBy === 'score' ? sortParams.order : ''}`}
                ></span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="table-body">
          {currentResults?.map((result, index) => (
            <tr key={result.date.toString()}>
              <td>
                <div>{index + 1}</div>
              </td>
              <td>
                <div>{result.name}</div>
              </td>
              <td>
                <div>
                  {result.date.toString().substring(0, 10)}{' '}
                  {result.date.toString().substring(11, 16)}
                </div>
              </td>
              <td>
                <div>{result.score}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!!pageCount && (
        <ReactPaginate
          previousLabel={<p>&#8592;</p>}
          nextLabel={<p>&#8594;</p>}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'page-active'}
          disabledClassName={'page-disabled'}
        />
      )}
      {(isLoading || isFetching) && <Loader />}
      {isError && dictionary.error}
    </div>
  );
};

export default Statistics;
