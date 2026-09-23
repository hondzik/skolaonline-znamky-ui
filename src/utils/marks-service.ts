import type { HomeAssistant } from 'custom-card-helpers';

/**
 * The `config_entry_id` the get_marks service needs is not something the
 * card's user configures directly — the config entry is "the account", the
 * entity is "the child" under it, so it's looked up from the entity
 * registry instead (hass.entities[entityId].config_entry_id).
 */
export function resolveConfigEntryId(hass: HassWithRegistry, entityId: string): string {
  const configEntryId = hass.entities?.[entityId]?.config_entry_id;
  if (!configEntryId) {
    throw new Error(`Entity ${entityId} is missing config_entry_id in the entity registry`);
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
