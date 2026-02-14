import { IsYoutubeUrl } from './youtube-url.validator';

describe('IsYoutubeUrl Validator', () => {
  let validator: IsYoutubeUrl;

  beforeEach(() => {
    validator = new IsYoutubeUrl();
  });

  it('should validate standard YouTube URLs', () => {
    expect(
      validator.validate('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
    ).toBe(true);
  });

  it('should validate short YouTube URLs', () => {
    expect(validator.validate('https://youtu.be/dQw4w9WgXcQ')).toBe(true);
  });

  it('should reject non-YouTube URLs', () => {
    expect(validator.validate('https://vimeo.com/12345678')).toBe(false);
  });

  it('should reject invalid strings', () => {
    expect(validator.validate('not a url')).toBe(false);
  });
});
