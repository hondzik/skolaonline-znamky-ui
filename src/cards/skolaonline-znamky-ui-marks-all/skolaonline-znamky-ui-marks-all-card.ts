import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import setupCustomlocalize from '../../localize';
import { gradeColor, parseGrade } from '../../utils/grades';
import { averageWeight, markChipSizeEm } from '../../utils/mark-size';
import { fetchMarks, refreshMarks } from '../../utils/marks-service';
import { shouldHighlightMark } from '../../utils/new-marks';
import { orderSubjects } from '../../utils/subjects';
import { SkolaOnlineMarksAllCardStyles } from './skolaonline-znamky-ui-marks-all-styles';
import type { OrderedSubject } from '../../utils/subjects';
import type { HomeAssistant } from 'custom-card-helpers';
import type { HassEventBase } from 'home-assistant-js-websocket';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import './skolaonline-znamky-ui-marks-all-editor';

const CARD_TAG = 'skolaonline-znamky-ui-marks-all-card';
// get_marks returns the full mark list for the whole semester regardless of
// the subject_id filter, so the card fetches it once and reuses it for every
// subject's expanded row — refetched only once this cache goes stale.
const MARKS_CACHE_TTL_MS = 30 * 60 * 1000;

@customElement(CARD_TAG)
export class SkolaOnlineMarksAllCard extends LitElement implements LovelaceCard {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: SkolaOnlineMarksCardConfig;

  // undefined = nothing expanded, otherwise the expanded subject's subject_id.
  // Only one subject can be expanded at a time — opening one closes any other.
  @state()
  private _expandedSubjectId?: string;

  @state()
  private _historyLoading = false;

  @state()
  private _historyError?: string;

  // All marks for the student's current semester, fetched once via get_marks
  // and reused for every subject's expanded row (see MARKS_CACHE_TTL_MS).
  @state()
  private _marksCache?: { fetchedAt: number; semesterId: string; marks: SkolaOnlineFullMark[] };

  @state()
  private _newMarkIds: Set<string> = new Set();

  @state()
  private _refreshing = false;

  private _unsubscribeEvents?: () => Promise<void>;

  public setConfig(config: SkolaOnlineMarksCardConfig): void {
    if (!config?.entity) {
      throw new Error('skolaonline-znamky-ui-marks-all-card: "entity" is required');
    }
    this._config = config;
  }

  public getCardSize(): number {
    return 2 + Math.max(1, this._visibleSubjects.length);
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('skolaonline-znamky-ui-marks-all-editor');
  }

  public static getStubConfig(hass: HomeAssistant, entities: string[], entitiesFallback: string[]): SkolaOnlineMarksCardConfig {
    const registry = hass as unknown as HassWithRegistry;
    const entityId = [...entities, ...entitiesFallback].find((id) => registry.entities?.[id]?.platform === 'skolaonline_znamky');
    if (!entityId) {
      throw new Error('No skolaonline_znamky entity available');
    }
    return { type: `custom:${CARD_TAG}`, entity: entityId };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    void this._subscribeNewMarks();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    void this._unsubscribeEvents?.();
    this._unsubscribeEvents = undefined;
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('hass') && !this._unsubscribeEvents) {
      void this._subscribeNewMarks();
    }
  }

  private async _subscribeNewMarks(): Promise<void> {
    if (!this.hass || this._unsubscribeEvents) {
      return;
    }
    try {
      this._unsubscribeEvents = await this.hass.connection.subscribeEvents<HassEventBase & { data: SkolaOnlineNewMarkEvent }>(
        (ev) => this._onNewMarkEvent(ev.data),
        'skolaonline_znamky_new_mark',
      );
    } catch (e) {
      console.error(`${CARD_TAG}: failed to subscribe to skolaonline_znamky_new_mark`, e);
    }
  }

  private _onNewMarkEvent(event: SkolaOnlineNewMarkEvent): void {
    if (event.student_id !== this._attrs?.student_id) {
      return;
    }
    this._newMarkIds = new Set(this._newMarkIds).add(event.mark_id);
    this._invalidateMarksCache();
  }

  private get _attrs(): SkolaOnlineMarksAttributes | undefined {
    if (!this.hass || !this._config) {
      return undefined;
    }
    return this.hass.states[this._config.entity]?.attributes as SkolaOnlineMarksAttributes | undefined;
  }

  private get _subjects(): OrderedSubject[] {
    const attrs = this._attrs;
    return attrs ? orderSubjects(attrs, this._config ?? {}) : [];
  }

  // What the card actually renders: manually hidden subjects are always
  // skipped, and — unless show_empty_subjects is explicitly enabled —
  // subjects with no marks yet this semester (e.g. one the backend only
  // knows about from the timetable) are skipped too.
  private get _visibleSubjects(): OrderedSubject[] {
    const showEmptySubjects = this._config?.show_empty_subjects ?? true;
    return this._subjects.filter((subject) => !subject.hidden && (showEmptySubjects || subject.count > 0));
  }

  // Weight is not on a fixed scale across schools (some use 0.1-1, others
  // 1-100), so "heavy" and "size by weight" both compare against this
  // reference (the average weight across the entity's marks) rather than an
  // absolute number.
  private get _referenceWeight(): number {
    const attrs = this._attrs;
    if (!attrs) {
      return 0;
    }
    return averageWeight(attrs.subjects.flatMap((subject) => subject.marks.map((mark) => mark.weight)));
  }

  private get _allMarks(): SkolaOnlineFullMark[] {
    return this._marksCache?.marks ?? [];
  }

  // Drops the get_marks cache — called whenever the underlying marks may
  // have changed (a new_mark event, or a manual refresh). If a subject/
  // history panel is currently expanded, re-fetches right away instead of
  // leaving it showing a stale (or now-empty) list until the user toggles it.
  private _invalidateMarksCache(): void {
    this._marksCache = undefined;
    if (this._expandedSubjectId !== undefined) {
      void this._ensureMarksLoaded();
    }
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html``;
    }
    const localize = setupCustomlocalize(this.hass);
    const attrs = this._attrs;
    if (!attrs || !this.hass) {
      return html`<ha-card><div class="empty">${localize('card.no_entity')}</div></ha-card>`;
    }

    const average = Number(this.hass.states[this._config.entity].state);
    const cardStyle = `--soz-title-font-size:${this._config.title_font_size ?? 20}px;--soz-subject-font-size:${this._config.subject_font_size ?? 15}px;--soz-marks-font-size:${this._config.marks_font_size ?? 14}px;`;

    return html`
      <ha-card style=${cardStyle}>
        <div class="header">
          <div>
            <div class="student-name">${this._config.title || attrs.student_name}</div>
            <div class="context">${attrs.school_year} · ${attrs.semester_name}</div>
          </div>
          <div class="header-right">
            <ha-icon-button class="refresh-button" .label=${localize('card.refresh')} .disabled=${this._refreshing} @click=${() => this._refresh()}>
              ${this._refreshing ? html`<ha-spinner size="small"></ha-spinner>` : html`<ha-icon icon="mdi:reload"></ha-icon>`}
            </ha-icon-button>
            <div class="average" style="background:${gradeColor(average)}">${Number.isFinite(average) ? average.toFixed(2) : '–'}</div>
          </div>
        </div>
        <div class="subjects">${this._visibleSubjects.map((subject) => this._renderSubjectRow(subject, localize))}</div>
      </ha-card>
    `;
  }

  private _renderSubjectRow(subject: OrderedSubject, localize: (key: string) => string): TemplateResult {
    const shown = [...subject.marks].sort((a, b) => (a.date < b.date ? 1 : -1));
    const extra = subject.count - shown.length;
    const referenceWeight = this._referenceWeight;
    const borderWidth = this._config?.border_width ?? 8;
    const toggle = () => this._toggleHistory(subject.subject_id);

    return html`
      <div class="subject-row" style="background:${subject.color ?? 'var(--primary-color)'};padding-left:${borderWidth}px">
        <div class="subject-row-inner">
          <div class="subject-row-top" @click=${toggle}>
            <div class="subject-name">${subject.name}</div>
            <div class="subject-average" style="color:${subject.average === null ? 'var(--secondary-text-color)' : gradeColor(subject.average)}">
              ${subject.average === null ? '–' : subject.average.toFixed(2)}
            </div>
          </div>
          <div class="marks" @click=${toggle}>
            ${
              shown.length
                ? html`${shown.map((mark) => this._renderMarkChip(mark, referenceWeight))} ${extra > 0 ? html`<div class="more-marks">+${extra}</div>` : nothing}`
                : html`<div class="no-marks">${localize('card.no_marks')}</div>`
            }
          </div>
          ${
            this._expandedSubjectId === subject.subject_id
              ? this._renderMarksList(
                  this._allMarks.filter((mark) => mark.subject_id === subject.subject_id),
                  localize,
                )
              : nothing
          }
        </div>
      </div>
    `;
  }

  private _renderMarkChip(mark: SkolaOnlineMark, referenceWeight: number): TemplateResult {
    const grade = parseGrade(mark.value);
    const isVerbal = grade === null;
    const background = isVerbal ? 'var(--disabled-text-color, #9e9e9e)' : gradeColor(grade);
    const isNew = shouldHighlightMark(mark.id, mark.date, this._newMarkIds);
    // A verbal evaluation's own weight isn't meaningful for sizing (it isn't
    // part of the weighted average), so it's sized as if it were exactly at
    // the reference weight instead of using its own weight value.
    const sizeWeight = isVerbal ? referenceWeight : mark.weight;
    const isHeavy = referenceWeight > 0 && sizeWeight > referenceWeight;
    const sizeStyle = this._config?.size_by_weight ? `width:${markChipSizeEm(sizeWeight, referenceWeight)}em;height:${markChipSizeEm(sizeWeight, referenceWeight)}em;` : '';
    return html`
      <div class="mark-chip ${isHeavy ? 'heavy' : ''} ${isNew ? 'new' : ''}" style="background:${background};${sizeStyle}" title="${mark.date.slice(0, 10)} · ${mark.weight}">
        ${mark.value}
      </div>
    `;
  }

  private async _refresh(): Promise<void> {
    if (!this.hass || !this._config || this._refreshing) {
      return;
    }
    this._refreshing = true;
    this._invalidateMarksCache();
    try {
      await refreshMarks(this.hass, this._config.entity);
    } catch (e) {
      console.error(`${CARD_TAG}: failed to refresh marks`, e);
    } finally {
      this._refreshing = false;
    }
  }

  private async _toggleHistory(target: string): Promise<void> {
    if (this._expandedSubjectId === target) {
      this._expandedSubjectId = undefined;
      return;
    }
    this._expandedSubjectId = target;
    await this._ensureMarksLoaded();
  }

  private async _ensureMarksLoaded(): Promise<void> {
    const attrs = this._attrs;
    if (!this.hass || !this._config || !attrs) {
      return;
    }
    const cache = this._marksCache;
    const isFresh = !!cache && cache.semesterId === attrs.semester_id && Date.now() - cache.fetchedAt < MARKS_CACHE_TTL_MS;
    if (isFresh) {
      return;
    }

    this._historyLoading = true;
    this._historyError = undefined;
    try {
      const marks = await fetchMarks(this.hass, this._config.entity, attrs.student_id);
      this._marksCache = { fetchedAt: Date.now(), semesterId: attrs.semester_id, marks };
    } catch (e) {
      this._historyError = e instanceof Error ? e.message : String(e);
    } finally {
      this._historyLoading = false;
    }
  }

  private _renderMarksList(marks: SkolaOnlineFullMark[], localize: (key: string) => string): TemplateResult {
    if (this._historyLoading) {
      return html`<div class="history">
        <div class="history-loading"><ha-spinner size="small"></ha-spinner></div>
      </div>`;
    }
    if (this._historyError) {
      return html`<div class="history"><ha-alert alert-type="error">${this._historyError}</ha-alert></div>`;
    }
    if (!marks.length) {
      return html`<div class="history"><div class="empty">${localize('card.history_empty')}</div></div>`;
    }

    const sorted = [...marks].sort((a, b) => (a.date < b.date ? 1 : -1));
    return html` <div class="history">${sorted.map((mark) => this._renderHistoryRow(mark))}</div> `;
  }

  private _renderHistoryRow(mark: SkolaOnlineFullMark): TemplateResult {
    const grade = parseGrade(mark.value);
    const color = grade === null ? 'inherit' : gradeColor(grade);
    return html`
      <div class="history-row">
        <span class="history-date">${mark.date.slice(0, 10)}</span>
        <span class="history-value" style="color:${color}">${mark.value}</span>
        <span class="history-theme">${mark.theme || mark.verbal_evaluation || ''}</span>
      </div>
    `;
  }

  public static get styles(): CSSResultGroup {
    return SkolaOnlineMarksAllCardStyles;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skolaonline-znamky-ui-marks-all-card': SkolaOnlineMarksAllCard;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TAG,
  name: 'Škola OnLine – Známky',
  description: 'Karta se známkami dítěte ze zálohové integrace skolaonline_znamky.',
  preview: true,
  documentationURL: 'https://github.com/hondzik/skolaonline-znamky-ui',
});
