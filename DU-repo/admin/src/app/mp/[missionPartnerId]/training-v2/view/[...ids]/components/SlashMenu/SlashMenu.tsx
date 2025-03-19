'use client';

import { useState, useRef, useEffect } from 'react';
import type { BlockTypeMetadata } from '@digital-u/services/block/types';
import { css } from '@cerberus/styled-system/css';
import { Button } from '@cerberus/react';
import { Flex, Grid } from '@cerberus/styled-system/jsx';
import { Add, Close } from '@carbon/icons-react';
import { SlashMenuEntry } from '../SlashMenuEntry.tsx/';
import { SlashMenuItem } from '../SlashMenuItem/';

export const SlashMenu = ({
  allowedChildrenMetadata
}: {
  allowedChildrenMetadata: BlockTypeMetadata[];
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isInputActive, setIsInputActive] = useState(false);
  const [isAddButtonActive, setIsAddButtonActive] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const formRef = useRef<HTMLFormElement>(null);

  const hasSlashPrefix = inputValue.startsWith('/');
  const searchTerm = hasSlashPrefix
    ? inputValue.substring(1).toLowerCase()
    : '';

  const filteredMetadata = allowedChildrenMetadata.filter(item => {
    // If add button is active but no slash, show all items
    if (isAddButtonActive && !hasSlashPrefix) return true;

    // If no slash prefix and add button not active, don't show any items
    if (!hasSlashPrefix && !isAddButtonActive) return false;

    // If slash prefix but no search term, show all items
    if (hasSlashPrefix && !searchTerm) return true;

    // Filter by search term
    const nameMatch = item.name.toLowerCase().includes(searchTerm);
    const descriptionMatch = item.description
      ? item.description.toLowerCase().includes(searchTerm)
      : false;

    return nameMatch || descriptionMatch;
  });

  const displayedItems = showAllItems
    ? filteredMetadata
    : filteredMetadata.slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsAddButtonActive(false);
        setShowAllItems(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reset selected index when filtered items change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [filteredMetadata.length]);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (showAllItems) {
      setShowAllItems(false);
    }
  };

  const showForm = (isInputActive && hasSlashPrefix) || isAddButtonActive;

  const toggleShowAllItems = () => {
    setShowAllItems(!showAllItems);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showForm || displayedItems.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < displayedItems.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : displayedItems.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < displayedItems.length) {
          // Get the selected item's button and trigger its formAction
          const selectedItem = displayedItems[selectedIndex];
          const formElement = formRef.current;
          if (formElement) {
            // Find the button for the selected item and click it
            const submitButton = formElement.querySelector(
              `button[data-item-id="${selectedItem.id}"]`
            ) as HTMLButtonElement;
            if (submitButton) {
              submitButton.click();
            }
          }
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsAddButtonActive(false);
        setShowAllItems(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <Flex position="relative" onKeyDown={handleKeyDown}>
      <Flex gap="sm" alignItems="center" w="full">
        <Button
          shape="sharp"
          usage="ghost"
          size="sm"
          onClick={() => setIsAddButtonActive(!isAddButtonActive)}
        >
          <Add size={16} />
        </Button>
        <SlashMenuEntry
          value={inputValue}
          onChange={handleInputChange}
          isActive={isInputActive}
          onActiveChange={setIsInputActive}
        />
      </Flex>
      {showForm && (
        <form ref={formRef}>
          <Flex
            direction="column"
            gap="md"
            position="absolute"
            top="100%"
            mt="lg"
            left="0"
            w={showAllItems ? '3/4' : '1/3'}
            bg="background"
            zIndex="100"
            p="md"
            borderRadius="md"
          >
            {showAllItems && (
              <Flex justifyContent="space-between" alignItems="center">
                <h2 className={css({ textStyle: 'heading-sm' })}>
                  All Content Items
                </h2>
                <Button
                  size="sm"
                  usage="ghost"
                  shape="rounded"
                  type="button"
                  onClick={toggleShowAllItems}
                >
                  <Close size={16} />
                </Button>
              </Flex>
            )}

            <Grid columns={showAllItems ? 3 : 1}>
              {displayedItems.map((item, index) => (
                <SlashMenuItem
                  key={item.id}
                  item={item}
                  isSelected={index === selectedIndex}
                />
              ))}
            </Grid>

            {/* Show All Items Button */}
            {!showAllItems && filteredMetadata.length > 5 && (
              <Button
                className={css({
                  textStyle: 'label-sm',
                  height: 'fit-content',
                  _hover: {
                    bg: 'transparent',
                    textDecoration: 'underline'
                  }
                })}
                onClick={toggleShowAllItems}
                type="button"
                usage="ghost"
              >
                All Items
              </Button>
            )}
          </Flex>
        </form>
      )}
    </Flex>
  );
};
