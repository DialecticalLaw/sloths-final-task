import styles from './Profile.module.css';
import { ProfileViewer } from './ProfileViewer/ProfileViewer';
import { useState } from 'react';

export function Profile() {
  const [isEditMode, setEditMode] = useState(false);
  console.log(isEditMode);
  return (
    <div className={styles.profile}>
      <div className={styles.profile_wrapper}>
        <ProfileViewer setEditMode={setEditMode} />
      </div>
    </div>
  );
}
