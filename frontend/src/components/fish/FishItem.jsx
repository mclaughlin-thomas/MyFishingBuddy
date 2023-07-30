import React from 'react';
import moment from 'moment';
import axios from 'axios';
import toast from 'react-hot-toast';
import classes from './FishItem.module.scss';

function FishItem({ fish, deleteFish }) {
  const handleMarkAsComplete = async () => {
    try {
      await axios.put(`/api/fishes/${fish._id}`, {
        completed: true, // Always mark as complete since the checkbox is removed
      });
      toast.success('Catch marked as complete successfully');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr className={classes.fish_item}>
      <td className={classes.fish_name}>
        
        <p>{fish.title}</p>
      </td>
      {/* <td>{fish.completed ? 'Complete' : 'Incomplete'}</td> */}
      <td>{moment(fish.createdAt).format('HH:mm MMM Do YYYY')}</td>
      <td>
        <button
          type="button"
          className={classes.deleteBtn}
          onClick={() => deleteFish(fish._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default FishItem;
