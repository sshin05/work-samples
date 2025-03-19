export const updateForceMultiplierHandler = async (
  input,
  updateForceMultiplier,
  fetchForceMultiplierById,
  forceMultiplierId,
  notify,
  setShowEditTitleModal = undefined,
  setEditTitleLoading = undefined
) =>
  updateForceMultiplier(input)
    .then(async () => fetchForceMultiplierById(forceMultiplierId))
    .then(() => {
      notify({
        palette: 'success',
        heading: 'Success',
        description: 'Plan successfully updated'
      });
    })
    .catch(error => {
      notify({
        palette: 'danger',
        heading: 'Error',
        description: error.message
      });
    })
    .finally(() => {
      if (setShowEditTitleModal && setEditTitleLoading) {
        setShowEditTitleModal(false);
        setEditTitleLoading(false);
      }
    });

const checkContentChanged = (data, forceMultiplierById) => {
  if (!data) return null;
  const contentChanged =
    data.summary !== forceMultiplierById.content.summary ||
    data.description !== forceMultiplierById.content.description ||
    data.aboutTitle !== forceMultiplierById.content.about.title ||
    data.aboutDescription !== forceMultiplierById.content.about.description;

  return contentChanged
    ? {
        id: forceMultiplierById.id,
        content: {
          summary: data.summary,
          description: data.description || undefined,
          about: {
            title: data.aboutTitle,
            description: data.aboutDescription?.split('\n'),
            image: forceMultiplierById?.content?.about?.image ?? '',
            imageAltText: forceMultiplierById.title
          }
        }
      }
    : null;
};

const handleVisibilityValue = data => {
  return data?.visibility === 'Everyone'
    ? { all: [] }
    : data?.visibility === 'Air Force'
      ? { all: [{ fact: 'branch', operator: 'equal', value: 'Air Force' }] }
      : data?.visibility === 'Space Force'
        ? {
            all: [{ fact: 'branch', operator: 'equal', value: 'Space Force' }]
          }
        : data?.visibility === 'private-mission-partner-members-only'
          ? {
              all: [
                {
                  fact: 'branch',
                  operator: 'equal',
                  value: 'private-mission-partner-members-only'
                }
              ]
            }
          : { all: [{ fact: 'grade', operator: 'in', value: 'Private' }] };
};

export const handleUpdatePlanDetails = async (
  planDetailData,
  forceMultiplierById,
  updateForceMultiplier,
  updateForceMultiplierContent,
  fetchForceMultiplierById,
  notify
) => {
  const visibilityValue = handleVisibilityValue(planDetailData);
  const input = {
    id: forceMultiplierById.id,
    version: forceMultiplierById.version,
    conditions: visibilityValue,
    // react-hook-form ties the switch display and validation to the unsequenced field
    // but it displays as sequenced in the UI
    // so we need to flip the value here to match the backend
    unsequenced: !planDetailData?.unsequenced,
    missionPartnerId: planDetailData?.missionPartnerId
  };

  const contentInput = checkContentChanged(planDetailData, forceMultiplierById);

  // Have to call content resolver
  if (contentInput) {
    await updateForceMultiplierContent(contentInput);
  }

  return updateForceMultiplierHandler(
    input,
    updateForceMultiplier,
    fetchForceMultiplierById,
    forceMultiplierById.id,
    notify
  );
};

export const handleSelectImage = async (
  image,
  handleUploadImage,
  setFmImage,
  forceMultiplierById,
  notify,
  fetchForceMultiplierById
) => {
  try {
    const logoUrl = await handleUploadImage(image, forceMultiplierById.id);
    setFmImage(logoUrl);
    notify({
      palette: 'success',
      heading: 'Success',
      description: 'Updated training plan logo.'
    });
  } catch {
    notify({
      palette: 'danger',
      heading: 'Error',
      description: 'There was an error updating the training plan logo.'
    });
  } finally {
    await fetchForceMultiplierById(forceMultiplierById.id);
  }
};

export const handleUploadImage = (file, uploadForceMultiplierImage, id) =>
  file
    ? new Promise((resolve, reject) => {
        uploadForceMultiplierImage(file, id)
          .then(response => {
            resolve(response.data?.uploadForceMultiplierImage.url);
          })
          .catch(error => {
            reject(new Error(error));
          });
      })
    : '';

export const handlePublishForceMultiplier = async (
  validateForceMultiplier,
  forceMultiplierById,
  notify,
  updateForceMultiplierHandler
) => {
  const errors = validateForceMultiplier(forceMultiplierById);
  if (errors.length > 0) {
    notify({
      palette: 'error',
      header: 'Error',
      description:
        'You are required to fill out all of the content in order to publish a plan.'
    });
    return;
  }

  const input = {
    id: forceMultiplierById.id,
    version: forceMultiplierById.version,
    status: 'Published'
  };

  return updateForceMultiplierHandler(input);
};

export const handleCreateNewVersionForceMultiplier = async (
  createNewForceMultiplierVersion,
  forceMultiplierId,
  fetchForceMultiplierById,
  notify
) =>
  createNewForceMultiplierVersion(forceMultiplierId)
    .then(async () => fetchForceMultiplierById(forceMultiplierId))
    .then(() => {
      notify({
        palette: 'success',
        header: 'Success!',
        description: 'New version created successfully!'
      });
    })
    .catch(() => {
      notify({
        palette: 'error',
        header: 'Error',
        description: 'There was an error creating a new version.'
      });
    });

export const autoFillType = url => {
  const youTubeRegex =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/m;
  const vimeoRegex = /(http|https)?:\/\/(www\.)?(vimeo.com)/m;
  return vimeoRegex.exec(url) || youTubeRegex.exec(url);
};
