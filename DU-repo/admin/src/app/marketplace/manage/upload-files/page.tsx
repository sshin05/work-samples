'use client';

import { container, vstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import ManagePageHeader from '../components/MangePageHeader/ManagePageHeader';
import { getRouteUrl } from '@/utils/getRouteUrl';
import { MiniUploader } from '../../components/MiniUploader/MiniUploader';

const UploadFiles = () => {
  const breadcrumbs = [
    {
      text: 'Admin Portal',
      href: getRouteUrl('/')
    },
    {
      text: 'Manage Marketplace',
      href: getRouteUrl('/marketplace/manage')
    },
    {
      text: 'Upload Files'
    }
  ];

  return (
    <>
      <ManagePageHeader
        breadcrumbs={breadcrumbs}
        title="Adjust Tokens"
        subtitle="Deliver training at the speed of the mission."
        description="Manage Tokens"
      />
      <div className={vstack()}>
        <div
          className={container({
            mt: 16,
            bg: 'page.surface.200',
            px: '6',
            py: '8',
            borderRadius: 'sm'
          })}
        >
          <h3
            className={css({
              textStyle: 'h2',
              color: 'page.text.initial',
              mb: 2
            })}
          >
            Upload Files
          </h3>
        </div>
        <div>
          <MiniUploader
            fileUploadApiPath="/admin/api/marketplace/file-upload"
            heading="Upload a logo"
            accept=".png,.jpg,.jpeg,.gif,.svg,.webp"
          />
        </div>
      </div>
    </>
  );
};

export default UploadFiles;
