/**
 * @jest-environment jsdom
 */

import Location from '../location';

describe('parseCoordinates', () => {
  let location;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="popup">
        <input class="popup-input" />
        <button class="popup-button-close"></button>
        <button class="popup-button-submit"></button>
      </div>
    `;

    location = new Location();
  });

  test('should parse valid coordinates with space after comma', () => {
    const input = '51.50851, -0.12572';
    const result = location.parseCoordinates(input);
    expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
  });

  test('should parse valid coordinates without space after comma', () => {
    const input = '51.50851,-0.12572';
    const result = location.parseCoordinates(input);
    expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
  });

  test('should parse valid coordinates with square brackets', () => {
    const input = '[51.50851, -0.12572]';
    const result = location.parseCoordinates(input);
    expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
  });
});
