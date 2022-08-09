import * as React from 'react';
import SideMenu from "../../components/SideMenu";
import styles from "./styles.module.scss";

const Profile = () => {
  return (
    <div className={styles.container}>
      <SideMenu profile/>
      <div className={styles.content}>

      </div>
    </div>
  );
};

export default Profile;