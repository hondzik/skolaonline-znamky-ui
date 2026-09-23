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
 *
 * Always fetches the whole semester (no subject_id filter) — the service
 * returns every subject's marks regardless, so the card fetches once and
 * caches the result instead of re-fetching per subject.
 */
export async function fetchMarks(hass: HomeAssistant, entityId: string, studentId: string): Promise<SkolaOnlineFullMark[]> {
  const configEntryId = resolveConfigEntryId(hass as unknown as HassWithRegistry, entityId);

  const serviceData: Record<string, string> = {
    config_entry_id: configEntryId,
    student_id: studentId,
  };

  const result = await (hass as unknown as HomeAssistantServiceCallWithResponse).callService('skolaonline_znamky', 'get_marks', serviceData, undefined, undefined, true);
  // callService with returnResponse=true resolves to { context, response },
  // not the service response itself — the marks are nested under `response`.
  return (result as HomeAssistantServiceCallResponseEnvelope<SkolaOnlineGetMarksResponse>).response.marks;
}

/**
 * skolaonline_znamky doesn't register its own reload/refresh service — the
 * only custom service is get_marks, and it just returns fresh data as a
 * response, without ever writing it to the entity's state or running it
 * through the coordinator's diff (so no skolaonline_znamky_new_mark event).
 *
 * The built-in homeassistant.update_entity service is what actually forces
 * a real refresh here: for a CoordinatorEntity it calls
 * coordinator.async_request_refresh(), running the exact same cycle a
 * scheduled update would (fetch semester + marks, aggregate, diff against
 * the store, fire skolaonline_znamky_new_mark if warranted). A full
 * homeassistant.reload_config_entry would be much heavier (tears down and
 * re-sets-up every child under the same account) for no extra benefit.
 */
export async function refreshMarks(hass: HomeAssistant, entityId: string): Promise<void> {
  await hass.callService('homeassistant', 'update_entity', undefined, { entity_id: entityId });
}
