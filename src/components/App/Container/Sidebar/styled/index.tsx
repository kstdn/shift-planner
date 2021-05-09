import { ChevronDown } from 'react-feather';
import styled from 'styled-components';

export const Sidebar = (() => {
  return styled.nav<{ open: boolean }>`
    height: ${props => (props.open ? '250px' : 'var(--sidebar-closed-height)')};
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
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
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
