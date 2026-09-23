import type { HomeAssistant } from 'custom-card-helpers';

/**
 * The `config_entry_id` the get_marks service needs is not something the
 * card's user configures directly — the config entry is "the account", the
 * entity is "the child" under it. It isn't on the lightweight entity
 * registry display data the frontend gives cards (hass.entities) though —
 * only the full entity_registry record has it. It's resolved via the
 * entity's device instead: hass.entities[entityId].device_id →
 * hass.devices[deviceId].config_entries[0], which the lightweight device
 * registry display data does carry.
 */
export function resolveConfigEntryId(hass: HassWithRegistry, entityId: string): string {
  const deviceId = hass.entities?.[entityId]?.device_id;
  const configEntryId = deviceId ? hass.devices?.[deviceId]?.config_entries?.[0] : undefined;
  if (!configEntryId) {
    throw new Error(`Could not resolve config_entry_id for ${entityId} via the device registry`);
  }
  return configEntryId;
}

/**
 * Calls the response-only skolaonline_znamky.get_marks service for the full,
 * unabridged mark list (including `theme`/`verbal_evaluation`, which the
 * entity attributes intentionally omit due to the recorder's attribute byte
 * limit). Must be called with returnResponse=true or HA rejects the call.
 */
export async function fetchMarks(hass: HomeAssistant, entityId: string, studentId: string, subjectId?: string): Promise<SkolaOnlineFullMark[]> {
  const configEntryId = resolveConfigEntryId(hass as unknown as HassWithRegistry, entityId);

  const serviceData: Record<string, string> = {
    config_entry_id: configEntryId,
    student_id: studentId,
  };
  if (subjectId) {
    serviceData.subject_id = subjectId;
  }

  const response = await (hass as unknown as HomeAssistantServiceCallWithResponse).callService('skolaonline_znamky', 'get_marks', serviceData, undefined, undefined, true);
  return (response as SkolaOnlineGetMarksResponse).marks;
}
