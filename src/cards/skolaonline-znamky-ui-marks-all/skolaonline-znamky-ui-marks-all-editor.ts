import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../../components/so-sortable-list/so-sortable-list';
import setupCustomlocalize from '../../localize';
import { orderSubjects } from '../../utils/subjects';
import type { SoSortableListItem } from '../../components/so-sortable-list/so-sortable-list';
import type { OrderedSubject } from '../../utils/subjects';
import type { HomeAssistant } from 'custom-card-helpers';
import type { CSSResultGroup, TemplateResult } from 'lit';

const DEFAULT_SUBJECT_COLOR = '#3f51b5';

@customElement('skolaonline-znamky-ui-marks-all-editor')
export class SkolaOnlineMarksAllEditor extends LitElement {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config: SkolaOnlineMarksCardConfig = { type: 'custom:skolaonline-znamky-ui-marks-all-card', entity: '' };

  public setConfig(config: SkolaOnlineMarksCardConfig): void {
    this._config = { ...config };
  }

  private get _attrs(): SkolaOnlineMarksAttributes | undefined {
    if (!this.hass || !this._config.entity) {
      return undefined;
    }
    return this.hass.states[this._config.entity]?.attributes as SkolaOnlineMarksAttributes | undefined;
  }

  protected render(): TemplateResult {
    if (!this.hass) {
      return html``;
    }
    const localize = setupCustomlocalize(this.hass);

    return html`
      <div class="card-config">
        <ha-selector
          .hass=${this.hass}
          .selector=${{ entity: { filter: { integration: 'skolaonline_znamky', domain: 'sensor' } } }}
          .value=${this._config.entity}
          .label=${localize('editor.entity')}
          @value-changed=${this._entityChanged}
        ></ha-selector>

        <ha-textfield .label=${localize('editor.title')} .value=${this._config.title ?? ''} @input=${this._titleChanged}></ha-textfield>

        ${this._renderSubjects(localize)}
      </div>
    `;
  }

  private _renderSubjects(localize: (key: string) => string): TemplateResult {
    const attrs = this._attrs;
    if (!attrs) {
      return html`<div class="section-note">${localize('editor.no_entity')}</div>`;
    }

    const subjects: OrderedSubject[] = orderSubjects(attrs, this._config);
    const items: SoSortableListItem[] = subjects.map((subject) => ({ id: subject.subject_id, label: subject.name }));

    return html`
      <div class="section-heading">${localize('editor.subjects_heading')}</div>
      <div class="section-description">${localize('editor.subjects_description')}</div>
      <so-sortable-list
        .items=${items}
        .renderLeading=${(item: SoSortableListItem) => this._renderColorSwatch(item, subjects)}
        .renderTrailing=${(item: SoSortableListItem) => this._renderResetButton(item, localize)}
        @reorder=${this._onReorder}
      ></so-sortable-list>
    `;
  }

  private _renderColorSwatch(item: SoSortableListItem, subjects: OrderedSubject[]): TemplateResult {
    const color = subjects.find((subject) => subject.subject_id === item.id)?.color ?? DEFAULT_SUBJECT_COLOR;
    return html`<input type="color" class="color-swatch" .value=${color} @click=${(e: Event) => e.stopPropagation()} @input=${(e: Event) => this._colorChanged(item.id, e)} />`;
  }

  private _renderResetButton(item: SoSortableListItem, localize: (key: string) => string): TemplateResult {
    return html`
      <ha-icon-button .label=${localize('editor.reset_color')} @click=${(e: Event) => this._resetColor(item.id, e)}>
        <ha-icon icon="mdi:format-color-reset"></ha-icon>
      </ha-icon-button>
    `;
  }

  private _entityChanged(e: CustomEvent<{ value: string }>): void {
    this._updateConfig({ ...this._config, entity: e.detail.value });
  }

  private _titleChanged(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this._updateConfig({ ...this._config, title: value || undefined });
  }

  private _colorChanged(subjectId: string, e: Event): void {
    e.stopPropagation();
    const value = (e.target as HTMLInputElement).value;
    this._updateConfig({ ...this._config, subject_colors: { ...this._config.subject_colors, [subjectId]: value } });
  }

  private _resetColor(subjectId: string, e: Event): void {
    e.stopPropagation();
    const colors = { ...this._config.subject_colors };
    delete colors[subjectId];
    this._updateConfig({ ...this._config, subject_colors: colors });
  }

  private _onReorder(e: CustomEvent<{ items: SoSortableListItem[] }>): void {
    this._updateConfig({ ...this._config, subject_order: e.detail.items.map((item) => item.id) });
  }

  private _updateConfig(config: SkolaOnlineMarksCardConfig): void {
    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
  }

  public static get styles(): CSSResultGroup {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .section-heading {
        font-weight: 500;
        color: var(--primary-text-color);
        margin-top: 4px;
      }

      .section-description {
        font-size: 0.85em;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
      }

      .section-note {
        color: var(--secondary-text-color);
        font-size: 0.9em;
      }

      .color-swatch {
        width: 24px;
        height: 24px;
        padding: 0;
        border: none;
        border-radius: 50%;
        cursor: pointer;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skolaonline-znamky-ui-marks-all-editor': SkolaOnlineMarksAllEditor;
  }
}
