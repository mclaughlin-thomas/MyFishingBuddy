import axios from 'axios';
import React, { useState } from 'react';
import classes from './TaskList.module.scss';

function TaskList() {
    const [TaskList, setTaskList] = useState([]);

    const getTasks= async () =>{
        try{
            const { data } = await axios.get('/api/tasks/mytasks');
            setTaskList(
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
            )
        }catch(err){
            console.log(err);
        }
    }

    return (
    <div>TaskList</div>
    );
}

export default TaskList