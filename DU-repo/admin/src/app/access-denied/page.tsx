import { AccessDeniedLogoutLink } from './components/AccessDeniedLogoutLink';
import { PageHeader } from '@/components_new/typography/PageHeader';
import MainContentVStack from '@/components_new/layout/MainContentVStack';

const AccessDenied = () => {
  return (
    <MainContentVStack>
      <PageHeader>Access Denied</PageHeader>
      <span>
        You do not have permission to access this application. Please contact
        the your administrator if you think this is an error.
      </span>
      <AccessDeniedLogoutLink />
    </MainContentVStack>
  );
};

export default AccessDenied;
