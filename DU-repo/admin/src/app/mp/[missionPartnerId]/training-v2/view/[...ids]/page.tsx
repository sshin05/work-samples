import { getBlock } from '@digital-u/services/block/get-block';
import { getValidChildrenMetadata } from '@digital-u/services/block/get-valid-children-metadata';
import { notFound } from 'next/navigation';
import { SlashMenu } from './components/SlashMenu/';
import { ChildrenList } from './components/ChildrenList/';
import { EditTitleModal } from './components/EditTitleModal/';
import { AdmonitionTip } from './components/AdmonitionTip/';

const ViewPage = async ({ params }: { params: Promise<{ ids: string[] }> }) => {
  const { ids } = await params;

  const rootBlockId = ids[0];
  const rootBlock = await getBlock({
    id: rootBlockId,
    assert: false
  });
  if (!rootBlock) return notFound();

  const currentBlockId = ids.at(-1);
  const currentBlock = await getBlock({
    id: currentBlockId,
    assert: false
  });
  if (!currentBlock) return notFound();

  const allowedChildrenMetadata = await getValidChildrenMetadata({
    path: ids as [string, ...string[]]
  });

  return (
    <>
      <AdmonitionTip />

      <ChildrenList currentBlockId={currentBlockId} />

      {currentBlock.type === 'scorm' && (
        <div>
          This is where we can render a component for a SCORM editing
          experience! (ex. {`<SCORMBlockEditor />`})
        </div>
      )}

      {allowedChildrenMetadata.length > 0 && (
        <SlashMenu allowedChildrenMetadata={allowedChildrenMetadata} />
      )}

      <EditTitleModal currentBlock={currentBlock} />
    </>
  );
};

export default ViewPage;
