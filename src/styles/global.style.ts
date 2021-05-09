import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';
import { lightThemeVars } from './light.theme';
import { darkThemeVars } from './dark.theme';

export const GlobalStyle = createGlobalStyle`
  ${normalize()}

  :root {
    --base-font-size: 16px;

    --base-padding: 8px;
    --base-padding-big: 16px;
    --base-border-radius: 4px;

    --base-animation-duration: 0.3s;
    --base-animation-timing: ease-out;

    --base-icon-width: 24px;

    --max-main-width: 640px;
    --sidebar-closed-height: calc(var(--base-icon-width) + (2 * var(--base-padding)));

    ${props => (props.theme === 'light' ? lightThemeVars : darkThemeVars)};
  }

  html, body {
    font-size: var(--base-font-size);
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  body {
    background-color: var(--bg-body);
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a, a::before, a::after {
    text-decoration: none;
    color: inherit;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .ant-picker-calendar {
    background: var(--bg-body);
    color: var(--text-color);
  }

  .ant-picker-calendar-full .ant-picker-panel {
    background: transparent;
  }

  .ant-picker-content th,
  .ant-picker-content td {
    color: var(--text-color);
    -webkit-text-stroke: 0.5px var(--bg-body);
  }

  .ant-picker-calendar-full, 
  .ant-picker-calendar-full .ant-picker-panel, 
  .ant-picker-calendar-full .ant-picker-date-panel, 
  .ant-picker-calendar-full .ant-picker-body,
  .ant-picker-calendar-full .ant-picker-content,
  .ant-picker-calendar-full .ant-picker-cell,
  .ant-picker-calendar-full .ant-picker-calendar-date,
  .ant-picker-calendar-full .ant-picker-calendar-date-content {
    height: 100%;
  }

  .ant-picker-calendar-full {
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--bg-secondary);
    border-right: 1px solid var(--bg-secondary);
  }

  table.ant-picker-content {
    display: flex;
    flex-direction: column;
  }

  .ant-picker-calendar tbody,
  .ant-picker-calendar thead {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
  }

  .ant-picker-calendar tbody {
    flex-grow: 1;
    height: 1px;
  }

  .ant-picker-calendar tbody tr, 
  .ant-picker-calendar thead tr {
    display: flex;
    overflow: hidden;
  }

  .ant-picker-date-panel .ant-picker-content th, 
  .ant-picker-date-panel .ant-picker-content td.ant-picker-cell {
    --size: calc(min(100vw, var(--max-main-width))/7);
    width: var(--size);
    height: var(--size);
  }

  .ant-picker-calendar thead tr th {
    padding: 6px;
    font-weight: bold;
  }

  .ant-picker-calendar thead tr th:first-of-type {
  }

  .ant-picker-calendar .ant-picker-panel .ant-picker-body {
    padding: 0;
  }

  .ant-picker-calendar-full .ant-picker-panel .ant-picker-body th {
    padding: 2px;
  }

  .ant-picker-cell.ant-picker-cell-in-view {
    font-weight: 800;
  }

  .ant-picker-cell.ant-picker-cell-today {
    border: 1px solid;
  }

  .ant-picker-cell:not(.ant-picker-cell-in-view) {
    background-color: var(--bg-secondary-faded);
  }

  .ant-list-item-meta-title > a {
    color: var(--text-color);
  }

  .ant-result-title {
    color: var(--text-color);
  }

  .ant-result-info .ant-result-icon > .anticon {
    color: var(--primary);
  }

  table {
    border-bottom-color: var(--bg-secondary);
  }

  .ant-table {
    color: var(--text-color);
    background-color: var(--bg-secondary-faded);
  }

  .ant-table-thead > tr > th {
    color: var(--text-color);
    background-color: var(--bg-secondary-faded);
    border-bottom-color: var(--bg-secondary);
  }

  .ant-table-tbody > tr > td {
    border-bottom-color: var(--bg-secondary);
  }

  .ant-table-tbody > tr.ant-table-row:hover > td {
    background-color: var(--bg-secondary-faded);
  }

  .editable-cell {
    position: relative;
  }

  .editable-cell-value-wrap {
    padding: 5px 12px;
    cursor: pointer;
  }

  .editable-row:hover .editable-cell-value-wrap {
    border: 1px solid var(--bg-secondary);
    border-radius: 4px;
    padding: 4px 11px;
  }

`;
