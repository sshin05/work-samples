import { useEffect, useMemo, useState } from 'react';
import { ModuleActions } from './ModuleActions';
import { ForceMultiplierModuleItem } from './ForceMultiplierModuleItem';
import { vstack } from '@cerberus/styled-system/patterns';

// this was refactored to extract the above functions because of sonarqube's `nest functions more than 4 levels deep` rule
const getUpdatedItems = (module, forceMultiplierItems) => {
  return module.items.map(item => {
    const matchingItem = forceMultiplierItems.find(
      originalItem => originalItem.id === item.itemId
    );
    return matchingItem ? matchingItem : {};
  });
};

export const CurriculumTabModules = ({
  isFmPublished,
  disabled,
  forceMultiplierById,
  forceMultiplierItems,
  setShowPreviewModalFor,
  setEditTitleLoading,
  setRemovingItems
}) => {
  const [modules, setModules] = useState([]);

  // this was refactored to extract the above functions because of sonarqube's `nest functions more than 4 levels deep` rule
  const modulesWithInformation = useMemo(
    () =>
      modules?.map(module => {
        const updatedItems = getUpdatedItems(module, forceMultiplierItems);

        return {
          ...module,
          items: updatedItems
        };
      }),
    [modules, forceMultiplierItems]
  );

  useEffect(() => {
    if (forceMultiplierById?.modules) {
      setModules(forceMultiplierById?.modules ?? []);
    }
  }, [forceMultiplierById]);

  return (
    <div
      className={vstack({
        gap: '6',
        w: 'full'
      })}
    >
      {modulesWithInformation?.map((module, index) => (
        <div
          key={module.id}
          className={vstack({
            border: `1px dashed page.text.gray`,
            padding: `4 2`,
            gap: '4',
            w: 'full'
          })}
        >
          <ModuleActions
            index={index}
            forceMultiplierById={forceMultiplierById}
            moduleTitle={module.title}
            moduleItems={module.items}
            isFmPublished={isFmPublished}
            disabled={disabled}
            modulesWithInformation={modulesWithInformation}
            forceMultiplierItems={forceMultiplierItems}
            setEditTitleLoading={setEditTitleLoading}
          />

          <ForceMultiplierModuleItem
            module={module}
            index={index}
            setModules={setModules}
            forceMultiplierById={forceMultiplierById}
            modules={modules ?? []}
            isFmPublished={isFmPublished}
            disabled={disabled}
            forceMultiplierItems={forceMultiplierItems}
            setRemovingItems={setRemovingItems}
            setShowPreviewModalFor={setShowPreviewModalFor}
          />
        </div>
      ))}
    </div>
  );
};
