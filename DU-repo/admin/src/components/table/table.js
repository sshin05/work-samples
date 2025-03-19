import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Heading } from '@/components_new/deprecated/Heading';
import { Flex } from '@/components_new/deprecated/Flex';

const Table = ({ columnTitles, data, rowTemplate, sx }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        textAlign: 'left'
      }}
    >
      <Flex>
        {columnTitles?.length &&
          columnTitles.map((title, i) => (
            <Box
              sx={{
                width: `calc(100% / ${columnTitles.length})`,
                borderBottom: '1px solid #070F58'
              }}
              key={`${title} ${i}`}
            >
              <Heading
                as="h4"
                sx={{
                  color: '#121550',
                  fontWeight: '500',
                  letterSpacing: '0.16px',
                  textAlign: 'left',
                  ...sx?.titleStyles
                }}
              >
                {title}
              </Heading>
            </Box>
          ))}
      </Flex>
      {data?.map((row, rowIndex) => (
        <Flex key={rowIndex}>
          {row.map((cellData, columnIndex) => (
            <Box
              sx={{
                width: `calc(100% / ${row.length})`,
                pt: 's',
                pb: 's',
                pr: 'xs',
                borderBottom:
                  data.length - 1 === rowIndex ? 'unset' : '1px solid #070F58',
                ...sx?.rowStyles
              }}
              key={`${cellData} ${columnIndex}`}
            >
              {rowTemplate[columnIndex]({ cellData, rowIndex, columnIndex })}
            </Box>
          ))}
        </Flex>
      ))}
      {data?.length === 0 ? (
        <Box
          sx={{
            width: `100%`,
            pt: 's',
            pb: 's',
            pr: 'xs',
            ...sx?.rowStyles
          }}
        >
          <Heading
            as="h4"
            sx={{
              color: '#121550',
              fontWeight: '500',
              letterSpacing: '0.16px',
              textAlign: 'left',
              ...sx?.titleStyles
            }}
          >
            No Data
          </Heading>
        </Box>
      ) : null}
    </Flex>
  );
};

Table.propTypes = {
  columnTitles: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    )
  ),
  rowTemplate: PropTypes.arrayOf(PropTypes.func).isRequired
};

export default Table;
