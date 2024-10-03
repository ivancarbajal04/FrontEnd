import { Modal, Box } from '@mui/material';
import Chart from 'react-apexcharts';
import useChartData from '../hooks/useChartData';

interface ChartComponentProps {
  open: boolean;
  onClose: () => void;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ open, onClose }) => {
  const { series, options } = useChartData();

  return (
    <div className="app">
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            p: 4,
            bgcolor: 'background.paper',
            m: 'auto',
            mt: '10%',
            width: { xs: '90%', sm: '500px' },
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <div className="row">
            <div className="mixed-chart">
              <Chart options={options} series={series} type="bar" width="500" />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ChartComponent;
