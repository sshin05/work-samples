import { Box } from '@/components/Box';
import { Button } from '@/components_new/deprecated/Button';
import Table from '@/components/table/table';
import { Modal } from '@/components_new/deprecated/Modal';

interface UserTrainingModalProps {
  title: string;
  onClose: () => void;
  tableData: {
    columns: string[];
    rowData: any[]; // Adjust the type based on your actual data structure
    rowTemplate: any; // Adjust the type based on your actual data structure
    stylings?: any; // Adjust the type based on your actual data structure
  };
}

export const UserTrainingModal = ({
  title,
  onClose,
  tableData
}: UserTrainingModalProps) => {
  return (
    <Modal
      sx={{ width: ['100%', '100%', '70%'], overflowY: 'scroll' }}
      title={title}
      onClose={onClose}
    >
      <Box sx={{ marginX: '25px' }}>
        <Box sx={{ marginRight: '20px' }}>
          <Table
            columnTitles={tableData.columns}
            data={tableData.rowData}
            rowTemplate={tableData.rowTemplate}
            sx={tableData.stylings}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            marginTop: '2rem',
            flexDirection: 'row-reverse'
          }}
        >
          <Button
            type="primary"
            onClick={onClose}
            sx={{
              color: '#121550',
              border: ['solid 0px', 'solid 0px', 'solid 1px #000000'],
              padding: ['0', '0', '12px 38px'],
              '&:hover, &:focus, &:active': {
                outline: 'default'
              }
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
