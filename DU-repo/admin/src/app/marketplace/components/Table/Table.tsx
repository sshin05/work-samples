'use client';
import {
  Show,
  Table as CerberusTable,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Button,
  Input,
  Field,
  Select,
  Option,
  Label,
  IconButton,
  Spinner
} from '@cerberus/react';
import { useForm, Controller } from 'react-hook-form';
import {
  SortAscending,
  SortDescending,
  Filter,
  Search,
  CaretRight,
  CaretLeft
} from '@cerberus/icons';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';
import { useState } from 'react';

type Columns = {
  header: string;
  accessor: string;
  render?: (value: any, row?: any) => any;
  sortable?: boolean;
  sortKey?: string;
};

type Data = {
  [key: string]: any;
};

function getNestedProperty(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function PageButtons({
  page,
  total,
  limit,
  setPage,
  loading
}: {
  page: number;
  total: number;
  limit: number;
  setPage: (page: number) => void;
  loading?: boolean;
}) {
  const buttons = [];
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(i);
    }
  } else {
    if (page === 1) {
      buttons.push(1, 2, 3);
    } else if (page === totalPages) {
      buttons.push(totalPages - 2, totalPages - 1, totalPages);
    } else {
      buttons.push(page - 1, page, page + 1);
    }
  }

  return (
    <>
      {buttons.map((button, index) => (
        <Button
          key={index}
          onClick={() => setPage(button)}
          disabled={page === button || loading}
          usage="outlined"
          className={css({
            rounded: 'sm',
            w: '32px',
            h: '32px',
            p: '0'
          })}
        >
          {loading ? <Spinner size="1em" /> : button}
        </Button>
      ))}
    </>
  );
}

export function Table({
  caption,
  columns,
  data,
  loading,
  total,
  limit,
  page,
  setPage,
  nextCursor,
  setOptions,
  loadMore,
  searchOptions,
  filterOptions,
  onRowClick
}: {
  caption: string;
  columns: Columns[];
  data: Data[];
  loading: boolean;
  total?: number;
  limit?: number;
  page?: number;
  setPage?: (page: number) => void;
  nextCursor?: string;
  onRowClick?: (row: Data) => void;
  setOptions?: (
    cursor?: any,
    limit?: number,
    sortKey?: string,
    sortDirection?: 'asc' | 'desc',
    filter?: any,
    search?: any
  ) => void;
  loadMore?: () => void;
  searchOptions?: { placeholder: string };
  filterOptions?: {
    label: string;
    key: string;
    options: { label: string; value: string }[];
  }[];
}) {
  const [search, setSearch] = useState<any | null>(null);
  const [filter, setFilter] = useState<any | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string, sortable: boolean | undefined) => {
    const newCursor = null;
    setCursor(newCursor);
    if (!sortable) {
      const newCurrentSortKey = null;
      setCurrentSortKey(newCurrentSortKey);
      setOptions(
        newCursor,
        limit,
        newCurrentSortKey,
        sortDirection,
        filter,
        search
      );
      return;
    }
    if (currentSortKey === key) {
      const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newSortDirection);
      setOptions(newCursor, limit, key, newSortDirection, filter, search);
    } else {
      setCurrentSortKey(key);
      setSortDirection('asc');
      setOptions(newCursor, limit, key, 'asc', filter, search);
    }
  };

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch);
    setOptions(cursor, limit, currentSortKey, sortDirection, filter, newSearch);
  };

  const handleFilterUpdate = data => {
    Object.keys(data).forEach(key => {
      if (!data[key]) {
        delete data[key];
      }
    });
    setFilter(data);
    setOptions(cursor, limit, currentSortKey, sortDirection, data, search);
  };

  const handleFilterReset = () => {
    filterOptions.forEach(({ key }) => {
      setValue(key, '');
    });
    setFilter(null);
    setOptions(cursor, limit, currentSortKey, sortDirection, {}, search);
  };

  const { control, handleSubmit, setValue } = useForm();

  const getItemCountText = () => {
    if (loading || !data) {
      return '';
    }
    if (!total) {
      return `Showing ${data.length} Item${data.length !== 1 ? 's' : ''}`;
    }
    if (page) {
      const start = (page - 1) * limit + 1;
      return `Showing ${start} - ${start + data.length - 1} of ${total} Item${total !== 1 ? 's' : ''}`;
    }
    return `Showing ${data.length} of ${total} Item${total !== 1 ? 's' : ''}`;
  };

  return (
    <div>
      <Show when={Boolean(searchOptions || filterOptions)}>
        <div
          className={css({
            p: '3',
            py: '0',
            bg: 'page.surface.100',
            justifyContent: 'space-between',
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
            h: '10'
          })}
        >
          <Show
            when={Boolean(searchOptions)}
            fallback={<div className={css({ h: '16px', w: '16px' })} />}
          >
            <Field>
              <Input
                id="search"
                placeholder={searchOptions?.placeholder}
                startIcon={<Search />}
                className={css({
                  bgColor: 'page.surface.100',
                  border: 'none',
                  mr: '4',
                  mb: '1'
                })}
                onChange={e => handleSearch(e.target.value)}
              />
            </Field>
          </Show>
          <Show when={Boolean(filterOptions)}>
            <IconButton
              onClick={() => setShowFilters(!showFilters)}
              ariaLabel="Show Filters"
              disabled={false}
              palette="action"
              size="sm"
              usage="outlined"
              className={css({
                border: 'none',
                ml: '4',
                bgColor: 'page.surface.100'
              })}
            >
              <Filter />
            </IconButton>
          </Show>
        </div>
        <Show when={showFilters}>
          <div
            className={css({
              p: '8',
              pb: '16',
              bg: 'page.surface.100',
              justifyContent: 'space-between',
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
              borderTop: '1px solid',
              borderColor: 'page.border.100'
            })}
          >
            <form onSubmit={handleSubmit(handleFilterUpdate)}>
              <div className={hstack()}>
                {filterOptions?.map(({ label, key, options }) => (
                  <div key={key}>
                    <Controller
                      name={key}
                      control={control}
                      defaultValue=""
                      render={({ field: { ref, ...field }, fieldState }) => (
                        <Field {...fieldState}>
                          <Label htmlFor={key}>{label}</Label>
                          <Select id={key} {...field}>
                            <Option value="">All</Option>
                            {options.map(({ label, value }) => (
                              <Option key={value} value={value}>
                                {label}
                              </Option>
                            ))}
                          </Select>
                        </Field>
                      )}
                    />
                  </div>
                ))}
                <Button
                  palette="action"
                  shape="rounded"
                  usage="filled"
                  type="submit"
                  className={css({ mt: '6' })}
                >
                  Apply
                </Button>
                <Button
                  usage="outlined"
                  type="button"
                  shape="rounded"
                  onClick={handleFilterReset}
                  className={css({ mt: '6' })}
                >
                  Reset
                </Button>
              </div>
            </form>
          </div>
        </Show>
      </Show>
      <CerberusTable
        caption={caption}
        className={css({
          overflowY: 'auto',
          height: '110px',
          '& thead th': { position: 'sticky', top: 0 }
        })}
      >
        <Thead>
          <Tr>
            {columns.map(({ header, accessor, sortable, sortKey }) => (
              <Th
                key={header}
                onClick={() => handleSort(sortKey ?? accessor, sortable)}
              >
                {header}
                <Show
                  when={currentSortKey === (sortKey ?? accessor)}
                  fallback={<div className={css({ h: '16px', w: '16px' })} />}
                >
                  <Show
                    when={sortDirection === 'asc'}
                    fallback={<SortDescending />}
                  >
                    <SortAscending />
                  </Show>
                </Show>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody decoration="zebra">
          {data.map((row, index) => (
            <Tr
              key={index}
              className={
                onRowClick
                  ? css({
                      '&:hover': {
                        cursor: 'pointer',
                        bg: 'page.surface.200'
                      }
                    })
                  : null
              }
              onClick={() => {
                if (onRowClick) {
                  onRowClick(row);
                }
              }}
            >
              {columns.map(({ accessor, render }) => (
                <Td key={accessor}>
                  {render
                    ? render(getNestedProperty(row, accessor), row)
                    : getNestedProperty(row, accessor)}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </CerberusTable>
      <div
        className={css({
          p: '3',
          bg: 'page.surface.100',
          justifyContent: 'space-between',
          flexDirection: 'row',
          display: 'flex'
        })}
      >
        <div
          className={css({
            alignSelf: 'center'
          })}
        >
          {getItemCountText()}
        </div>
        <div>
          {loadMore ? (
            <Button onClick={loadMore} disabled={!nextCursor} shape="rounded">
              Load More
            </Button>
          ) : page !== null && total ? (
            <div className={css({ display: 'flex', gap: 2 })}>
              <Button
                onClick={() => setPage(page - 1)}
                disabled={page === 1 || loading}
                usage="ghost"
                className={css({
                  rounded: 'sm',
                  w: '32px',
                  h: '32px',
                  p: '0'
                })}
              >
                <CaretLeft />
              </Button>
              <PageButtons
                page={page}
                total={total}
                limit={limit}
                setPage={setPage}
                loading={loading}
              />
              <Button
                onClick={() => setPage(page + 1)}
                disabled={page * limit >= total || loading}
                usage="ghost"
                className={css({
                  rounded: 'sm',
                  w: '32px',
                  h: '32px',
                  p: '0'
                })}
              >
                <CaretRight />
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
