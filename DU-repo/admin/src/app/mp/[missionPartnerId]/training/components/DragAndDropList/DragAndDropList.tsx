import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import {
  Text,
  Flex,
  spacing,
  colors,
  typography,
  VendorIconGroup,
  Spinner
} from '@digital-u/digital-ui';
import { DragVertical, Timer, TrashCan } from '@carbon/icons-react';
import useDragDropDebounce from '@/utils/use-drag-drop-debounce/useDragDropDebounce';
import LibraryItem from '@/components/manage-mission-partners/custom-training/LibraryItem';
import { ConfirmActionModal } from '@/components_new/modals/ConfirmActionModal';
import { hstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';

const StyledLink = styled(Link)`
  font-size: ${typography.sizes[4]};
  line-height: ${typography.sizes[7]};
  text-decoration: none;
`;

const DragAndDropList = ({
  items,
  onReorder,
  onRemoveItem,
  onClickItem,
  deleteModalTitle,
  disabled,
  removeType = false,
  libraryItem = false
}) => {
  const dragItem = useRef<number>(undefined);
  const dragOverItem = useRef(undefined);

  const [filteredItems, setFilteredItems] = useState(items);
  const [draggableArea, setDraggableArea] = useState(null);
  const [controlsVisible, setControlsVisible] = useState(null);
  const [itemToBeRemoved, setItemToBeRemoved] = useState('');
  const debouncedItems = useDragDropDebounce(filteredItems, 3000);

  const showDraggable = (i: boolean) => controlsVisible === i && !disabled;

  const handleDragStart = (event, position: number) => {
    if (disabled) return;
    dragItem.current = position;
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (_event, position) => {
    if (disabled) return;
    dragOverItem.current = position;
  };

  const handleDrop = () => {
    if (disabled) return;
    if (isNaN(dragItem?.current)) return;

    const copyItemList = [...filteredItems];
    const itemDragged = copyItemList[dragItem.current];

    copyItemList.splice(dragItem.current, 1);
    copyItemList.splice(dragOverItem.current, 0, itemDragged);

    dragItem.current = null;
    dragOverItem.current = null;

    setFilteredItems(copyItemList);
  };

  useEffect(() => {
    // Taking this approach so that the UI can appear to update
    // immediately without waiting for network request.
    // Behavior was a bit weird using controlled list.
    setFilteredItems(items);
  }, [items]);

  useEffect(() => {
    if (debouncedItems) {
      onReorder(filteredItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedItems]);

  if (!items) return null;

  return (
    <Flex direction="column" gap={spacing[1]} className={css({ w: 'full' })}>
      {filteredItems?.map((item, i) => (
        <Flex
          key={item.id}
          style={{
            borderRadius: '4px',
            border: `1px solid ${colors.galaxy[200]}`,
            padding: spacing[0]
          }}
          direction="row"
          alignItems="center"
          gap={spacing[1]}
          draggable={draggableArea !== null}
          onDragStart={event => handleDragStart(event, i)}
          onDragEnter={event => handleDragEnter(event, i)}
          onDragEnd={handleDrop}
          onDragOver={event => event.preventDefault()}
          onMouseEnter={() => setControlsVisible(i)}
          onFocus={() => setControlsVisible(i)}
          onBlur={() => setControlsVisible(null)}
        >
          <Flex
            direction="column"
            onMouseEnter={() => {
              if (!disabled || !itemToBeRemoved) setDraggableArea(i);
            }}
            onMouseLeave={() => {
              if (!disabled || !itemToBeRemoved) setDraggableArea(null);
            }}
            style={{
              height: `100%`,
              justifyContent: 'center',
              cursor: showDraggable(i) ? 'pointer' : 'default',
              padding: `${spacing[4]} ${spacing[0]} ${spacing[4]} ${spacing[4]}`,
              marginRight: showDraggable(i) ? '0' : `-${spacing[1]}`
            }}
          >
            {itemToBeRemoved !== item.id && showDraggable(i) && (
              <DragVertical />
            )}
          </Flex>

          {itemToBeRemoved === item.id && <Spinner />}
          {/* For use with library items */}
          {libraryItem && (
            <LibraryItem libraryItem={item} disabled={disabled} />
          )}
          {/* For use with survey content, hosted content item lists */}
          {itemToBeRemoved !== item.id && !item?.vendorName && !libraryItem && (
            <>
              {!removeType && <Text fontWeight="semiBold">{item?.type}:</Text>}
              <Text
                style={{
                  flexGrow: '1',
                  padding: `${spacing[4]} ${spacing[4]} ${spacing[4]} ${spacing[0]}`
                }}
              >
                <StyledLink
                  href="#"
                  onClick={event => {
                    event.preventDefault();
                    onClickItem(item);
                  }}
                >
                  {item.subject ?? item.title ?? item.content}
                </StyledLink>
              </Text>
            </>
          )}

          {/* For use with plan lists */}
          {itemToBeRemoved !== item.id && item?.vendorName && (
            <Flex
              direction="column"
              style={{
                flexGrow: '1',
                padding: `${spacing[4]} ${spacing[4]} ${spacing[4]} ${spacing[0]}`
              }}
              gap={spacing[4]}
            >
              <Flex gap={spacing[2]}>
                <Text fontWeight="semiBold">{item?.type}:</Text>
                <Text>
                  <StyledLink
                    href={item?.href || '#'}
                    onClick={event => {
                      event.preventDefault();
                      onClickItem(item.id);
                    }}
                  >
                    {item?.title || item?.subject}
                  </StyledLink>
                </Text>
              </Flex>
              <Flex gap={spacing[4]}>
                <Flex alignItems="center" gap={spacing[1]}>
                  <Timer size="18" />
                  <Text size="compact">{item?.duration}</Text>
                </Flex>
                <VendorIconGroup vendors={[item?.vendorName]} />
              </Flex>
            </Flex>
          )}

          {controlsVisible === i && itemToBeRemoved !== item.id && (
            <ConfirmActionModal
              heading={deleteModalTitle}
              description="Are you sure you want to remove this item?"
              actionText="Yes, remove"
              cancelText="No, keep it"
              handleSubmit={() => {
                onRemoveItem(item.id);
                setItemToBeRemoved('');
              }}
              onClose={() => setItemToBeRemoved('')}
              buttonContent={
                <div className={hstack()} style={{ color: colors.red[800] }}>
                  Remove <TrashCan style={{ marginRight: spacing[5] }} />
                </div>
              }
              disabled={disabled}
            />
          )}
        </Flex>
      ))}
    </Flex>
  );
};

export default DragAndDropList;
