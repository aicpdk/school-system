import { useRouter } from 'next/router';
import { theme } from '../../../config/theme';
import { Icon } from '../../atoms/icon';
import { Link } from '../../atoms/link';
import { Text } from '../../atoms/text';
import * as Styled from './Menubar.styled';
import { IMenubarProps } from './Menubar.types';

export const Menubar = ({ items }: IMenubarProps) => {
  const router = useRouter();

  return (
    <Styled.Container open={true}>
      <Styled.Navigation>
        {items?.map(({ link, text, icon }, index) => (
          <Link link={link} key={`menu-item-${index}`}>
            <Styled.Item isActive={router.asPath === link}>
              <Icon name={icon} size={16} color={router.asPath === link ? theme.colors.primary500 : theme.colors.gray500} />
              <Text color={'gray900'}>{text}</Text>
            </Styled.Item>
          </Link>
        ))}
      </Styled.Navigation>
    </Styled.Container>
  );
};
