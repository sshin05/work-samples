'use client';

import { hstack, container } from '@cerberus/styled-system/patterns';
import {
  Button,
  Field,
  FieldMessage,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalHeading,
  ModalDescription,
  useModal,
  trapFocus,
  Show
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import {
  sqlFindMarketplaceVendors,
  sqlCreateMarketplaceVendor,
  sqlUpdateMarketplaceVendor,
  sqlArchiveMarketplaceVendor
} from '@/app/api/marketplace/vendors';
import { useForm, Controller } from 'react-hook-form';
import { useCallback, useState, useEffect } from 'react';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { useRouter } from 'next/navigation';
import { useSQLQuery, useSQLMutation } from '@/app/api';
import { VendorCard } from '@/app/marketplace/components/VendorCard/VendorCard';
import { MarketplaceCardsContainer } from '@/app/marketplace/components/MarketplaceCardsContainer/MarketplaceCardsContainer';
import ManagePageHeader from '../components/MangePageHeader/ManagePageHeader';
import { MiniUploader } from '../../components/MiniUploader/MiniUploader';

const ManageMarketplaceVendors = () => {
  const router = useRouter();
  const [vendorToEdit, setVendorToEdit] = useState(null);

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
      text: 'Vendors'
    }
  ];

  const {
    data: marketplaceVendors,
    query: findMarketplaceVendors,
    loading: marketplaceVendorsLoading
  } = useSQLQuery(sqlFindMarketplaceVendors, {
    options: { filter: { isArchived: false } }
  });
  const {
    mutation: createMarketplaceVendor,
    error: createMarketplaceVendorError
  } = useSQLMutation(sqlCreateMarketplaceVendor, {
    callback: () => {
      findMarketplaceVendors({ filter: { isArchived: false } });
    }
  });
  const {
    mutation: updateMarketplaceVendor,
    error: updateMarketplaceVendorError
  } = useSQLMutation(sqlUpdateMarketplaceVendor);
  const {
    mutation: archiveMarketplaceVendor,
    error: archiveMarketplaceVendorError
  } = useSQLMutation(sqlArchiveMarketplaceVendor, {
    callback: () => {
      findMarketplaceVendors({ filter: { isArchived: false } });
    }
  });

  //const handleVendorClick = marketplaceVendorTag => {
  // TODO: Implement route
  // router.push({
  //   pathname: router.pathname + `/[marketplaceVendorTag]`,
  //   query: { marketplaceVendorTag }
  // });
  //};

  const { modalRef, show, close } = useModal();
  const modalHandleKeyDown = trapFocus(modalRef);

  const handleSave = useCallback(
    async data => {
      if (vendorToEdit) {
        // Update the vendor
        updateMarketplaceVendor({
          id: vendorToEdit.id,
          ...data
        });
      } else {
        // Create a new vendor
        createMarketplaceVendor(data);
      }

      close();
    },
    [vendorToEdit]
  );

  const handleDelete = useCallback(async vendor => {
    archiveMarketplaceVendor({ id: vendor.id });
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = useForm();

  // Watches for changes to the vendorToEdit state and updates the form fields.
  useEffect(() => {
    setValue('name', vendorToEdit?.name || '');
    setValue('uniqueTag', vendorToEdit?.uniqueTag || '');
    setValue('shortDescription', vendorToEdit?.shortDescription || '');
    setValue('description', vendorToEdit?.description || '');
    setValue('logoPath', vendorToEdit?.logoPath || '');
    setValue('imagePath', vendorToEdit?.imagePath || false);
  }, [vendorToEdit]);

  return (
    <div>
      <ManagePageHeader
        breadcrumbs={breadcrumbs}
        title="Vendors"
        subtitle="Deliver training at the speed of the mission."
        description="Upload & Update Vendors"
      />
      <div className={container({ mt: 16 })}>
        <div className={hstack()}>
          <Button
            onClick={() => {
              setVendorToEdit(null);
              show();
            }}
          >
            Create New Vendor
          </Button>
          &nbsp;
          <Button
            onClick={() => {
              const uploadRoute = getRouteUrl(
                routeGenerators.ManageMarketplaceVendorUpload()
              );
              router.push(uploadRoute);
            }}
          >
            Upload Vendors
          </Button>
          &nbsp;
          <Button
            onClick={() => {
              // could be marked as forceFetch:true
              findMarketplaceVendors({ filter: { isArchived: false } });
            }}
          >
            Reload Vendors
          </Button>
        </div>
        <ul
          className={css({
            textStyle: 'body-md'
          })}
        >
          {marketplaceVendorsLoading && <p>Loading...</p>}
          {!marketplaceVendorsLoading &&
            marketplaceVendors?.records?.length === 0 && (
              <p>No vendors found.</p>
            )}
          <br />

          {marketplaceVendors?.records ? (
            <p className={css({ mb: 2 })}>
              Showing {marketplaceVendors?.records?.length} Vendor
              {marketplaceVendors?.records?.length !== 1 ? 's' : ''}
            </p>
          ) : null}
          <MarketplaceCardsContainer>
            {marketplaceVendors?.records?.map((vendor, index) => (
              <VendorCard
                vendor={vendor}
                key={index}
                buttons={[
                  {
                    title: 'Edit',
                    palette: 'action',
                    onClick: () => {
                      setVendorToEdit(vendor);
                      show();
                    }
                  },
                  {
                    title: 'Delete',
                    palette: 'danger',
                    onClick: () => {
                      handleDelete(vendor);
                    }
                  }
                ]}
              />
            ))}
          </MarketplaceCardsContainer>
        </ul>
      </div>

      <Modal onKeyDown={modalHandleKeyDown} ref={modalRef}>
        <ModalHeader>
          <ModalHeading>
            {vendorToEdit ? 'Edit Vendor' : 'Create New Vendor'}
          </ModalHeading>
        </ModalHeader>
        <ModalDescription>
          {vendorToEdit
            ? 'Use this form to edit the marketplace vendor.'
            : 'Use this form to create a new marketplace vendor.'}
        </ModalDescription>

        <form onSubmit={handleSubmit(handleSave)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'A name is required.' }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <Field {...fieldState}>
                <Label htmlFor="name">Name</Label>
                <Input
                  describedBy="help:name"
                  id="name"
                  placeholder="Vendor name"
                  type="text"
                  {...field}
                />
                <FieldMessage id="help:name">
                  The name of the vendor.
                </FieldMessage>
              </Field>
            )}
          />

          <Controller
            name="uniqueTag"
            control={control}
            defaultValue=""
            rules={{ required: 'A unique tag is required.' }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <Field {...fieldState}>
                <Label htmlFor="uniqueTag">Unique Tag</Label>
                <Input
                  describedBy="help:uniqueTag"
                  id="uniqueTag"
                  placeholder="Unique Tag"
                  type="text"
                  {...field}
                />
                <FieldMessage id="help:uniqueTag">
                  The Unique Tag of the vendor.
                </FieldMessage>
              </Field>
            )}
          />

          <Controller
            name="shortDescription"
            control={control}
            defaultValue=""
            rules={{ required: 'A short description is required.' }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <Field {...fieldState}>
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input
                  describedBy="help:shortDescription"
                  id="shortDescription"
                  placeholder="Short description"
                  type="text"
                  {...field}
                />
                <FieldMessage id="help:shortDescription">
                  A short description of the vendor.
                </FieldMessage>
              </Field>
            )}
          />

          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: 'A description is required.' }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <Field {...fieldState}>
                <Label htmlFor="description">Description</Label>
                <Input
                  describedBy="help:description"
                  id="description"
                  placeholder="Description"
                  type="text"
                  {...field}
                />
                <FieldMessage id="help:description">
                  A description of the vendor.
                </FieldMessage>
              </Field>
            )}
          />
          <Field>
            <Label htmlFor="Vendor Logo Upload">Vendor Logo</Label>
            <MiniUploader
              accept=".png, .jpg, .jpeg, .gif, .svg, .webp"
              heading="Upload Vendor Logo"
              fileUploadApiPath="/admin/api/marketplace/vendors/upload-logo"
              onUploaded={location => {
                setValue('logoPath', location);
                console.log('location', location);
              }}
              additionalFormData={{
                vendorTag: vendorToEdit?.uniqueTag
              }}
            />
          </Field>
          <Field>
            <Label htmlFor="Vendor Logo Upload">Vendor Brand Image</Label>
            <MiniUploader
              accept=".png, .jpg, .jpeg, .gif, .svg, .webp"
              heading="Upload Vendor Brand Image"
              fileUploadApiPath="/admin/api/marketplace/vendors/upload-image"
              onUploaded={location => {
                setValue('imagePath', location);
                console.log('location', location);
              }}
              additionalFormData={{
                vendorTag: vendorToEdit?.uniqueTag
              }}
            />
          </Field>

          <div className={hstack()}>
            <Button
              disabled={isSubmitting}
              palette="action"
              shape="rounded"
              usage="filled"
              type="submit"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
            <Button usage="outlined" onClick={close} type="button">
              Close
            </Button>
          </div>
        </form>
      </Modal>

      <Show when={createMarketplaceVendorError != null}>
        <div className={css({ color: 'danger.text.initial' })}>
          {createMarketplaceVendorError}
        </div>
      </Show>
      <Show when={updateMarketplaceVendorError != null}>
        <div className={css({ color: 'danger.text.initial' })}>
          {updateMarketplaceVendorError}
        </div>
      </Show>
      <Show when={archiveMarketplaceVendorError != null}>
        <div className={css({ color: 'danger.text.initial' })}>
          {archiveMarketplaceVendorError}
        </div>
      </Show>
    </div>
  );
};

export default ManageMarketplaceVendors;

// <Show when={true} key={vendor.id}>
//   <div className={css({ cursor: 'pointer' })} key={vendor.id}>
//     <li key={vendor.id} className={hstack()}>
//       <div style={{ whiteSpace: 'pre-wrap', fontSize: 10 }}>
//         {!vendor
//           ? '[...]'
//           : 'The data: ' + JSON.stringify(vendor, null, 3)}
//       </div>

//       <div className={hstack()}>
//         <Link
//           href={getRouteUrl(
//             routeGenerators.ManageMarketplaceVendor({
//               marketplaceVendorTag: vendor.uniqueTag
//             })
//           )}
//         >
//           <h4>{vendor.name}</h4>
//           <p>{vendor.shortDescription}</p>
//           <img src={vendor.logoPath} alt={vendor.name} />
//           <p className={css({ color: 'danger.text.initial' })}>
//             {vendor.isArchived ? 'ARCHIVED' : ''}
//           </p>
//         </Link>
//         <Button
//           onClick={event => {
//             event.stopPropagation();
//             handleDelete(vendor);
//           }}
//         >
//           Delete
//         </Button>
//       </div>
//     </li>
//   </div>
// </Show>
