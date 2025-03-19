'use client';
import { useState, useEffect, useMemo } from 'react';
import {
  Button,
  useNotificationCenter,
  Modal,
  trapFocus,
  useModal,
  Portal
} from '@cerberus/react';
import { Add } from '@cerberus/icons';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useFindAllAffiliates } from '@/api/affiliate';
import { useFindAllMissionPartnersMinDetails } from '@/api/mission-partner';
import { getUserRoles } from '@/hooks/useCurrentSession/useCurrentSession';
import { MMPSkeleton } from '../MMPSkeleton/MMPSkeleton';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { AddMissionPartnerModalContent } from './components/AddMissionPartnerModalContent';
import { useFindUserRoles } from '@/api/role';
import { missionPartnerLogoMap } from '@/constants/missionPartnerLogoMap';
import type {
  Affiliate,
  MissionPartnerMinDetails
} from '@/api/codegen/graphql';
import { PageHeader } from '@/components_new/typography/PageHeader';
import {
  DEFAULT_MPS,
  getSpaceForceSections,
  sectionOptions
} from '../../utils/mpUtils';
import { SectionDivider } from '../SectionDivider/SectionDivider';
import { AccordionWrapper } from '../AccordionWrapper/AccordionWrapper';
import { ProgramList } from '../ProgramList/ProgramList';
import { ProgramLink } from '../ProgramLink';
import { SearchInput } from '../SearchInput/SearchInput';
import type { DuSession } from '@/types/DuSession';
import { vstack } from 'styled-system/patterns';
import { Container } from 'styled-system/jsx';
import { Checkbox } from '@/components_new/form/Checkbox/Checkbox';

const PAGE_HEADER_TITLE = 'Manage Mission Partners';

export const MpSearchPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { isDuAdmin, isSfAdmin, isAfAdmin } = getUserRoles(
    session as DuSession
  );
  const isAdmin = isDuAdmin || isSfAdmin || isAfAdmin;
  const { userRolesData, userRolesLoading } = useFindUserRoles();
  const [showTrialMPs, setShowTrialMPs] = useState(false);
  const { modalRef, show, close, isOpen } = useModal();
  const handleKeyDown = trapFocus(modalRef);
  const [missionPartnerSearch, setMissionPartnerSearch] = useState('');
  const { affiliates, affiliatesLoading, affiliatesError } =
    useFindAllAffiliates();
  const { notify } = useNotificationCenter();

  const sortedAffiliates = (affiliates: Affiliate[]) => {
    const sortedAffiliates = [...affiliates].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const indexDU = sortedAffiliates.findIndex(
      affiliate => affiliate.name === 'Digital University'
    );

    const affiliateDU = sortedAffiliates.splice(indexDU, 1);
    sortedAffiliates.unshift(...affiliateDU);
    return sortedAffiliates;
  };

  const {
    missionPartnersMinDetails,
    refetchMissionPartnersMinDetails,
    missionPartnersMinDetailsLoading
  } = useFindAllMissionPartnersMinDetails();

  const [affiliateOptions, setAffiliateOptions] = useState([]);

  useEffect(() => {
    const managesMultipleMissionPartners = userRolesData?.length > 1 || isAdmin;
    if (
      !managesMultipleMissionPartners &&
      !userRolesLoading &&
      Array.isArray(userRolesData)
    ) {
      router.push(
        getRouteUrl(
          routeGenerators.MissionPartner({
            missionPartnerId: userRolesData[0]?.missionPartnerId
          })
        )
      );
    }
  }, [userRolesData, userRolesLoading, router, isAdmin]);

  const filteredMissionPartners = useMemo((): MissionPartnerMinDetails[] => {
    const trialMissionPartners = missionPartnersMinDetails.filter(
      missionPartner => {
        return showTrialMPs && missionPartner?.trialEnabled === true;
      }
    );
    // Note: We need to sort mission partners so that all of the mission partners
    // that are defaults are first in the list, followed by
    // the remaining mission partners sorted alphabetically.

    // This will be converted longterm to be a back end responsibility.. for the time being
    // the old defaultForBranch method is not going to work.. we will have to think of something
    // else.
    const defaultMissionPartners: MissionPartnerMinDetails[] =
      missionPartnersMinDetails.filter(missionPartner => {
        return (
          DEFAULT_MPS.has(missionPartner.name) &&
          !trialMissionPartners.includes(missionPartner)
        );
      });

    const nonDefaultMissionPartners: MissionPartnerMinDetails[] =
      missionPartnersMinDetails
        .filter(missionPartner => !DEFAULT_MPS.has(missionPartner.name))
        .filter(missionPartner => {
          return !trialMissionPartners.includes(missionPartner);
        })
        .sort((a, b) => {
          const aNameLcase = a.name?.toLowerCase() || '';
          const bNameLcase = b.name?.toLowerCase() || '';
          return aNameLcase < bNameLcase ? -1 : aNameLcase > bNameLcase ? 1 : 0;
        });

    const sortedMissionPartners: MissionPartnerMinDetails[] = [
      ...defaultMissionPartners,
      ...nonDefaultMissionPartners
    ];

    if (!missionPartnerSearch) return sortedMissionPartners;

    return sortedMissionPartners?.filter(missionPartner =>
      missionPartner.name
        ?.toLowerCase()
        .includes(missionPartnerSearch.toLowerCase())
    );
  }, [missionPartnersMinDetails, missionPartnerSearch, showTrialMPs]);

  useEffect(() => {
    if (
      affiliates &&
      affiliates.length > 0 &&
      !affiliatesLoading &&
      !affiliatesError
    ) {
      const options = [
        { label: 'Select an affiliate', value: '' },
        ...affiliates.map(affiliate => ({
          label: affiliate.name,
          value: affiliate.id
        }))
      ];
      setAffiliateOptions(options);
    }
  }, [
    affiliates,
    affiliatesLoading,
    affiliatesError,
    missionPartnersMinDetails
  ]);

  const spaceForceSections = useMemo(
    () => getSpaceForceSections(filteredMissionPartners),
    [filteredMissionPartners]
  );

  const getFilteredMissionPartners = (affiliate: Affiliate, index: number) => {
    return (
      filteredMissionPartners?.some(
        partner => partner.affiliateId === affiliate.id
      ) && (
        <div key={`partner-${index}-${affiliate.id}`}>
          <SectionDivider />
          <AccordionWrapper
            title={`${affiliate.name} Programs (${
              filteredMissionPartners.filter(
                partner => partner.affiliateId === affiliate.id
              ).length
            })`}
            isExpanded={
              affiliates.findIndex(
                sortedAffiliate => sortedAffiliate.id === affiliate.id
              ) === 0
            }
          >
            {affiliate.id === 'space-force' ? (
              <div className={vstack({ alignItems: 'start' })}>
                {Object.keys(spaceForceSections).map(section => {
                  return (
                    <div
                      className={vstack({
                        alignItems: 'flex-start'
                      })}
                      key={section}
                    >
                      <h5
                        className={css({
                          pb: '0.5rem',
                          textStyle: 'h5'
                        })}
                      >
                        {section}
                      </h5>
                      <ProgramList>
                        {spaceForceSections[section].map(partner => (
                          <ProgramLink
                            key={partner.id}
                            href={getRouteUrl(
                              routeGenerators.MissionPartner({
                                missionPartnerId: partner.id
                              })
                            )}
                            tagName={null}
                            programName={partner.name}
                            affiliateId={partner?.affiliateId}
                            logoUrl={
                              partner.logoUrl ??
                              missionPartnerLogoMap[partner.affiliateId] ??
                              missionPartnerLogoMap.default
                            }
                          />
                        ))}
                      </ProgramList>
                    </div>
                  );
                })}
              </div>
            ) : (
              <ProgramList>
                {filteredMissionPartners.map(partner => {
                  return (
                    partner.affiliateId === affiliate.id && (
                      <ProgramLink
                        key={partner.id}
                        href={`${pathname}/${partner.id}`}
                        tagName={partner.trialEnabled ? 'Trial Phase' : null}
                        programName={partner.name}
                        affiliateId={partner?.affiliateId}
                        logoUrl={
                          partner.logoUrl ??
                          missionPartnerLogoMap[partner.affiliateId] ??
                          missionPartnerLogoMap.default
                        }
                      />
                    )
                  );
                })}
              </ProgramList>
            )}
          </AccordionWrapper>
        </div>
      )
    );
  };

  return (
    <Container>
      <div className={css({ w: '1312px' })}>
        <div
          className={hstack({
            justifyContent: 'space-between'
          })}
        >
          <div
            className={css({
              minH: '84px',
              mb: '8'
            })}
          >
            <PageHeader>
              <span
                className={css({
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  mb: '2'
                })}
              >
                {PAGE_HEADER_TITLE}
              </span>
            </PageHeader>
            <div
              aria-busy={missionPartnersMinDetailsLoading}
              className={css({ maxW: '260px' })}
            >
              <p className={css({ fontSize: 'sm' })}>
                {missionPartnersMinDetails?.length || 0} active mission partners
              </p>
            </div>
          </div>
          {isDuAdmin && (
            <div className={vstack()}>
              <div
                className={vstack({
                  gap: '3'
                })}
              >
                <div
                  className={hstack({
                    gap: '4'
                  })}
                >
                  <SearchInput
                    id="search-mission-partner"
                    placeholder="Search Mission Partner"
                    value={missionPartnerSearch}
                    onChange={value => setMissionPartnerSearch(value)}
                    onSearch={() => {
                      if (missionPartnerSearch) {
                        setMissionPartnerSearch('');
                      }
                    }}
                  />
                  <Button
                    role="button"
                    name="Mission Partner"
                    className={css({
                      py: '11px',
                      px: '4',
                      textStyle: 'body-sm',
                      fontWeight: 'medium',
                      cursor: 'pointer'
                    })}
                    shape="rounded"
                    onClick={show}
                  >
                    Mission Partner
                    <Add size="16" />
                  </Button>
                </div>
                <div className={css({ ml: 'auto' })}>
                  <Checkbox
                    onChange={() => {
                      setShowTrialMPs(prevState => !prevState);
                    }}
                    value={showTrialMPs}
                    name="filter-out-trials"
                    labelText="Don't show Mission Partners on a current trial basis"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={vstack({ alignItems: 'start' })}>
          {affiliatesLoading ? (
            <>
              <SectionDivider className={css({ mb: '112px' })} />
              <MMPSkeleton numberOfSkeletons={6} />
            </>
          ) : (
            <>
              {(sortedAffiliates(affiliates) || []).map((affiliate, index) =>
                getFilteredMissionPartners(affiliate, index)
              )}
              <SectionDivider />
            </>
          )}
        </div>
        <Portal>
          <Modal onKeyDown={handleKeyDown} ref={modalRef}>
            {isOpen && (
              <AddMissionPartnerModalContent
                affiliates={affiliateOptions}
                sections={sectionOptions}
                onClose={(id: string) => {
                  close();
                  refetchMissionPartnersMinDetails();
                  if (typeof id === 'string')
                    router.push(
                      getRouteUrl(
                        routeGenerators.MissionPartner({ missionPartnerId: id })
                      )
                    );
                }}
                setNotify={notify}
              />
            )}
          </Modal>
        </Portal>
      </div>
    </Container>
  );
};
