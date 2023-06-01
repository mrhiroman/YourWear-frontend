import React from 'react';

import styles from './Popup.module.sass'

export interface Props {
    value: ValueProp,
    onClickSort: (i: ValueProp) => void
}

export type ValueProp = {
    name: string, 
    sortProperty: string,
}

export type SortProps = {
    name: string;
    sortProperty: string
}

export const Sort = ({ value, onClickSort }: Props) => {
  const list: Array<SortProps> = [
    { name: 'test', sortProperty: 'test' },
    { name: 'test1', sortProperty: 'test1' },
    { name: 'test2', sortProperty: 'test2' },
  ];
  const [isVisible, setIsVisible] = React.useState(false);

  const onClickSelected = (i: ValueProp) => {
    setIsVisible(false);
    onClickSort(i);
  };

  return (
    <div className={styles.sort}>
      <div className={styles.sortLabel}>
        <b>Filter by:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{value.name}</span>
      </div>
      {isVisible && (
        <div className={styles.sortPopup}>
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickSelected(obj)}
                className={value.sortProperty === obj.sortProperty ? styles.active : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}