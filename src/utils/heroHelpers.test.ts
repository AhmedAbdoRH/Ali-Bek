import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HERO_PILLARS,
  HERO_SPOTLIGHTS,
  buildWhatsAppQuoteUrl,
  getSpotlightById,
} from './heroHelpers';

test('hero spotlights include both brand image and tailoring detail views', () => {
  assert.equal(HERO_SPOTLIGHTS.length, 2);
  assert.equal(getSpotlightById('image').id, 'image');
  assert.equal(getSpotlightById('detail').id, 'detail');
});

test('hero pillars cover all 4 core Ali-Bek brand propositions', () => {
  assert.equal(HERO_PILLARS.length, 4);
  for (const pillar of HERO_PILLARS) {
    assert.ok(pillar.title.trim().length > 0);
    assert.ok(pillar.description.trim().length > 0);
  }
});

test('buildWhatsAppQuoteUrl encodes Arabic topic and sanitizes phone number', () => {
  const url = buildWhatsAppQuoteUrl('يونيفورم شركات', '+20 109-949-0594');
  assert.ok(url.startsWith('https://wa.me/201099490594?text='));
  assert.ok(decodeURIComponent(url).includes('يونيفورم شركات'));
});
