import {
  useFetchForceMultiplierHeaderData,
  useUpdateForceMultiplier
} from '@/api/force-multipliers';
import { ForceMultiplierHeader } from './ForceMultiplierHeader';
import { renderV3, screen } from '@@/test-utils';

jest.mock('@/api/force-multipliers');

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn()
  })),
  trapFocus: jest.fn(),
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Modal: ({ children, className, role, ariaModal }) => (
    <div className={className} role={role} aria-modal={ariaModal}>
      {children}
    </div>
  ),
  ModalHeader: jest.fn(({ children }) => <div>{children}</div>),
  ModalHeading: jest.fn(({ children }) => <h2>{children}</h2>),
  Portal: jest.fn(({ children }) => <h2>{children}</h2>),
  Input: ({ children, ...props }) => <input {...props}>{children}</input>,
  Field: ({ children, ...props }) => <div {...props}>{children}</div>,
  FieldMessage: ({ children, ...props }) => <div {...props}>{children}</div>,
  Label: ({ children, ...props }) => <div {...props}>{children}</div>
}));

jest.mock('@/components_new/loaders', () => ({
  BaseSkeleton: () => <div>BaseSkeleton</div>
}));

describe('ForceMultiplierHeader', () => {
  const mockUpdateFM = jest.fn(async () => Promise.resolve());
  const mockFetchHeaderData = jest.fn(async () => Promise.resolve());
  (useUpdateForceMultiplier as jest.Mock).mockReturnValue({
    updateForceMultiplier: mockUpdateFM,
    updateForceMultiplierLoading: false
  });
  (useFetchForceMultiplierHeaderData as jest.Mock).mockReturnValue({
    refetch: mockFetchHeaderData,
    data: { id: 'foo', version: '1', title: 'fmTest', status: 'Draft' },
    loading: false
  });

  it('should render', () => {
    renderV3(
      <ForceMultiplierHeader
        forceMultiplierId="force-multiplier"
        forceMultiplierByIdLoading={false}
        disabled={false}
      />
    );
    expect(screen.getByText(/fmTest/i)).toBeInTheDocument();
  });

  it('should handle fm loading', async () => {
    renderV3(
      <ForceMultiplierHeader
        forceMultiplierId="force-multiplier"
        forceMultiplierByIdLoading={true}
        disabled={false}
      />
    );
    expect(screen.getAllByText(/BaseSkeleton/i)[0]).toBeInTheDocument();
  });
});
