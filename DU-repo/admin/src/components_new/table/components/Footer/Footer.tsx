import { Button, IconButton } from '@cerberus/react';
import {
  styledButtonContainer,
  styledCaretButtons,
  styledFooterContainer,
  styledPageButtons
} from '../../styles/react-table.styles';
import { CaretLeft, CaretRight } from '@cerberus/icons';
import { useEffect } from 'react';

export const Footer = ({ tableData, table, totalItems, searchTerm }) => {
  const dataLoadedString = `item${tableData?.length === 1 ? '' : 's'}`;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const firstItemIndex = pageIndex * pageSize + 1;
  const lastItemIndex = Math.min(firstItemIndex + pageSize - 1, totalItems);
  const totalPages = Math.ceil(totalItems / pageSize);
  const itemRangeText =
    totalItems > 0
      ? `${firstItemIndex.toLocaleString()} - ${lastItemIndex.toLocaleString()} of ${totalItems.toLocaleString()} ${dataLoadedString}`
      : `0 items`;

  useEffect(() => {
    table.setPageIndex(0);
  }, [searchTerm, table]);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 4) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (pageIndex <= 1) {
        for (let i = 0; i < 4; i++) {
          pages.push(i);
        }
      } else if (pageIndex >= totalPages - 2) {
        for (let i = totalPages - 4; i < totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = pageIndex - 1; i <= pageIndex + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };
  const handlePageChange = page => {
    table.setPageIndex(page);
  };

  return (
    <div className={styledFooterContainer}>
      <span>
        <div>{itemRangeText}</div>
      </span>
      {getPageNumbers().length > 1 && (
        <div className={styledButtonContainer}>
          <IconButton
            usage="ghost"
            ariaLabel="Previous Page"
            className={styledCaretButtons}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <CaretLeft />
          </IconButton>
          <div className={styledButtonContainer}>
            {getPageNumbers().map((page, index) => {
              return (
                <Button
                  usage={page === pageIndex ? 'filled' : 'outlined'}
                  key={`${page}_${index}`}
                  onClick={() => handlePageChange(page)}
                  className={styledPageButtons}
                >
                  {page + 1}
                </Button>
              );
            })}
          </div>
          <IconButton
            usage="ghost"
            ariaLabel="Next Page"
            className={styledCaretButtons}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <CaretRight />
          </IconButton>
        </div>
      )}
    </div>
  );
};
