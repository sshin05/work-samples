'use client';
import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '@cerberus/styled-system/css';
import { abbreviatedDateTime } from '@/utils/date/abbreviatedDateTime';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { Modal, trapFocus, useModal } from '@cerberus/react';
import { AddCustomTrainingItemModalContent } from '../AddCustomTrainingItemModalContent';
import { CustomTrainingTable } from './components/CustomTrainingTable';

const CustomTrainingTab = ({ missionPartner, tab, loading, pageLoading }) => {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState('All');

  const addCustomTrainingItemModal = useModal();
  const handleKeyDown = trapFocus(addCustomTrainingItemModal.modalRef);

  const { scorms, courses, exams, surveys, labs } = missionPartner || {
    scorms: [],
    courses: [],
    exams: [],
    surveys: [],
    labs: []
  };

  const scormRows = scorms.map(scorm => ({
    id: scorm.id,
    type: 'SCORM',
    status: scorm.status,
    name: scorm.name,
    duration: scorm.duration,
    createdAt: scorm.createdAt,
    updatedAt: scorm.updatedAt
  }));

  const courseRows = courses.map(course => ({
    id: course.id,
    type: 'Course',
    status: course.status,
    name: course.name,
    duration: course.duration,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt
  }));

  const examRows = exams.map(exam => ({
    id: exam.id,
    type: 'Exam',
    status: exam.status,
    name: exam.name,
    duration: exam.durationInMinutes,
    createdAt: exam.createdAt,
    updatedAt: exam.updatedAt
  }));

  const surveyRows = surveys.map(survey => ({
    id: survey.id,
    type: 'Survey',
    status: survey.status,
    name: survey.name,
    duration: survey.durationInMinutes,
    createdAt: survey.createdAt,
    updatedAt: survey.updatedAt
  }));

  const labRows = labs.map(lab => ({
    id: lab.id,
    type: 'Lab',
    status: lab.status,
    name: lab.name,
    createdAt: lab.createdAt,
    updatedAt: lab.updatedAt
  }));

  const combinedRows = useMemo(() => {
    return [
      ...scormRows,
      ...courseRows,
      ...examRows,
      ...surveyRows,
      ...labRows
    ];
  }, [scormRows, courseRows, examRows, surveyRows, labRows]);

  const filteredRows = useMemo(() => {
    switch (filter) {
      case 'SCORM':
        return [...scormRows];
      case 'Course':
        return [...courseRows];
      case 'Exam':
        return [...examRows];
      case 'Survey':
        return [...surveyRows];
      case 'Lab':
        return [...labRows];
      default:
        return combinedRows;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, combinedRows, scormRows, courseRows, examRows, surveyRows]);

  const callbackPath = getRouteUrl(
    routeGenerators.CustomTrainingWithParameters({
      missionPartnerId: missionPartner?.id,
      tab: tab || 'Plans'
    })
  );

  const onCreateNewItem = (type, newItemId) => {
    addCustomTrainingItemModal.close();
    router.push(
      getRouteUrl(
        routeGenerators.CustomTrainingByType({
          missionPartnerId: missionPartner.id,
          type,
          itemId: newItemId
        }),
        {
          callbackPath
        }
      )
    );
  };

  const handleNavigateToItem = useCallback(
    url => {
      router.push(`${url}?callbackPath=${callbackPath}`);
    },
    [router, callbackPath]
  );

  const customTrainingTableColumns = useMemo(
    () => [
      {
        header: 'Item name',
        accessorKey: 'name',
        cell: info => {
          return (
            <div
              className={css({
                display: 'block',
                minW: '13rem',
                whiteSpace: 'normal',
                wordWrap: 'break-word'
              })}
              style={{ cursor: 'pointer' }}
              onClick={() =>
                handleNavigateToItem(
                  getRouteUrl(
                    routeGenerators.CustomTrainingByType({
                      missionPartnerId: missionPartner.id,
                      type: info.row.original.type.toLowerCase(),
                      itemId: info.row.original.id
                    })
                  )
                )
              }
            >
              <span
                className={css({
                  color: 'action.bg.initial',
                  textDecoration: 'underline'
                })}
              >
                {info.getValue()}
              </span>
            </div>
          );
        }
      },
      {
        header: 'Type',
        accessorKey: 'type',
        enableGlobalFilter: false
      },
      {
        header: 'Duration',
        accessorKey: 'duration',
        enableGlobalFilter: false
      },
      {
        header: 'Status',
        accessorKey: 'status',
        enableGlobalFilter: false
      },
      {
        header: 'Date created',
        accessorKey: 'createdAt',
        sortingFn: (a, b) => {
          const dateA = a.original.createdAt
            ? new Date(a.original.createdAt)
            : Infinity;
          const dateB = b.original.createdAt
            ? new Date(b.original.createdAt)
            : Infinity;
          return (
            (dateA instanceof Date ? dateA.getTime() : dateA) -
            (dateB instanceof Date ? dateB.getTime() : dateB)
          );
        },
        enableGlobalFilter: false,
        cell: info => {
          const value = info.getValue();
          return value ? abbreviatedDateTime(value) : '';
        }
      },
      {
        header: 'Date updated',
        accessorKey: 'updatedAt',
        sortingFn: (a, b) => {
          const dateA = a.original.updatedAt
            ? new Date(a.original.updatedAt)
            : Infinity;
          const dateB = b.original.updatedAt
            ? new Date(b.original.updatedAt)
            : Infinity;
          return (
            (dateA instanceof Date ? dateA.getTime() : dateA) -
            (dateB instanceof Date ? dateB.getTime() : dateB)
          );
        },
        enableGlobalFilter: false,
        cell: info => {
          const value = info.getValue();
          return value ? abbreviatedDateTime(value) : '';
        }
      }
    ],
    [handleNavigateToItem, missionPartner?.id]
  );

  return (
    <>
      <CustomTrainingTable
        columns={customTrainingTableColumns}
        loading={loading}
        pageLoading={pageLoading}
        combinedRows={filteredRows}
        openModal={addCustomTrainingItemModal.show}
        openFilters={showFilters}
        setOpenFilters={setShowFilters}
        setFilter={setFilter}
        filter={filter}
      />
      <Modal
        onKeyDown={handleKeyDown}
        ref={addCustomTrainingItemModal.modalRef}
      >
        {addCustomTrainingItemModal.isOpen && (
          <AddCustomTrainingItemModalContent
            missionPartner={missionPartner}
            onClose={addCustomTrainingItemModal.close}
            onSubmit={onCreateNewItem}
          />
        )}
      </Modal>
    </>
  );
};

export default CustomTrainingTab;
