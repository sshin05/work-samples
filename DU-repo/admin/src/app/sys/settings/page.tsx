'use client';
import { useRouter } from 'next/navigation';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { Button, Text } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import {
  useFindAllSettings,
  useEnableSetting,
  useDisableSetting
} from '@/api/setting';
import { PageHeader } from '@/components_new/typography/PageHeader';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

const ManageSettings = () => {
  const { settings, settingsLoading } = useFindAllSettings();
  const { enableSetting } = useEnableSetting();
  const { disableSetting } = useDisableSetting();

  const router = useRouter();

  const mutableSettings = [...settings];

  mutableSettings.push(
    {
      id: 'alert-banner',
      name: 'Alert Banner',
      editText: 'Edit Content',
      route: getRouteUrl(routeGenerators.ManageSettingsAlertBanner())
    },
    {
      id: 'banner',
      name: 'Banner',
      editText: 'Edit Content',
      route: getRouteUrl(routeGenerators.ManageSettingsBanner())
    }
  );
  const orderedSettings = ['exchange', 'leaderboard', 'alert-banner', 'banner'];

  const sortedSettings = mutableSettings.toSorted((a, b) => {
    return orderedSettings.indexOf(a.id) - orderedSettings.indexOf(b.id);
  });

  return (
    <MainContentVStack>
      <div className={hstack({ justifyContent: 'space-between' })}>
        <div className={vstack()}>
          <PageHeader css={{ fontWeight: '700' }}>Manage Settings</PageHeader>
        </div>
      </div>
      <div
        className={vstack({ gap: '1.5rem', w: 'full' })}
        aria-busy={settingsLoading}
      >
        {sortedSettings.map(setting => (
          <div
            key={`${setting.id}-${setting.name}`}
            className={hstack({
              gap: 1,
              w: 'full',
              py: 5,
              px: 6,
              borderRadius: 'sm',
              background: 'page.surface.100',
              alignItems: 'center',
              justifyContent: 'space-between'
            })}
          >
            <div className={hstack({ gap: 1 })}>
              <Text as="h4" textStyle={{ base: 'h4' }}>
                {setting.name}
              </Text>
              <div className={css({ textAlign: 'left', ml: 5 })}>
                {setting?.enabled !== undefined && (
                  <div
                    className={css({
                      py: 1,
                      px: 3,
                      borderRadius: 8, // tokens do not work here
                      backgroundColor: setting?.enabled ? '#209722' : '#BE3017',
                      color: 'white'
                    })}
                  >
                    {setting.enabled ? 'Enabled' : 'Disabled'}
                  </div>
                )}
              </div>
            </div>
            {setting?.enabled === undefined ? (
              <Button
                className={css({ py: 3, px: 6 })}
                usage="outlined"
                shape="rounded"
                onClick={() => router.push(setting.route)}
              >
                {setting.editText}
              </Button>
            ) : (
              <>
                {!setting.enabled && (
                  <Button
                    className={css({ py: 3, px: 6 })}
                    usage="outlined"
                    shape="rounded"
                    onClick={() => enableSetting(setting.id)}
                  >
                    Enable
                  </Button>
                )}
                {setting.enabled && (
                  <Button
                    className={css({ py: 3, px: 6 })}
                    usage="outlined"
                    shape="rounded"
                    onClick={() => disableSetting(setting.id)}
                  >
                    Disable
                  </Button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </MainContentVStack>
  );
};

export default ManageSettings;
