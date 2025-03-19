import { Assembly } from '@cerberus/icons';
import { css } from '@cerberus/styled-system/css';
import { flex } from '@cerberus/styled-system/patterns';

type TokensPageHeaderProps = {
  isLoadingTokens: boolean;
  tokenSumDetail: { balance: null | number; expiring: null | number };
};

const formatTokenBalanceValues = (
  tokenSumDetail
): { balance: string; expiring: string } => {
  return ['balance', 'expiring'].reduce(
    (acc, key) => ({
      ...acc,
      [key]: tokenSumDetail[key] ? tokenSumDetail[key].toLocaleString() : null
    }),
    { balance: null, expiring: null }
  );
};

export const TokensPageHeader = ({
  isLoadingTokens,
  tokenSumDetail
}: TokensPageHeaderProps) => {
  const formattedTokenSums = formatTokenBalanceValues(tokenSumDetail || {});

  return (
    <div className={flex({ mb: '6', mt: '2', alignItems: 'center' })}>
      <h1
        className={css({
          textStyle: 'h2',
          color: 'page.text.initial'
        })}
      >
        Token Activity
      </h1>
      <div className={css({ ml: 'auto ', textAlign: 'right' })}>
        <h2>Your token balance</h2>
        <div
          role="contentinfo"
          aria-busy={isLoadingTokens}
          className={flex({
            mt: 2,
            mb: 4,
            textStyle: 'h4',
            alignContent: 'center',
            flexWrap: 'wrap',
            justifyContent: 'right'
          })}
        >
          <div
            className={flex({
              borderRadius: '50%',
              gradient: 'charon-light',
              flexShrink: 0,
              h: '32px',
              w: '32px',
              justifyContent: 'center',
              alignContent: 'center',
              flexWrap: 'wrap',
              mr: 2
            })}
          >
            <Assembly size={16} />
          </div>
          <div className={css({ mt: 'auto', minW: '85px' })}>
            {formattedTokenSums.balance}
          </div>
        </div>
        {tokenSumDetail?.expiring > 0 && (
          <div
            className={css({
              color: 'danger.text.initial',
              textStyle: 'label-sm'
            })}
          >
            {formattedTokenSums.expiring} tokens expire soon
          </div>
        )}
      </div>
    </div>
  );
};
