'use client';

import dynamic from 'next/dynamic';
import {
  Tabs,
  Tab,
  TabPanel,
  useNotificationCenter,
  TabsList
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { useDeleteDownload, useGetUserDownloads } from '@/api/downloads';
import { useDeleteUpload, useGetUserUploads } from '@/api/uploads';
import { deleteReport } from './utils/deleteReport';
import { DOWNLOADS_TAB, UPLOADS_TAB } from './constants';
import type { FetchResult } from '@apollo/client';
import type { DeleteUploadMutation } from '@/api/codegen/graphql';
import { TableLoader } from '@/components_new/loaders/TableLoader';
import { getLoadingColumns } from '@/components_new/loaders/utils/getLoadingColumns';

const Table = dynamic(() => import('./components/Table/Table'), {
  ssr: false,
  loading: () => (
    <TableLoader
      columns={getLoadingColumns(['Reports', 'Date', 'Status'])}
      noButton
    />
  )
});

export const ReportCenterTabs = () => {
  const { notify } = useNotificationCenter();

  const { downloads, downloadsLoading } = useGetUserDownloads();
  const { uploads, uploadsLoading } = useGetUserUploads();

  const { deleteDownload } = useDeleteDownload();
  const { deleteUpload } = useDeleteUpload();

  const handleUploadDelete = async (
    id: string
  ): Promise<FetchResult<DeleteUploadMutation>> => {
    const result = await deleteUpload(id);
    return result;
  };

  return (
    <Tabs defaultValue="downloads" lazyMount>
      <TabsList>
        <Tab value="downloads">{DOWNLOADS_TAB}</Tab>
        <Tab value="uploads">{UPLOADS_TAB}</Tab>
      </TabsList>
      <TabPanel value="downloads">
        <div className={css({ mt: 8 })}>
          <Table
            rows={downloads}
            loading={downloadsLoading}
            onDelete={deleteReport({
              deleteHandler: deleteDownload,
              notificationHandler: notify,
              reportType: 'download'
            })}
            type="download"
          />
        </div>
      </TabPanel>
      <TabPanel value="uploads">
        <div className={css({ mt: 8 })}>
          <Table
            rows={uploads}
            loading={uploadsLoading}
            onDelete={deleteReport({
              deleteHandler: handleUploadDelete,
              notificationHandler: notify,
              reportType: 'upload'
            })}
            type="upload"
          />
        </div>
      </TabPanel>
    </Tabs>
  );
};
