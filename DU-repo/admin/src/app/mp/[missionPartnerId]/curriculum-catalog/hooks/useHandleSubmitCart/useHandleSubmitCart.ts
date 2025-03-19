import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAddCoursesToGroup, useAddPlansToGroup } from '@/api/groups';
import { useAddAssessmentsToUser, useAddCoursesToUser } from '@/api/user';
import { useAddPlansToUser } from '@/api/users';
import { useUpdateForceMultiplier } from '@/api/force-multipliers';
import {
  useAddFeaturedTrainingItems,
  useAddCollectionItems
} from '@/api/mission-partner';
import { useUpdateLab } from '@/api/lab';
import { useAddLabsToUser } from '@/api/lab/useAddLabsToUser';
import { TARGET_TYPE_MAP } from '../../components/MpCurriculumCatalogPage/constants/TARGET_TYPE_MAP';
import type {
  AddPlansInput,
  FindLabByIdQuery,
  FindLatestForceMultiplierByIdAdminQuery,
  ItemInput
} from '@/api/codegen/graphql';

// TODO: convert to cerberus
import { useToast } from '@digital-u/digital-ui';
import { mapCartToCollection } from '../utility/mapCartToCollection';
import { mapCartToFeaturedTraining } from '../utility/mapCartToFeaturedTraining';

const splitByCapitalLetterAndAddSpace = word =>
  word.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g).join(' ');

type UseHandleSubmitCartProps = {
  // TODO: Fix cart type
  cart: Array<{
    __typename: string;
    id: string;
    version: string;
    title: string;
    courseTitle: string;
    assessmentTitle: string;
    name: string;
    description: string;
    content: {
      summary: string;
    };
    courseDescription: string;
    assessmentDescription: string;
    vendorName: string;
    vendors: string[];
    missionPartner: {
      name: string;
    };
    launchConfig: {
      type: string;
      path: string;
    };
  }>;

  callbackPath: string;
  forceMultiplierById?: FindLatestForceMultiplierByIdAdminQuery['findLatestForceMultiplierByIdAdmin'];
  findLabById?: FindLabByIdQuery['findLabById'];

  collectionId?: string;
  moduleIndex?: number;
  missionPartnerId: string;
  targetId: string;
  targetType: string;
  userFriendlySourceLabel: string;
};

export const useHandleSubmitCart = ({
  cart,
  callbackPath,
  collectionId,
  findLabById,
  forceMultiplierById,
  moduleIndex,
  missionPartnerId,
  targetId,
  targetType,
  userFriendlySourceLabel
}: UseHandleSubmitCartProps) => {
  const router = useRouter();

  const [checkingOut, setCheckingOut] = useState(false);

  // TODO: Move UI logic out of here, probably?
  const [, setToast] = useToast();

  // Mutations
  const { addCoursesToGroup } = useAddCoursesToGroup();
  const { addPlansToGroup } = useAddPlansToGroup();
  const { addAssessmentsToUser } = useAddAssessmentsToUser();
  const { addCoursesToUser } = useAddCoursesToUser();
  const { addPlansToUser } = useAddPlansToUser();
  const { updateForceMultiplier } = useUpdateForceMultiplier();
  const { addFeaturedTrainingItems } = useAddFeaturedTrainingItems();
  const { updateLab } = useUpdateLab();
  const { addCollectionItems } = useAddCollectionItems();
  const { addLabsToUser } = useAddLabsToUser();

  const handleSubmitCart = async () => {
    setCheckingOut(true);
    const coursesInCart = cart.filter(item => item.__typename === 'Course');
    const courseIds = coursesInCart.map(item => item.id);

    const plansInCart = cart.filter(item =>
      ['LearningPath', 'Skill', 'ForceMultiplier'].includes(item.__typename)
    );
    const planDetailsArray = plansInCart.map(
      item =>
        ({
          planSourceId: item.id,
          planVersion: item.version,
          planName: item.title,
          planType: splitByCapitalLetterAndAddSpace(item.__typename)
        }) as AddPlansInput
    );

    const promiseArray = [];

    if (targetType === 'cohort') {
      addCohortToPromiseArray(promiseArray, courseIds, planDetailsArray);
    }

    if (targetType === 'user') {
      addUserToPromiseArray(promiseArray, courseIds, planDetailsArray);
    }

    if (targetType === 'force-multiplier') {
      addFMToPromiseArray(promiseArray);
    }

    if (targetType === 'lab') {
      addLabToPromiseArray(promiseArray, coursesInCart, planDetailsArray);
    }

    if (targetType === 'mission-partner-featured-training') {
      addMissionPartnerFeaturedTrainingToPromiseArray(promiseArray);
    }

    if (targetType === 'collections') {
      addCollectionToPromiseArray(promiseArray);
    }

    return Promise.all(promiseArray)
      .then(() =>
        setToast({
          kind: 'success',
          title: 'Success!',
          subtitle: `Successfully added ${cart.length} ${userFriendlySourceLabel} to ${TARGET_TYPE_MAP[targetType]}`
        })
      )
      .then(() => router.push(callbackPath))
      .catch(() => {
        setToast({
          kind: 'error',
          title: 'Error!',
          subtitle:
            'An error occured while adding items to the cart. Please try again later.'
        });
        setCheckingOut(false);
      });
  };

  const addCohortToPromiseArray = (
    promiseArray,
    courseIds: string[],
    planDetailsArray: AddPlansInput[]
  ) => {
    if (courseIds.length > 0) {
      promiseArray.push(
        addCoursesToGroup(targetId, courseIds, missionPartnerId)
      );
    }

    if (planDetailsArray.length > 0) {
      promiseArray.push(
        addPlansToGroup(targetId, planDetailsArray, missionPartnerId)
      );
    }
  };

  const addUserToPromiseArray = (
    promiseArray,
    courseIds: string[],
    planDetailsArray: AddPlansInput[]
  ) => {
    const assessmentsInCart = cart.filter(
      item => item.__typename === 'Assessment'
    );
    const assessmentIds = assessmentsInCart.map(item => item.id);

    const labsInCart = cart.filter(item => item.__typename === 'Lab');
    const labIds = labsInCart.map(item => item.id);

    if (assessmentIds.length > 0) {
      promiseArray.push(
        addAssessmentsToUser(targetId, assessmentIds, missionPartnerId)
      );
    }

    if (courseIds.length > 0) {
      promiseArray.push(
        addCoursesToUser(targetId, courseIds, missionPartnerId)
      );
    }

    if (planDetailsArray.length > 0) {
      promiseArray.push(
        addPlansToUser(targetId, planDetailsArray, missionPartnerId)
      );
    }

    if (labIds.length > 0) {
      promiseArray.push(addLabsToUser(targetId, labIds));
    }
  };

  const addFMToPromiseArray = promiseArray => {
    const forceMultiplierItems = cart.map(
      item =>
        ({
          id: item.id,
          type: item.__typename
        }) as ItemInput
    );

    const isForceMultiplierModularized =
      forceMultiplierById?.modules?.length > 0;

    if (isForceMultiplierModularized) {
      if (!moduleIndex && moduleIndex !== 0) {
        // If we don't know the moduleIndex, we can't add any items to the FM
        return setToast({
          kind: 'error',
          title: 'Error!',
          subtitle:
            'There was a problem adding items to the module. Please try again.'
        });
      }

      const moduleForceMultiplierItems = cart.map(item => ({
        itemId: item.id
      }));

      const forceMultiplierModules = forceMultiplierById.modules.map(
        (module, index) => {
          if (index === moduleIndex) {
            return {
              ...module,
              items: [...module.items, ...moduleForceMultiplierItems]
            };
          }

          return {
            ...module,
            id: module.id, // Ensure id is present
            title: module.title, // Ensure title is present
            items: module.items // Ensure items is present
          };
        }
      );

      promiseArray.push(
        updateForceMultiplier({
          id: forceMultiplierById.id,
          version: forceMultiplierById?.version,
          modules: forceMultiplierModules,
          newItems: forceMultiplierItems
        })
      );
    } else {
      promiseArray.push(
        updateForceMultiplier({
          id: forceMultiplierById?.id,
          version: forceMultiplierById.version,
          newItems: forceMultiplierItems
        })
      );
    }
  };

  const addLabToPromiseArray = (
    promiseArray,
    coursesInCart,
    planDetailsArray
  ) => {
    let relevantLearningPaths = findLabById.relevantLearningPaths || [];
    relevantLearningPaths = JSON.parse(JSON.stringify(relevantLearningPaths));
    if (planDetailsArray) {
      for (const item of planDetailsArray) {
        relevantLearningPaths.push({
          itemId: item.planSourceId,
          itemType: item.planType,
          itemTitle: item.planName,
          itemVersion: item.planVersion
        });
      }
    }

    let coreConceptItems = findLabById.coreConceptItems || [];
    coreConceptItems = JSON.parse(JSON.stringify(coreConceptItems));

    if (coursesInCart) {
      for (const item of coursesInCart) {
        coreConceptItems.push({
          itemId: item.id,
          itemTitle: item.courseTitle,
          itemType: item.__typename
        });
      }
    }

    const { ...lab } = findLabById;
    promiseArray.push(
      // Adding launchConfig/description for POC
      updateLab({
        ...lab,
        description: findLabById.description || '',
        launchConfig: {
          type: findLabById.launchConfig.type ?? 'jupyter',
          path: findLabById.launchConfig.path ?? 'path to jupyter'
        },
        relevantLearningPaths,
        coreConceptItems
      })
    );
  };

  const addMissionPartnerFeaturedTrainingToPromiseArray = promiseArray => {
    const missionPartnerFeaturedTrainingItems = cart.map(
      mapCartToFeaturedTraining
    );

    promiseArray.push(
      addFeaturedTrainingItems({
        id: missionPartnerId,
        featuredTraining: missionPartnerFeaturedTrainingItems
      })
    );
  };

  const addCollectionToPromiseArray = promiseArray => {
    const missionPartnerCollectionItems = cart.map(mapCartToCollection);

    promiseArray.push(
      addCollectionItems(
        collectionId,
        missionPartnerCollectionItems,
        missionPartnerId
      )
    );
  };

  return {
    handleSubmitCart,
    checkingOut
  };
};
