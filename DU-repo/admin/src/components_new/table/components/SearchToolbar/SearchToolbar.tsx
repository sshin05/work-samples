import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Download, Edit, Filter, Search } from '@cerberus/icons';
import {
  dropdownContainer,
  dropdownTextButton,
  hstackContainer,
  inputStyles,
  searchContainer,
  styledAddButton,
  styledSearchToolbarContainer,
  styledToolbarWrapper
} from '../../styles/toolbar-styles';
import { Button, IconButton } from '@cerberus/react';
import type { SearchToolbarProps } from './SearchToolbar.types';
import { TextInput } from '@/components_new/form';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';

/*
 * SearchToolbar
 * Description: SearchToolbar is a component that provides a search input, filter, edit, and download buttons.
 * It is used by the Local Table & ServerSideTable components.
 */

export const SearchToolbar = ({
  searchTerm,
  setSearchTerm,
  searchPlaceholder,
  buttonProps,
  secondaryButtonProps,
  filterProps,
  editProps,
  downloadProps,
  hasToolbar,
  toolbarType
}: SearchToolbarProps) => {
  const [showEditDropdown, setShowEditDropdown] = useState(false);
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
  const [value, setValue] = useState(searchTerm ?? '');
  useEffect(() => {
    const delay = 600;

    const debounceOnChange = debounce(value => {
      setSearchTerm?.(value || undefined);
    }, delay);
    debounceOnChange(value);

    return debounceOnChange.cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const isMultipleEditActions =
    editProps?.setShowEdit !== undefined &&
    editProps?.showEdit !== undefined &&
    editProps?.bulkAction !== undefined;

  const itemLabel = editProps?.itemLabel ?? 'item';

  const isMultipleDownloadActions =
    Array.isArray(downloadProps) && downloadProps.length > 1;

  return (
    <div className={styledToolbarWrapper}>
      {hasToolbar && toolbarType === 'search' && (
        <div className={searchContainer}>
          <div className={styledSearchToolbarContainer}>
            {setSearchTerm && (
              <TextInput
                startIcon={<Search />}
                id="searchInput"
                name="search"
                label={null}
                aria-label="search table for value"
                className={inputStyles}
                placeholder={
                  searchPlaceholder
                    ? `  ${searchPlaceholder}`
                    : ' Enter your search term.'
                }
                value={value}
                onChange={event => setValue(event.target.value)}
                autoFocus={value ? true : false}
              />
            )}
            <div style={{ display: 'flex' }}>
              {filterProps && (
                <IconButton
                  className={css({
                    marginX: 1,
                    bgColor: filterProps?.openFilters
                      ? 'action.ghost.active'
                      : 'none'
                  })}
                  palette="action"
                  usage="ghost"
                  ariaLabel="toggle filters"
                  onClick={() => {
                    filterProps?.setOpenFilters(state => !state);
                  }}
                >
                  <Filter />
                </IconButton>
              )}
              {editProps && (
                <div className={hstackContainer}>
                  <IconButton
                    className={css({
                      marginX: 1,
                      bgColor:
                        editProps?.showEdit ||
                        (isMultipleEditActions && showEditDropdown)
                          ? 'action.ghost.active'
                          : 'none'
                    })}
                    palette="action"
                    usage="ghost"
                    ariaLabel="toggle edit"
                    disabled={editProps?.disableEdit}
                    onClick={() => {
                      // If we are already in checkbox state, then toggle the checkbox state.
                      if (editProps?.showEdit === true) {
                        editProps?.setShowEdit(state => !state);
                        return;
                      }

                      // If there is only a single edit action, and that action is to show checkboxes
                      // then toggle the showEdit state.
                      if (
                        editProps?.setShowEdit &&
                        editProps?.showEdit !== undefined &&
                        editProps?.bulkAction === undefined
                      ) {
                        editProps?.setShowEdit(state => !state);
                        return;
                      }

                      // If there is only a single edit action, and that action is a bulk action
                      // then execute the bulk action.
                      if (
                        editProps?.setShowEdit === undefined &&
                        editProps?.bulkAction !== undefined
                      ) {
                        editProps?.bulkAction();
                        return;
                      }

                      // If we hit this spot, then there are multiple edit actions.
                      // We need to show the dropdown.
                      if (isMultipleEditActions) {
                        setShowEditDropdown(state => !state);
                        setShowDownloadDropdown(false);
                      }
                    }}
                  >
                    <Edit />
                  </IconButton>
                  {showEditDropdown && (
                    <div className={dropdownContainer}>
                      <Button
                        className={dropdownTextButton}
                        usage="ghost"
                        disabled={editProps?.disableEdit}
                        onClick={() => {
                          editProps?.setShowEdit(state => !state);
                          setShowEditDropdown(false);
                        }}
                      >
                        Remove individual {itemLabel}(s)
                      </Button>
                      <Button
                        className={dropdownTextButton}
                        usage="ghost"
                        disabled={editProps?.disableEdit}
                        onClick={() => {
                          editProps?.bulkAction();
                          setShowEditDropdown(false);
                        }}
                      >
                        Bulk remove {itemLabel}s via .csv file
                      </Button>
                    </div>
                  )}
                </div>
              )}
              <div className={hstackContainer}>
                {downloadProps && (
                  <IconButton
                    className={css({
                      marginX: 1,
                      bgColor: showDownloadDropdown
                        ? 'action.ghost.active'
                        : 'none'
                    })}
                    palette="action"
                    usage="ghost"
                    ariaLabel="download table content"
                    disabled={
                      isMultipleDownloadActions
                        ? downloadProps.some(prop => prop?.loading)
                        : Array.isArray(downloadProps)
                          ? downloadProps.some(prop => prop?.loading)
                          : downloadProps?.loading
                    }
                    onClick={() => {
                      const isArray = Array.isArray(downloadProps);

                      // If there are multiple download props, then show the dropdown.
                      if (isMultipleDownloadActions && isArray) {
                        setShowDownloadDropdown(state => !state);
                        setShowEditDropdown(false);
                        return;
                      }
                      // If there is only 1 downloadProps, then execute that download.
                      if (!isArray && downloadProps) {
                        downloadProps.onDownload();
                        // ADD A RETURN IF MORE IF BLOCKS ARE ADDED
                      }
                    }}
                  >
                    <Download />
                  </IconButton>
                )}
                {showDownloadDropdown && (
                  <div className={dropdownContainer}>
                    {isMultipleDownloadActions &&
                      // shows both learners download options
                      downloadProps.map(prop => (
                        <Button
                          usage="ghost"
                          className={dropdownTextButton}
                          key={prop.name}
                          onClick={() => {
                            prop.onDownload();
                            setShowDownloadDropdown(false);
                          }}
                          disabled={prop?.loading}
                        >
                          {prop.name}
                        </Button>
                      ))}
                  </div>
                )}
              </div>
              <div className={hstack({ gap: '4' })}>
                {buttonProps && (
                  <Button
                    className={styledAddButton}
                    palette="action"
                    shape="rounded"
                    size={buttonProps && secondaryButtonProps ? 'sm' : 'md'}
                    aria-label={`add ${buttonProps?.buttonContent}`}
                    onClick={buttonProps?.onButtonClick}
                  >
                    {buttonProps?.buttonContent}
                    {buttonProps.buttonIcon}
                  </Button>
                )}
                {secondaryButtonProps && (
                  <Button
                    className={styledAddButton}
                    palette="action"
                    usage="outlined"
                    shape="rounded"
                    size={buttonProps && secondaryButtonProps ? 'sm' : 'md'}
                    aria-label={`add ${secondaryButtonProps?.buttonContent}`}
                    onClick={secondaryButtonProps?.onButtonClick}
                  >
                    {secondaryButtonProps?.buttonContent}
                    {secondaryButtonProps.buttonIcon}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
