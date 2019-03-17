import React from 'react';
import Topbar from '../../components/topbar';
import Tab from './tab';

interface Props {
  name: string;
  history: any;
}

const Serp = ({ history }: Props) => (
  <div>
    <Topbar back history={history} tab={<Tab />} />
  </div>
);

export default Serp;
