import { render, screen, userEvent } from '@@/test-utils';
import ItemCardList from './ItemCardList';
import _ from 'lodash';

jest.mock('../ItemCard/ItemCard', () => ({
  __esModule: true,
  default: ({
    item,
    title,
    duration,
    description,
    vendorIconProp,
    onAddToCart,
    isItemInCart
  }) => (
    <div key={item.id}>
      <p>{title}</p>
      <p>{description}</p>
      <p>Duration: {duration}</p>
      <p>Vendor: {vendorIconProp}</p>
      <button onClick={() => onAddToCart(item)}>Select</button>
      <p>{isItemInCart ? 'In Cart' : ''}</p>
    </div>
  )
}));

describe('ItemCardList', () => {
  const mockItemList = [
    {
      __typename: 'ForceMultiplier',
      id: '100',
      title: 'Javascript Force Multiplier',
      totalDuration: 120,
      unsequenced: false,
      content: {
        description: null,
        summary: 'test summary'
      }
    },
    {
      __typename: 'Assessment',
      id: 'pluralsight#100',
      vendorId: 'pluralsight',
      vendorAssessmentId: '100',
      vendorName: 'Pluralsight',
      assessmentTitle: 'Javascript Assessment',
      assessmentDescription: 'assessmentDescription',
      assessmentUrl: 'assessmentUrl',
      durationInMinutes: 30
    },
    {
      __typename: 'Lab',
      id: 'Lab-1',
      missionPartner: { name: 'DU Labs' },
      name: 'Javascript Lab',
      description: 'labDescription'
    },
    {
      __typename: 'Lab',
      id: 'Lab-2',
      missionPartner: { name: 'DU Labs' },
      name: 'Javascript Lab Two',
      description: 'labDescription two'
    },
    {
      __typename: 'Survey',
      id: 'Survey-1',
      missionPartnerId: 'DU Labs',
      name: 'Javascript Survey',
      description: 'surveyDescription'
    },
    {
      __typename: 'Survey',
      id: 'Survey-2',
      missionPartnerId: 'DU Labs',
      name: 'Javascript Survey Two',
      description: 'second survey description'
    },
    {
      __typename: 'Assessment',
      id: 'pluralsight#101',
      vendorId: 'pluralsight',
      vendorAssessmentId: '101',
      vendorName: 'Pluralsight',
      assessmentTitle: 'Javascript Assessment Two',
      assessmentDescription: 'assessmentDescription two',
      assessmentUrl: 'assessmentUrl two'
    }
  ];

  const mockAddToCart = jest.fn();

  it('should render a list', () => {
    render(<ItemCardList items={mockItemList} onAddToCart={mockAddToCart} />);

    expect(screen.getByText('Javascript Force Multiplier')).toBeInTheDocument();
    expect(screen.getByText('Javascript Assessment')).toBeInTheDocument();
    expect(screen.getByText('Javascript Lab')).toBeInTheDocument();

    const firstItemAddToCartButton = screen.getAllByRole('button', {
      name: 'Select'
    })[0];
    expect(firstItemAddToCartButton).toBeInTheDocument();

    userEvent.click(firstItemAddToCartButton);
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });

  it('should only match cart items with identical id, version, __typename, title, and vendorId', () => {
    const mockCart = [
      {
        id: 'pluralsight#100',
        version: '1',
        __typename: 'Assessment',
        vendorId: 'pluralsight',
        assessmentTitle: 'Javascript Assessment',
        assessmentDescription: 'description'
      }
    ];

    const mockItems = [
      {
        id: 'pluralsight#100',
        version: '1',
        __typename: 'Assessment',
        vendorId: 'pluralsight',
        assessmentTitle: 'Javascript Assessment',
        assessmentDescription: 'description'
      },
      {
        id: 'pluralsight#100',
        version: '1',
        __typename: 'Assessment',
        vendorId: 'notpluralsight',
        assessmentTitle: 'Javascript Assessment',
        assessmentDescription: 'description'
      },
      {
        id: 'pluralsight#100',
        version: '2',
        __typename: 'Assessment',
        vendorId: 'pluralsight',
        assessmentTitle: 'Javascript Assessment',
        assessmentDescription: 'description'
      },
      {
        id: 'pluralsight#100',
        version: '1',
        __typename: 'Course',
        vendorId: 'pluralsight',
        courseTitle: 'Javascript Assessment',
        courseDescription: 'description'
      },
      {
        id: 'pluralsight#100',
        version: '1',
        __typename: 'Assessment',
        vendorId: 'pluralsight',
        assessmentTitle: 'Different Title',
        assessmentDescription: 'description'
      }
    ];

    render(
      <ItemCardList items={mockItems} cart={mockCart} onAddToCart={jest.fn()} />
    );

    const inCartButtons = screen.getAllByText('In Cart');
    expect(inCartButtons).toHaveLength(1);
  });
});
