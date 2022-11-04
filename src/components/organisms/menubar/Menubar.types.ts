import { IconEnum } from '../../atoms/icon/icon.types';

export interface IMenubarItem {
  link: string;
  text: string;
  icon: IconEnum;
}

export interface IMenubarProps {
  items: IMenubarItem[];
}
