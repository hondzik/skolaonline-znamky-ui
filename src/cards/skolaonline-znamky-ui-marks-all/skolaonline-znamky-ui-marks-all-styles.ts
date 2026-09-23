import { css } from 'lit';

export const SkolaOnlineMarksAllCardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    padding: 16px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }

  .student-name {
    font-size: var(--soz-title-font-size, 1.2em);
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .context {
    font-size: 0.85em;
    color: var(--secondary-text-color);
  }

  .average {
    flex-shrink: 0;
    font-size: 1.6em;
    font-weight: 700;
    color: #fff;
    border-radius: 8px;
    padding: 4px 14px;
    min-width: 1.6em;
    text-align: center;
  }

  .subjects {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .subject-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 8px 10px;
    border-radius: 10px;
    border: 2px solid var(--subject-color, var(--primary-color));
    cursor: pointer;
  }

  .subject-row:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }

  .subject-row-top {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .subject-name {
    flex: 1;
    color: var(--primary-text-color);
    font-size: 0.95em;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .subject-average {
    font-weight: 600;
    min-width: 2.4em;
    text-align: right;
    flex-shrink: 0;
  }

  .marks {
    display: flex;
    gap: 4px;
    align-items: center;
    flex-wrap: wrap;
  }

  .mark-chip {
    width: 1.8em;
    height: 1.8em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: #fff;
    font-size: var(--soz-marks-font-size, 0.8em);
    font-weight: 600;
    position: relative;
  }

  .mark-chip.heavy {
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.35);
  }

  .mark-chip.new::after {
    content: '';
    position: absolute;
    top: -3px;
    right: -3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--error-color, #f44336);
    box-shadow: 0 0 0 2px var(--card-background-color, #fff);
  }

  .more-marks {
    color: var(--secondary-text-color);
    font-size: var(--soz-marks-font-size, 0.8em);
    padding-left: 2px;
    flex-shrink: 0;
  }

  .footer {
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
  }

  .history {
    margin-top: 12px;
    border-top: 1px solid var(--divider-color, #e0e0e0);
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .history-row {
    display: flex;
    gap: 8px;
    align-items: baseline;
    padding: 4px 0;
    font-size: 0.85em;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
  }

  .history-row:last-child {
    border-bottom: none;
  }

  .history-date {
    color: var(--secondary-text-color);
    flex-shrink: 0;
    width: 5.5em;
  }

  .history-value {
    font-weight: 600;
    flex-shrink: 0;
  }

  .history-theme {
    flex: 1;
    color: var(--primary-text-color);
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .history-loading {
    display: flex;
    justify-content: center;
    padding: 12px;
  }

  .history-error {
    color: var(--error-color);
  }

  .empty {
    color: var(--secondary-text-color);
    text-align: center;
    padding: 16px;
  }
`;
