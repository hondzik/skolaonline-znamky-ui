import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import setupCustomlocalize from '../../localize';
import { gradeColor, parseGrade } from '../../utils/grades';
import { averageWeight, markChipSizeEm } from '../../utils/mark-size';
import { fetchMarks } from '../../utils/marks-service';
import { shouldHighlightMark } from '../../utils/new-marks';
import { orderSubjects } from '../../utils/subjects';
import { SkolaOnlineMarksAllCardStyles } from './skolaonline-znamky-ui-marks-all-styles';
import type { OrderedSubject } from '../../utils/subjects';
import type { HomeAssistant } from 'custom-card-helpers';
import type { HassEventBase } from 'home-assistant-js-websocket';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import './skolaonline-znamky-ui-marks-all-editor';

const CARD_TAG = 'skolaonline-znamky-ui-marks-all-card';

@customElement(CARD_TAG)
export class SkolaOnlineMarksAllCard extends LitElement implements LovelaceCard {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: SkolaOnlineMarksCardConfig;

  // undefined = history panel closed, null = whole-student history, otherwise a subject_id
  @state()
  private _historyTarget?: string | null;

  @state()
  private _historyMarks?: SkolaOnlineFullMark[];

  @state()
  private _historyLoading = false;

  @state()
  private _historyError?: string;

  @state()
  private _newMarkIds: Set<string> = new Set();

  private _unsubscribeEvents?: () => Promise<void>;

  public setConfig(config: SkolaOnlineMarksCardConfig): void {
    if (!config?.entity) {
      throw new Error('skolaonline-znamky-ui-marks-all-card: "entity" is required');
    }
    this._config = config;
  }

  public getCardSize(): number {
    return 2 + Math.max(1, this._subjects.length);
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
    const cardStyle = `--soz-title-font-size:${this._config.title_font_size ?? 20}px;--soz-marks-font-size:${this._config.marks_font_size ?? 14}px;`;

    return html`
      <ha-card style=${cardStyle}>
        <div class="header">
          <div>
            <div class="student-name">${this._config.title || attrs.student_name}</div>
            <div class="context">${attrs.school_year} · ${attrs.semester_name}</div>
          </div>
          <div class="average" style="background:${gradeColor(average)}">${Number.isFinite(average) ? average.toFixed(2) : '–'}</div>
        </div>
        <div class="subjects">${this._subjects.map((subject) => this._renderSubjectRow(subject))}</div>
        <div class="footer">
          <button class="history-toggle" @click=${() => this._toggleHistory(null)}>${localize('card.history_button')}</button>
        </div>
        ${this._historyTarget !== undefined ? this._renderHistory(localize) : nothing}
      </ha-card>
    `;
  }

  private _renderSubjectRow(subject: OrderedSubject): TemplateResult {
    const shown = [...subject.marks].sort((a, b) => (a.date < b.date ? 1 : -1));
    const extra = subject.count - shown.length;
    const referenceWeight = this._referenceWeight;

    return html`
      <div class="subject-row" style="--subject-color:${subject.color ?? 'var(--primary-color)'}" @click=${() => this._toggleHistory(subject.subject_id)}>
        <div class="subject-row-top">
          <div class="subject-name">${subject.name}</div>
          <div class="subject-average" style="color:${gradeColor(subject.average)}">${subject.average.toFixed(2)}</div>
        </div>
        <div class="marks">${shown.map((mark) => this._renderMarkChip(mark, referenceWeight))} ${extra > 0 ? html`<div class="more-marks">+${extra}</div>` : nothing}</div>
      </div>
    `;
  }

  private _renderMarkChip(mark: SkolaOnlineMark, referenceWeight: number): TemplateResult {
    const grade = parseGrade(mark.value);
    const background = grade === null ? 'var(--disabled-text-color, #9e9e9e)' : gradeColor(grade);
    const isNew = shouldHighlightMark(mark.id, mark.date, this._newMarkIds);
    const isHeavy = referenceWeight > 0 && mark.weight > referenceWeight;
    const sizeStyle = this._config?.size_by_weight ? `width:${markChipSizeEm(mark.weight, referenceWeight)}em;height:${markChipSizeEm(mark.weight, referenceWeight)}em;` : '';
    return html`
      <div class="mark-chip ${isHeavy ? 'heavy' : ''} ${isNew ? 'new' : ''}" style="background:${background};${sizeStyle}" title="${mark.date.slice(0, 10)} · ${mark.weight}">
        ${mark.value}
      </div>
    `;
  }

  private async _toggleHistory(target: string | null): Promise<void> {
    if (this._historyTarget === target) {
      this._historyTarget = undefined;
      return;
    }
    this._historyTarget = target;
    this._historyMarks = undefined;
    this._historyError = undefined;

    const attrs = this._attrs;
    if (!this.hass || !this._config || !attrs) {
      return;
    }

    this._historyLoading = true;
    try {
      this._historyMarks = await fetchMarks(this.hass, this._config.entity, attrs.student_id, target ?? undefined);
    } catch (e) {
      this._historyError = e instanceof Error ? e.message : String(e);
    } finally {
      this._historyLoading = false;
    }
  }

  private _renderHistory(localize: (key: string) => string): TemplateResult {
    if (this._historyLoading) {
      return html`<div class="history">
        <div class="history-loading"><ha-spinner size="small"></ha-spinner></div>
      </div>`;
    }
    if (this._historyError) {
      return html`<div class="history"><ha-alert alert-type="error">${this._historyError}</ha-alert></div>`;
    }
    if (!this._historyMarks?.length) {
      return html`<div class="history"><div class="empty">${localize('card.history_empty')}</div></div>`;
    }

    const sorted = [...this._historyMarks].sort((a, b) => (a.date < b.date ? 1 : -1));
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
