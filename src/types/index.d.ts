import type { HomeAssistant } from 'custom-card-helpers';

export {};

declare global {
  interface Window {
    customCards: CustomCard[];
  }

  interface CustomCard {
    type: string;
    name: string;
    description: string;
    preview?: boolean;
    documentationURL?: string;
  }

  // Minimal shape of the entity/device registry display data the frontend
  // attaches to hass (missing from custom-card-helpers' types). This is the
  // lightweight display registry, not the full entity_registry/device_registry
  // records — it does NOT carry config_entry_id on the entity itself, only
  // device_id; config_entry_id has to be resolved via the device instead.
  interface EntityRegistryDisplayEntry {
    entity_id: string;
    platform?: string;
    device_id?: string;
    name?: string;
  }

  interface DeviceRegistryDisplayEntry {
    id: string;
    name?: string;
    name_by_user?: string;
    config_entries?: string[];
  }

  type HassWithRegistry = HomeAssistant & {
    entities?: Record<string, EntityRegistryDisplayEntry>;
    devices?: Record<string, DeviceRegistryDisplayEntry>;
  };

  // custom-card-helpers' HomeAssistant.callService only models the 4-arg,
  // fire-and-forget shape. get_marks is SupportsResponse.ONLY, so it must be
  // called with returnResponse=true — widen the signature for that one call site.
  interface HomeAssistantServiceCallWithResponse {
    callService: (domain: string, service: string, serviceData?: Record<string, unknown>, target?: undefined, notifyOnError?: boolean, returnResponse?: boolean) => Promise<unknown>;
  }

  interface LovelaceCardConfig {
    type: string;
    [key: string]: unknown;
  }

  interface LovelaceCard extends HTMLElement {
    hass?: HomeAssistant;
    setConfig(config: LovelaceCardConfig): void;
    getCardSize?(): number | Promise<number>;
  }

  // -- domain-specific types for sensor.<student>_marks --------------------

  interface SkolaOnlineMark {
    id: string;
    value: string;
    weight: number;
    date: string;
  }

  interface SkolaOnlineSubject {
    subject_id: string;
    average: number;
    count: number;
    marks: SkolaOnlineMark[];
  }

  interface SkolaOnlineMarksAttributes {
    student_id: string;
    student_name: string;
    semester_id: string;
    semester_name: string;
    semester_from: string;
    semester_to: string;
    school_year: string;
    previous_semester_id: string | null;
    marks_count: number;
    subject_names: Record<string, string>;
    subjects: SkolaOnlineSubject[];
    friendly_name?: string;
  }

  // -- event skolaonline_znamky_new_mark ------------------------------------

  interface SkolaOnlineNewMarkEvent {
    student_id: string;
    student_name: string;
    semester_id: string;
    subject_id: string;
    subject_name: string;
    mark_id: string;
    value: string;
    weight: number;
    date: string;
    theme: string;
  }

  // -- service skolaonline_znamky.get_marks ---------------------------------

  interface SkolaOnlineFullMark {
    id: string;
    subject_id: string;
    subject_name: string;
    value: string;
    weight: number;
    date: string;
    theme: string;
    verbal_evaluation: string;
    is_points: boolean;
  }

  interface SkolaOnlineGetMarksResponse {
    marks: SkolaOnlineFullMark[];
  }

  // -- card config -----------------------------------------------------------

  type SkolaOnlineMarksCardConfig = LovelaceCardConfig & {
    entity: string;
    title?: string;
    subject_order?: string[];
    subject_colors?: Record<string, string>;
    title_font_size?: number;
    marks_font_size?: number;
    size_by_weight?: boolean;
  };
}
