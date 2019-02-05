/* eslint-disable import/prefer-default-export */
import universal from 'react-universal-component';
import Loading from './Loading';

const Birttu = universal(import('./Birttu'), { loading: Loading });

export { Birttu as Comments };
