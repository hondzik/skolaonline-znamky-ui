import { describe, expect, it, vi } from 'vitest';
import { fetchMarks, refreshMarks, resolveConfigEntryId } from '../src/utils/marks-service';
import type { HomeAssistant } from 'custom-card-helpers';

function buildHass(callService: ReturnType<typeof vi.fn>): HomeAssistant {
  return {
    entities: {
      'sensor.child_marks': { entity_id: 'sensor.child_marks', device_id: 'device1' },
      'sensor.no_device_marks': { entity_id: 'sensor.no_device_marks' },
      'sensor.orphan_device_marks': { entity_id: 'sensor.orphan_device_marks', device_id: 'device2' },
      'sensor.no_config_entries_marks': { entity_id: 'sensor.no_config_entries_marks', device_id: 'device3' },
    },
    devices: {
      device1: { id: 'device1', config_entries: ['entry123'] },
      device3: { id: 'device3', config_entries: [] },
    },
    callService,
  } as unknown as HomeAssistant;
}

describe('resolveConfigEntryId', () => {
  it('resolves the config_entry_id via the entity device_id -> device config_entries', () => {
    const hass = buildHass(vi.fn());
    expect(resolveConfigEntryId(hass as unknown as HassWithRegistry, 'sensor.child_marks')).toBe('entry123');
  });

  it('throws when the entity has no device_id', () => {
    const hass = buildHass(vi.fn());
    expect(() => resolveConfigEntryId(hass as unknown as HassWithRegistry, 'sensor.no_device_marks')).toThrow();
  });

  it('throws when the device is not in the device registry', () => {
    const hass = buildHass(vi.fn());
    expect(() => resolveConfigEntryId(hass as unknown as HassWithRegistry, 'sensor.orphan_device_marks')).toThrow();
  });

  it('throws when the device has no config_entries', () => {
    const hass = buildHass(vi.fn());
    expect(() => resolveConfigEntryId(hass as unknown as HassWithRegistry, 'sensor.no_config_entries_marks')).toThrow();
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

  it('rejects when the entity has no resolvable config_entry_id', async () => {
    const hass = buildHass(vi.fn());
    await expect(fetchMarks(hass, 'sensor.no_device_marks', 'D3006424')).rejects.toThrow();
  });
});

describe('refreshMarks', () => {
  it('calls homeassistant.update_entity targeted at the entity, forcing a coordinator refresh', async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const hass = buildHass(callService);

    await refreshMarks(hass, 'sensor.child_marks');

    expect(callService).toHaveBeenCalledWith('homeassistant', 'update_entity', undefined, { entity_id: 'sensor.child_marks' });
  });
});
