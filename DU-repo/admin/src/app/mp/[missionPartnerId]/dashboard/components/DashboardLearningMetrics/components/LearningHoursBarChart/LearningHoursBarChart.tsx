import { css, cx } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { useChartColors } from '@/lib/chartjs';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { NullHover } from '../../../NullHover';
import { getLabel } from './utils/getLabel';
import { createTicks } from './utils/createTicks';
import { getAfterLabel } from './utils/getAfterLabel';
import { containerStyles } from '@/app/styles/ContainerStyles';
import { Text } from '@cerberus/react';
import { calculateChartScale } from '@/app/mp/[missionPartnerId]/utils/calculateChartScale';
import { useFindCategorizedTimeSpentLearningMissionPartnerDashboard } from '@/api/mission-partner';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Tooltip
);

interface LearningHoursBarChartProps {
  missionPartnerId: string;
}

export const LearningHoursBarChart = ({
  missionPartnerId
}: LearningHoursBarChartProps) => {
  const chartColors = useChartColors();

  const { findCategorizedTimeSpentLearning } =
    useFindCategorizedTimeSpentLearningMissionPartnerDashboard(
      missionPartnerId
    );

  // Since chart is inverted, a lot of logic that uses indexes will break. To correct use reversed array for that logic.

  const learnersPerCategory =
    findCategorizedTimeSpentLearning?.usersPerCategory;
  const categoryNumbers = findCategorizedTimeSpentLearning?.categoryBreakpoints;

  const dataTotal = learnersPerCategory.reduce((previous, current) => {
    return previous + current;
  }, 0);

  const nullState = dataTotal === 0;

  const reverseLearnersPerCategory = [...learnersPerCategory].reverse();

  const reverseDataPercentage = learnersPerCategory
    .map(value => value / (dataTotal || 1))
    .reverse();

  const reverseCategoryHours = categoryNumbers
    .map(minute => Number((minute / 60).toFixed(1)))
    .reverse();

  const categoryLabels = [
    `${reverseCategoryHours[0]}+ hours`,
    `${reverseCategoryHours[1]}+`,
    `${reverseCategoryHours[2]}+`,
    `${reverseCategoryHours[3]}+`,
    `${reverseCategoryHours[4]}+`,
    `<${reverseCategoryHours[4]}`,
    '0'
  ];

  const barData = {
    labels: categoryLabels,
    datasets: [
      {
        barThickness: 10,
        data: reverseDataPercentage,
        backgroundColor: chartColors.qualitative400
      }
    ]
  };

  return (
    <NullHover
      enabled={nullState}
      width="626px"
      element={
        <div
          className={vstack({
            alignItems: 'center',
            color: 'page.text.inverse'
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
            Once your learners start training, their hours logged will appear
            here.
          </Text>
        </div>
      }
    >
      <div
        className={cx(
          hstack({
            h: '370px',
            w: '626px',
            gap: '8',
            px: '6',
            py: '8',
            alignItems: 'start'
          }),
          containerStyles
        )}
      >
        <div
          className={vstack({
            gap: '2.5',
            alignItems: 'flex-start'
          })}
        >
          <p
            className={css({
              fontWeight: 'light',
              fontSize: '0.625rem',
              textAlign: 'left'
            })}
          >
            OVER ALL TIME
          </p>
          <p className={css({ fontSize: '16px', fontWeight: '500' })}>
            Hours spent learning
          </p>
        </div>

        <div
          className={vstack({
            alignItems: 'end',
            alignSelf: 'stretch',
            justifyContent: 'space-between',
            w: '446px'
          })}
        >
          <Bar
            data={barData}
            options={{
              indexAxis: 'y',
              elements: {
                bar: {
                  borderWidth: 0
                }
              },
              scales: {
                y: {
                  ticks: {
                    mirror: true,
                    padding: 0,
                    labelOffset: -7,
                    align: 'start'
                  },
                  grid: {
                    display: true
                  },
                  border: {
                    display: false
                  }
                },
                x: {
                  ticks: {
                    callback: (value, index) => createTicks(value, index),
                    align: 'end'
                  },
                  grid: {
                    display: false
                  },
                  min: 0,
                  max: calculateChartScale([reverseDataPercentage], 0.2)
                }
              },
              plugins: {
                tooltip: {
                  enabled: true,
                  displayColors: false,
                  bodyFont: {
                    weight: 'lighter',
                    family: 'sans-serif'
                  },
                  callbacks: {
                    title: () => '',
                    label: context =>
                      getLabel(
                        context.dataIndex,
                        reverseCategoryHours,
                        reverseLearnersPerCategory
                      ),
                    afterLabel: context =>
                      getAfterLabel(
                        context.dataIndex,
                        reverseDataPercentage,
                        reverseLearnersPerCategory,
                        dataTotal
                      )
                  }
                },
                legend: {
                  display: false
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
