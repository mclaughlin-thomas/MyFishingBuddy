import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import FishItem from './FishItem';
import classes from './FishList.module.scss';

function FishList() {
  const [fishList, setFishList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCatch, setNewFish] = useState({
    title: '',
    stats: '',
  });

  const getCatches = async () => {
    try {
      const { data } = await axios.get('/api/fishes/myFish');
      setFishList(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCatches();
  }, []);

  const addNewButtonClick = () => {
    setIsAddingNew(!isAddingNew);
  };

  const addNewCatch = async (e) => {
    e.preventDefault();
    if (!newCatch.title.trim() || !newCatch.stats.trim()) {
      toast.error('Fish data is empty, fill in all fields!');
      return;
    }
    try {
      const { data } = await axios.post('/api/fishes/', {
        title: newCatch.title,
        stats: newCatch.stats,
      });
      toast.success('New Fish added');
      setIsAddingNew(false);
      setNewFish({ title: '', stats: '' }); // Clear the newCatch state
      setFishList([data, ...fishList]); // Update fishList with the new catch data
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFish = async (id) => {
    try {
      await axios.delete(`/api/fishes/${id}`);
      toast.success('Catch deleted');
      setFishList(fishList.filter((fishes) => fishes._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className={classes.topBar}>
        <button
          type="button"
          className={classes.addNew}
          onClick={addNewButtonClick}
        >
          Add New
        </button>
      </div>
      {isAddingNew && (
        <form className={classes.addNewForm} onSubmit={addNewCatch}>
          <input
            type="text"
            value={newCatch.title}
            onChange={(e) => setNewFish({ ...newCatch, title: e.target.value })}
            placeholder="Catch name"
          />
          <input
            type="text"
            value={newCatch.stats}
            onChange={(e) => setNewFish({ ...newCatch, stats: e.target.value })}
            placeholder="Catch weight/length"
          />
          <button type="submit">Upload</button>
        </form>
      )}
      {fishList.length > 0 ? (
        <table className={classes.fishList_table}>
          <tbody>
            {fishList.map((fishes) => (
              <FishItem key={fishes._id} fish={fishes} deleteFish={deleteFish} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className={classes.noCatches}>No Catches Found. Go catch a fish!</div>
      )}
    </div>
  );
}

export default FishList;