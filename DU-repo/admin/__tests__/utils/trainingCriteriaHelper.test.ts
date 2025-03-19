import {
  formatTrainingCriteriaRule,
  formatTrainingItemType,
  TrainingCriteriaType
} from '@/utils/trainingCriteriaHelper';

describe('trainingCriteriaHelper', () => {
  describe('formatTrainingCriteriaRule', () => {
    it('should return "between" rule formatted string', () => {
      expect(
        formatTrainingCriteriaRule({
          minScore: 40,
          maxScore: 80,
          ruleType: TrainingCriteriaType.Between
        })
      ).toBe('between 40% and 80%');
    });

    it('should return "at or above" string', () => {
      expect(
        formatTrainingCriteriaRule({
          minScore: 65,
          ruleType: TrainingCriteriaType.AtOrAbove
        })
      ).toBe('at or above 65%');
    });

    it('should return "at or below" string', () => {
      expect(
        formatTrainingCriteriaRule({
          maxScore: 39,
          ruleType: TrainingCriteriaType.AtOrBelow
        })
      ).toBe('at or below 39%');
    });

    it('should return "between" string when both 0% minScore and any positive score', () => {
      expect(
        formatTrainingCriteriaRule({
          minScore: 0,
          maxScore: 47,
          ruleType: TrainingCriteriaType.Between
        })
      ).toBe('between 0% and 47%');
    });

    it('should return "always" when between 0% and 100%', () => {
      expect(
        formatTrainingCriteriaRule({
          minScore: 0,
          maxScore: 100,
          ruleType: TrainingCriteriaType['Always']
        })
      ).toBe('Always assign no matter the score:');
    });

    it('should return "at or above" when above 0%', () => {
      expect(
        formatTrainingCriteriaRule({
          minScore: 0,
          ruleType: TrainingCriteriaType['AtOrAbove']
        })
      ).toBe('at or above 0%');
    });

    it('should return "at or below" when below 100%', () => {
      expect(
        formatTrainingCriteriaRule({
          maxScore: 100,
          ruleType: TrainingCriteriaType['AtOrBelow']
        })
      ).toBe('at or below 100%');
    });
  });

  describe('formatTrainingItemType', () => {
    it('should return "Force Multiplier" type', () => {
      expect(
        formatTrainingItemType({
          type: 'TRAINING_PLAN',
          planType: 'Force Multiplier'
        })
      ).toBe('Force Multiplier');
    });

    it('should return "Assessment" type', () => {
      expect(
        formatTrainingItemType({
          type: 'ASSESSMENT'
        })
      ).toBe('Assessment');
    });

    it('should return "Course" type', () => {
      expect(
        formatTrainingItemType({
          type: 'COURSE'
        })
      ).toBe('Course');
    });

    it('should return empty', () => {
      expect(
        formatTrainingItemType({
          type: 'INVALID'
        })
      ).toBe('');
    });
  });
});
