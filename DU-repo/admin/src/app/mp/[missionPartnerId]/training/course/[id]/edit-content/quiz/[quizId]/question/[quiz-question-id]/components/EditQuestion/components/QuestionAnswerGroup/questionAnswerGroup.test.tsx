import React from 'react';
import { QuestionAnswerGroup } from '.';
import { render, screen, userEvent, waitFor } from '@@/test-utils';

describe('question-answer-group component', () => {
  const defaultChoices = [
    { choice: 'option-1', isCorrect: true },
    { choice: 'option-2', isCorrect: false }
  ];

  it('should render', () => {
    render(
      <QuestionAnswerGroup
        defaultChoices={defaultChoices}
        onChange={jest.fn}
        disabled={false}
      />
    );

    expect(screen.getByText('Answer Choices')).toBeInTheDocument();
    expect(screen.queryByText('add choice')).not.toBeInTheDocument();
  });

  it('should handle choice change', () => {
    let data = null;
    render(
      <QuestionAnswerGroup
        defaultChoices={defaultChoices}
        onChange={newChoices => {
          data = newChoices;
        }}
        disabled={false}
      />
    );
    const inputElements = screen.getAllByRole('textbox');
    userEvent.type(inputElements[0], ' is a new question');

    expect(data[0]).toEqual({
      choice: 'option-1 is a new question',
      isCorrect: true
    });
  });

  it('should handle correct change', async () => {
    let data = null;
    render(
      <QuestionAnswerGroup
        defaultChoices={defaultChoices}
        onChange={newChoices => {
          data = newChoices;
        }}
        disabled={false}
      />
    );

    const secondRadio = screen.getByLabelText('1 star');
    userEvent.click(secondRadio);

    await waitFor(() => {
      expect(data[1].isCorrect).toBeTruthy();
    });
  });

  it('should handle Add Choice', async () => {
    let data = null;
    render(
      <QuestionAnswerGroup
        showAdd
        onChange={newChoices => {
          data = newChoices;
        }}
        disabled={false}
      />
    );
    userEvent.click(screen.getByText('Add Choice'));

    await waitFor(() => {
      expect(data).toHaveLength(1);
    });
  });

  it('should handle multi correct change', async () => {
    let data = null;

    render(
      <QuestionAnswerGroup
        defaultChoices={defaultChoices}
        onChange={newChoices => {
          data = newChoices;
        }}
        multipleCorrect
        disabled={false}
      />
    );
    const radioButton = screen.getByLabelText('1 star');
    userEvent.click(radioButton);

    await waitFor(() => {
      expect(data).toHaveLength(2);
    });

    expect(data[0].isCorrect).toBeTruthy();
    expect(data[1].isCorrect).toBeTruthy();
  });
});
