import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import toast from 'react-hot-toast';
import classes from './FishItem.module.scss';

function FishItem({ task, deleteTask }) {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(`/api/fishes/${task._id}`, {
        completed: !isCompleted,
      });
      setIsCompleted(!isCompleted);
      toast.success('Catch stats updated successfully');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <tr className={classes.task_item}>
      <td className={classes.task_name}>
        <div className={classes.checkbox} onChange={handleCheckboxClick} role="checkbox" aria-checked>
          <input type="checkbox" checked={isCompleted} disabled={isLoading} readOnly tabIndex={-1} />
        </div>
        <p>{task.title}</p>
      </td>
      <td>{isCompleted ? 'Complete' : 'Incomplete'}</td>
      <td>{moment(task.createdAt).format('MMM Do YY')}</td>
      <td>
        <button
          type="button"
          className={classes.deleteBtn}
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default FishItem;