import React from 'react';
import {Link} from 'react-router-dom';
import classes from './EditProfileForm.module.scss';
import {BsArrowLeftShort} from 'react-icons/bs';

function EditProfileForm() {
  return (
    <div>
        <Link to="/" className={classes.backBtn}>
            <BsArrowLeftShort/>
            Home
        </Link>
    </div>
  );
}

export default EditProfileForm