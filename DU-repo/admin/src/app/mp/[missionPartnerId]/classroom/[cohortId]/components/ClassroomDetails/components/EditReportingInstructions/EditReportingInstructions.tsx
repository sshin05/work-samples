import { Button, Input, Textarea, IconButton, Spinner } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { flex, hstack } from '@cerberus/styled-system/patterns';
import { Controller, useForm } from 'react-hook-form';
import { Close } from '@cerberus/icons';
import {
  type EditReportingInstructionsProps,
  type FormSubmissionData,
  FORM_INPUTS
} from './EditReportingInstructions.types';
import { formatFormInputsForSave } from './utils/formatFormInputsForSave';
import { sqlUpdateCohort } from '@/app/api/cohorts';
import { useSQLMutation } from '@/app/api';
import type { CohortData } from '../../../../cohort.types';

import { FormFieldWrapper } from '../../../FormFieldWrapper';
import { formatForDateInputDisplay } from './utils/formatForDateInputDisplay/formatForDateInputDisplay';
import { DetailCardHeader } from '../DetailCardHeader/DetailCardHeader';
import { DetailCardBody } from '../DetailCardBody/DetailCardBody';

export const MAX_ADDITIONAL_DETAIL_CHARACTER_COUNT = 123;

export const EditReportingInstructions = ({
  cohortData,
  onClose,
  afterSubmit
}: EditReportingInstructionsProps) => {
  const { mutation: updateCohort } = useSQLMutation(sqlUpdateCohort);

  const {
    control: formControl,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  const handleFormSubmission = async (formData: FormSubmissionData) => {
    try {
      const newCohort: CohortData = {
        ...cohortData,
        ...formatFormInputsForSave({ formData })
      };

      await updateCohort(newCohort);
      await afterSubmit();
    } catch (err) {
      console.error('Failed to save reporting instructions', err);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <DetailCardHeader>
        <IconButton
          ariaLabel="Exist Edit Reporting Instructions"
          size="lg"
          palette="action"
          usage="ghost"
          onClick={onClose}
          className={css({
            alignSelf: 'start',
            ml: 'auto',
            cursor: 'pointer'
          })}
        >
          <Close size={24} />
        </IconButton>
      </DetailCardHeader>

      <DetailCardBody>
        <form
          className={css({ w: 'full' })}
          onSubmit={handleSubmit(handleFormSubmission)}
        >
          <div
            className={css({
              gap: 8,
              display: {
                base: 'block',
                '2xl': 'flex'
              }
            })}
          >
            <div className={flex()}>
              <Controller
                name={FORM_INPUTS.START_DATE}
                control={formControl}
                defaultValue={formatForDateInputDisplay(
                  cohortData.meetingStartDate
                )}
                rules={{ required: true }}
                render={({ field: { ref, ...field }, fieldState }) => {
                  return (
                    <div
                      className={css({
                        flex: '1 1 50%'
                      })}
                    >
                      <FormFieldWrapper
                        fieldState={fieldState}
                        fieldName={FORM_INPUTS.START_DATE}
                        isRequired
                      >
                        <Input
                          className={css({
                            borderTopRightRadius: '0px',
                            borderBottomRightRadius: '0px',
                            position: 'relative',
                            '&:focus': {
                              zIndex: '2'
                            }
                          })}
                          id={FORM_INPUTS.START_DATE}
                          placeholder=""
                          type="date"
                          {...field}
                        />
                      </FormFieldWrapper>
                    </div>
                  );
                }}
              />

              <Controller
                name={FORM_INPUTS.END_DATE}
                control={formControl}
                defaultValue={formatForDateInputDisplay(
                  cohortData.meetingEndDate
                )}
                rules={{
                  required: 'End date is required',
                  validate: (value, fieldValues) =>
                    !fieldValues[FORM_INPUTS.START_DATE] ||
                    new Date(value) >
                      new Date(fieldValues[FORM_INPUTS.START_DATE]) ||
                    'End date must be after start date'
                }}
                render={({ field: { ref, ...field }, fieldState }) => {
                  return (
                    <div
                      className={css({
                        flex: '1 1 50%'
                      })}
                    >
                      <FormFieldWrapper
                        fieldState={fieldState}
                        fieldName={FORM_INPUTS.END_DATE}
                        isRequired
                      >
                        <Input
                          className={css({
                            borderBottomLeftRadius: '0px',
                            borderTopLeftRadius: '0px'
                          })}
                          id={FORM_INPUTS.END_DATE}
                          placeholder=""
                          type="date"
                          {...field}
                        />
                      </FormFieldWrapper>
                    </div>
                  );
                }}
              />
            </div>

            <Controller
              name={FORM_INPUTS.DATE_DETAILS}
              control={formControl}
              defaultValue={cohortData.meetingDetails || ''}
              rules={{ required: false }}
              render={({ field: { ref, ...field }, fieldState }) => {
                return (
                  <div
                    className={css({
                      w: 'full',
                      mt: {
                        base: 4,
                        '2xl': 0
                      }
                    })}
                  >
                    <FormFieldWrapper
                      fieldState={fieldState}
                      fieldName={FORM_INPUTS.DATE_DETAILS}
                      showOptionalTag
                    >
                      <Input
                        className={css({})}
                        id={FORM_INPUTS.DATE_DETAILS}
                        placeholder="MWF - 900 EST"
                        type="text"
                        {...field}
                      />
                    </FormFieldWrapper>
                  </div>
                );
              }}
            />
          </div>

          <Controller
            name={FORM_INPUTS.MEETING_LOCATION}
            control={formControl}
            defaultValue={cohortData.location || ''}
            rules={{ required: false }}
            render={({ field: { ref, ...field }, fieldState }) => {
              return (
                <div
                  className={css({
                    mt: 8
                  })}
                >
                  <FormFieldWrapper
                    fieldState={fieldState}
                    fieldName={FORM_INPUTS.MEETING_LOCATION}
                    showOptionalTag
                  >
                    <Input
                      className={css({})}
                      id={FORM_INPUTS.MEETING_LOCATION}
                      placeholder=""
                      type="text"
                      {...field}
                    />
                  </FormFieldWrapper>
                </div>
              );
            }}
          />

          <Controller
            name={FORM_INPUTS.MEETING_DETAILS}
            control={formControl}
            defaultValue={cohortData.meetingDetails || ''}
            rules={{ required: false }}
            render={({ field: { ref, ...field }, fieldState }) => {
              return (
                <div
                  className={css({
                    mt: 8
                  })}
                >
                  <FormFieldWrapper
                    fieldState={fieldState}
                    fieldName={FORM_INPUTS.MEETING_DETAILS}
                    showOptionalTag
                  >
                    <Textarea
                      className={css({})}
                      id={FORM_INPUTS.MEETING_DETAILS}
                      placeholder=""
                      {...field}
                    />
                  </FormFieldWrapper>
                  <div
                    className={css({
                      textAlign: 'right',
                      color: 'page.text.100',
                      textStyle: 'body-sm',
                      mt: 1
                    })}
                  >
                    {field.value.length} /{' '}
                    {MAX_ADDITIONAL_DETAIL_CHARACTER_COUNT}
                  </div>
                </div>
              );
            }}
          />

          <div
            className={flex({
              mt: 8
            })}
          >
            <Button
              disabled={isSubmitting}
              palette="action"
              shape="rounded"
              usage="filled"
              type="submit"
              className={hstack({
                mr: '4'
              })}
            >
              {isSubmitting && <Spinner size="1em" />}
              Save
            </Button>
            <Button
              usage="outlined"
              shape="rounded"
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DetailCardBody>
    </>
  );
};
