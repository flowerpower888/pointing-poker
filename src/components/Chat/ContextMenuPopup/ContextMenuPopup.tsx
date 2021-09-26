import React, { FC } from 'react';
import styles from './contextMenuPopup.module.scss';

type ContextMenuPopupType = {
  copyText: string;
};
const ContextMenuPopup: FC<ContextMenuPopupType> = ({ copyText }) => (
  <div>
    <div
      className={styles.stroke}
      onClick={() => navigator.clipboard.writeText(copyText)}
      role="presentation"
    >
      Copy Text
    </div>
  </div>
);

export default ContextMenuPopup;
