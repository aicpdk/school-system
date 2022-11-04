import * as Styled from './Loader.styled';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const Loader = ({ color = 'white' }) => {
  return (
    <Styled.Container>
      <AiOutlineLoading3Quarters strokeWidth={10} fontSize={'1rem'} />
    </Styled.Container>
  );
};
