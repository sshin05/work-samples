'use client';

import { css, cx } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { NullHover } from '../../../NullHover';
import { createTicks } from './utils/createTicks';
import { getAfterLabel } from './utils/getAfterLabel';
import { getLabel } from './utils/getLabel';
import { buildDataset } from './utils/buildDataset';
import type { StatusBarChartProps } from './statusBarChart.types';
import { useChartColors } from '@/lib/chartjs';
import { containerStyles } from '@/app/styles/ContainerStyles';
import { Text } from '@cerberus/react';
import {
  useFindMissionPartnerById,
  useGetCoursesQuarterlyByMissionPartner,
  useGetPlansQuarterlyByMissionPartner
} from '@/api/mission-partner';
import { useGraphqlErrorHandler } from '@/hooks/useGraphqlErrorHandler';
import { calculateChartScale } from '@/app/mp/[missionPartnerId]/utils/calculateChartScale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Tooltip,
  Legend
);

const STATIC_ARRAY = [];

const StatusBarChart = ({
  missionPartnerId,
  statusType = 'Plans'
}: StatusBarChartProps) => {
  const chartColors = useChartColors();
  const { missionPartnerError } = useFindMissionPartnerById(missionPartnerId);

  useGraphqlErrorHandler(missionPartnerError);

  const { getPlansQuarterlyByMissionPartner } =
    useGetPlansQuarterlyByMissionPartner(missionPartnerId);
  const { getCoursesQuarterlyByMissionPartner } =
    useGetCoursesQuarterlyByMissionPartner(missionPartnerId);

  const statusData =
    statusType === 'Plans'
      ? getPlansQuarterlyByMissionPartner
      : statusType === 'Courses'
        ? getCoursesQuarterlyByMissionPartner
        : STATIC_ARRAY;

  const nullState =
    statusData.length === 0 ||
    (statusData[0].total === 0 && statusData?.length === 1);

  const {
    builtDataset,
    categoryLabels,
    assignedPercentages,
    startedPercentages,
    stoppedPercentages,
    completedPercentages
  } = buildDataset(statusData, statusType, chartColors);

  const barData = {
    labels: categoryLabels,
    datasets: builtDataset
  };

  const maxY = calculateChartScale(
    [
      assignedPercentages,
      startedPercentages,
      stoppedPercentages,
      completedPercentages
    ],
    0.2
  );

  return (
    <NullHover
      enabled={nullState}
      width="45rem"
      element={
        <div
          className={vstack({
            alignItems: 'center',
            color: 'page.text.inverse',
            textStyle: 'body-md',
            letterSpacing: '0.32px',
            gap: 0
          })}
        >
          <Text
            data-placement="top"
            animationDuration="slow"
            animationDelay="400ms"
            animationFillMode="forwards"
            animationStyle="slide-fade-in"
            opacity="0"
          >
            Once your learners start training,
          </Text>
          <Text
            data-placement="top"
            animationDuration="slow"
            animationDelay="400ms"
            animationFillMode="forwards"
            animationStyle="slide-fade-in"
            opacity="0"
          >
            {`their progress on ${statusType?.toLowerCase()} will appear here`}
          </Text>
        </div>
      }
    >
      <div
        className={cx(
          hstack({
            w: '45rem',
            minH: '22rem',
            p: '8'
          }),
          containerStyles
        )}
      >
        <div
          className={vstack({
            gap: '1',
            alignItems: 'flex-start',
            pos: 'absolute',
            top: '10',
            left: '2.6rem'
          })}
        >
          <p className={css({ textStyle: 'label-sm', mb: '2.5' })}>
            Over All Time
          </p>
          <p className={css({ textStyle: 'heading-xs' })}>{statusType} by</p>
          <p className={css({ textStyle: 'heading-xs' })}>status</p>
        </div>
        <div className={css({ zIndex: 1000, w: '45rem', minH: '22rem' })}>
          <Bar
            data={barData}
            options={{
              elements: {
                bar: {
                  borderWidth: 0
                }
              },
              scales: {
                y: {
                  ticks: {
                    mirror: true,
                    padding: -2,
                    labelOffset: -1,
                    align: 'end',
                    callback: (value, index) =>
                      createTicks(value, index, maxY, statusType),
                    font: {
                      family: 'FreeMono, monospace'
                    }
                  },
                  grid: {
                    display: true
                  },
                  border: {
                    display: false
                  },
                  min: 0,
                  max: maxY
                },
                x: {
                  stacked: true,
                  grid: {
                    display: false
                  }
                }
              },
              plugins: {
                tooltip: {
                  enabled: true,
                  displayColors: false,
                  bodyFont: {
                    weight: 'normal',
                    family: 'sans-serif'
                  },
                  backgroundColor: chartColors.page_surface_inverse,
                  callbacks: {
                    title: () => '',
                    label: context => getLabel(context.label),
                    afterLabel: context =>
                      getAfterLabel(
                        statusData,
                        statusType,
                        context.dataIndex,
                        context.dataset?.label
                      )
                  }
                },
                legend: {
                  position: 'left',
                  labels: {
                    boxWidth: 15,
                    boxHeight: 15
                  }
                }
              },

              normalized: true,
              maintainAspectRatio: false,
              responsive: true
            }}
          />
        </div>
      </div>
    </NullHover>
  );
};

export default StatusBarChart;
