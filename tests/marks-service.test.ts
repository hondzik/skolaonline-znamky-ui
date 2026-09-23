import { describe, expect, it, vi } from 'vitest';
import { fetchMarks, resolveConfigEntryId } from '../src/utils/marks-service';
import type { HomeAssistant } from 'custom-card-helpers';

function buildHass(callService: ReturnType<typeof vi.fn>): HomeAssistant {
  return {
    entities: {
      'sensor.child_marks': { entity_id: 'sensor.child_marks', config_entry_id: 'entry123' },
      'sensor.no_entry_marks': { entity_id: 'sensor.no_entry_marks' },
    },
    callService,
  } as unknown as HomeAssistant;
}

describe('resolveConfigEntryId', () => {
  it('returns the config_entry_id from the entity registry', () => {
    const hass = buildHass(vi.fn());
    expect(resolveConfigEntryId(hass as unknown as HassWithRegistry, 'sensor.child_marks')).toBe('entry123');
  });

  it('throws when the entity has no config_entry_id', () => {
    const hass = buildHass(vi.fn());
    expect(() => resolveConfigEntryId(hass as unknown as HassWithRegistry, 'sensor.no_entry_marks')).toThrow();
  });
});

describe('fetchMarks', () => {
  it('calls skolaonline_znamky.get_marks with returnResponse=true', async () => {
    const callService = vi.fn().mockResolvedValue({ marks: [{ id: 'M1', subject_id: 'S1', subject_name: 'Fyzika', value: '1', weight: 0.2, date: '2026-09-22T00:00:00', theme: 'Kmity', verbal_evaluation: '', is_points: false }] });
    const hass = buildHass(callService);

    const marks = await fetchMarks(hass, 'sensor.child_marks', 'D3006424');

    expect(callService).toHaveBeenCalledWith('skolaonline_znamky', 'get_marks', { config_entry_id: 'entry123', student_id: 'D3006424' }, undefined, undefined, true);
    expect(marks).toHaveLength(1);
    expect(marks[0].theme).toBe('Kmity');
  });

  it('includes subject_id in the service call when provided', async () => {
    const callService = vi.fn().mockResolvedValue({ marks: [] });
    const hass = buildHass(callService);

    await fetchMarks(hass, 'sensor.child_marks', 'D3006424', 'D118763');

    expect(callService).toHaveBeenCalledWith('skolaonline_znamky', 'get_marks', { config_entry_id: 'entry123', student_id: 'D3006424', subject_id: 'D118763' }, undefined, undefined, true);
  });

  it('rejects when the entity has no config_entry_id', async () => {
    const hass = buildHass(vi.fn());
    await expect(fetchMarks(hass, 'sensor.no_entry_marks', 'D3006424')).rejects.toThrow();
  });
});
