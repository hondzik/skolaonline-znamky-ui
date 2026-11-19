import type { DeviceRegistryEntry, HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';

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
    getEntitySuggestion?: (hass: HomeAssistant, entityId: string) => { label?: string; config: LovelaceCardConfig } | null;
  }

  // hass.entities (with platform and device_id) comes typed from custom-card-helpers; its device registry entry lacks `config_entries`,
  // which the lightweight device registry display data does carry and which is how the config_entry_id of the account is found
  // (the entity registry display data has no config_entry_id).
  type HassWithDeviceConfigEntries = HomeAssistant & {
    devices?: Record<string, DeviceRegistryEntry & { config_entries?: string[] }>;
  };

  // -- domain-specific types for sensor.<student>_marks --------------------

  interface SkolaOnlineMark {
    id: string;
    value: string;
    weight: number;
    date: string;
  }

  interface SkolaOnlineSubject {
    subject_id: string;
    // null for a subject the backend knows about (e.g. from the timetable)
    // but that has no marks yet this semester.
    average: number | null;
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

  // Shape of what a call_service websocket message with return_response=true
  // resolves to: the actual service response is nested under `response`
  // (the top-level object also carries `context`, which the card has no use for).
  interface HomeAssistantServiceCallResponseEnvelope<T> {
    response: T;
  }

  // -- card config -----------------------------------------------------------

  type SkolaOnlineMarksCardConfig = LovelaceCardConfig & {
    entity: string;
    title?: string;
    subject_order?: string[];
    subject_colors?: Record<string, string>;
    subject_hidden?: string[];
    title_font_size?: number;
    subject_font_size?: number;
    marks_font_size?: number;
    border_width?: number;
    size_by_weight?: boolean;
    show_empty_subjects?: boolean;
    new_mark_days?: number;
  };
}
