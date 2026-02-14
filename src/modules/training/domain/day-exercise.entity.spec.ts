import { DayExercise } from './day-exercise.entity';
import { Exercise } from '../../exercises/domain/exercise.entity';

describe('DayExercise Logic', () => {
  const mockExercise = new Exercise(
    '1',
    'Bench Press',
    'Base Description',
    'Chest',
    'http://youtube.com/base',
    null, // defaultImageUrl
    null, // thumbnailUrl
    new Date(),
    new Date(),
    'admin',
    null,
    null,
    null,
  );

  it('should use base description and video when NO overrides are present', () => {
    const dayExercise = new DayExercise(
      'de1',
      'd1',
      mockExercise,
      1,
      null, // customDescription
      null, // customVideoUrl
      null, // customImageUrl
      null, // coachNotes
      3,
      '10',
      2,
      90,
    );

    expect(dayExercise.description).toBe('Base Description');
    expect(dayExercise.videoUrl).toBe('http://youtube.com/base');
  });

  it('should use custom description and video when overrides ARE present', () => {
    const dayExercise = new DayExercise(
      'de1',
      'd1',
      mockExercise,
      1,
      'Custom Description',
      'http://youtube.com/custom',
      null, // customImageUrl
      null, // coachNotes
      3,
      '10',
      2,
      90,
    );

    expect(dayExercise.description).toBe('Custom Description');
    expect(dayExercise.videoUrl).toBe('http://youtube.com/custom');
  });
});
