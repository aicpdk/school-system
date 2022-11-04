import { FunctionComponent } from 'react';
import { ISidebarProps } from './Sidebar.types';
import { Text } from '../../atoms/text';
import * as Styled from './Sidebar.styled';
import { IoCloseOutline } from 'react-icons/io5';

export const Sidebar: FunctionComponent<ISidebarProps> = ({ isOpen, onClose, title, children, width = '600px' }) => {
  return (
    <>
      {isOpen && <Styled.SidebarBackground onClick={onClose} />}
      <Styled.Container isOpen={isOpen} width={width}>
        <Styled.SidebarHeader>
          <Text size="xLarge" weight="bold">
            {title}
          </Text>
          <Styled.SidebarHeaderCloseButton onClick={onClose}>
            <IoCloseOutline />
          </Styled.SidebarHeaderCloseButton>
        </Styled.SidebarHeader>
        {children}
      </Styled.Container>
    </>
  );
};

export const SidebarContent = Styled.SidebarContent;
