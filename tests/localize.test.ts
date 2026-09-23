import { describe, expect, it } from 'vitest';
import setupCustomlocalize from '../src/localize';
import type { HomeAssistant } from 'custom-card-helpers';

function hassWithLanguage(language: string): HomeAssistant {
  return { locale: { language } } as unknown as HomeAssistant;
}

describe('setupCustomlocalize', () => {
  it('translates a known key in the requested language', () => {
    const localize = setupCustomlocalize(hassWithLanguage('cs'));
    expect(localize('card.refresh')).toBe('Aktualizovat známky');
  });

  it('falls back to English when the requested language is not available', () => {
    const localize = setupCustomlocalize(hassWithLanguage('xx'));
    expect(localize('card.refresh')).toBe('Refresh marks');
  });

  it('falls back to English when hass is not provided', () => {
    const localize = setupCustomlocalize(undefined);
    expect(localize('card.refresh')).toBe('Refresh marks');
  });

  it('returns the key itself when missing from every language', () => {
    const localize = setupCustomlocalize(hassWithLanguage('en'));
    expect(localize('card.does_not_exist')).toBe('card.does_not_exist');
  });
});
