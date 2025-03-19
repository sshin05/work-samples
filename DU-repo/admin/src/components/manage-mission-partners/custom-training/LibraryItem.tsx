import type { MouseEvent } from 'react';
import { VolumeUp, Link, Video, Launch, Document } from '@carbon/icons-react';
import { Flex, Button, Text, spacing, colors } from '@digital-u/digital-ui';

const LibraryItem = ({ libraryItem, disabled }) => {
  const iconType = type => {
    switch (type) {
      case 'Video':
        return <Video />;
      case 'Audio':
        return <VolumeUp />;
      case 'Link':
        return <Link />;
      case 'File':
        return <Document />;
      default:
        break;
    }
  };

  return (
    <Flex
      direction="row"
      style={{
        flexGrow: '1',
        padding: `${spacing[4]} ${spacing[4]} ${spacing[4]} ${spacing[0]}`
      }}
      gap={spacing[0]}
    >
      <Flex
        style={{
          padding: `${spacing[0]} ${spacing[3]} ${spacing[3]} ${spacing[1]}`
        }}
      >
        {iconType(libraryItem?.type)}
      </Flex>

      <Flex direction="column">
        <Flex gap={spacing[1]}>
          {/^\/assets\//.exec(libraryItem.url) ? (
            <a
              style={{ textDecoration: 'none' }}
              href={libraryItem.url}
              download={libraryItem.title}
              onClick={(event: MouseEvent) => {
                event.preventDefault();
                window.open(libraryItem.url, '_blank');
              }}
            >
              <Text
                size="p"
                fontWeight="bold"
                style={{ color: colors.teal[800] }}
              >
                {libraryItem.title} <Launch />
              </Text>
            </a>
          ) : (
            <Button
              style={{ gap: spacing[0] }}
              kind="text"
              size="sm"
              href={libraryItem?.url || '#'}
              onClick={(event: MouseEvent) => {
                event.preventDefault();
                window.open(libraryItem?.url, '_blank', 'noopener, noreferrer');
              }}
              download
              disabled={disabled}
            >
              {libraryItem.title}
              <Launch />
            </Button>
          )}
        </Flex>

        <Flex gap={spacing[1]}>
          <Text>{libraryItem.type}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LibraryItem;
