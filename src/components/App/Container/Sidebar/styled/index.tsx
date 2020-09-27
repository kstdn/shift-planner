import { ChevronDown } from 'react-feather';
import styled from 'styled-components';

export const Sidebar = (() => {
  const closedWidth =
    'calc(var(--base-icon-width) + (2 * var(--base-padding)))';

  return styled.nav<{ open: boolean }>`
    height: ${props => (props.open ? '250px' : closedWidth)};
    padding: var(--base-padding);
    background-color: var(--primary);
    color: var(--primary-text);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: height var(--base-animation-duration)
      var(--base-animation-timing);
    flex-shrink: 0;
    align-items: flex-end;
  `;
})();

export const MenuIconRow = styled.div`
  padding-bottom: var(--base-padding);
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const MenuIcon = styled(ChevronDown)<{ open: boolean }>`
  transform: ${props => (props.open ? 'rotate(0)' : 'rotate(180deg)')};
  transition: transform var(--base-animation-duration)
    var(--base-animation-timing);
`;

export const SidebarContent = styled.div`
  width: calc(200px - (2 * var(--base-padding)));
  flex: 1;
  display: flex;
  flex-direction: column;
`;
