import React from 'react';

import styles from './FilterButton.module.sass'

export interface Props {
  categories: string[]
  selectedValue: string
  onChangeFilter: (i: string) => void
}



export const FilterButton = ({ categories, selectedValue, onChangeFilter}: Props) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const onClickSelected = (i: string) => {
    setIsVisible(false);
    onChangeFilter(i);
  };

  return (
    <div className={styles.sort}>
      <div className={styles.sortLabel}>
        <b>Show:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{selectedValue}</span>
      </div>
      {isVisible && (
        <div className={styles.sortPopup}>
            {categories && categories.map((obj, i) => (
              <div
                key={i}
                onClick={() => onClickSelected(obj)}
                className={selectedValue === obj ? styles.active : ''}>
                {obj}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}