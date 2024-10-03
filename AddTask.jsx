import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddTask() {
    const [taskname, setTaskname] = useState("");
    const [resultArray, setResultArray] = useState([]);
    const [doneArray, setDoneArray] = useState([]);
    const [showlist, setShowlist] = useState(false);
    const [showDone, setShowDone] = useState(false);

    const handleAddtask = (e) => {
        e.preventDefault();
        if (taskname.trim() !== "") {
            setResultArray([...resultArray, taskname]);
            setTaskname("");
        }
    };

    const handleDelete = (index) => {
        setResultArray(resultArray.filter((_, id) => id !== index));
    };

    const handleDone = (index) => {
        // Move the task to the done list and remove it from the pending list
        const doneTask = resultArray[index];
        setDoneArray([...doneArray, doneTask]);
        handleDelete(index);
    };

    const handleShowlist = () => {
        setShowlist((prev) => !prev);
        setShowDone(false);
    };

    const handleShowDone = () => {
        setShowDone((prev) => !prev);
        setShowlist(false);
    };

    return (
        <div>
            <h1 className='display-3 bg-dark text-light p-2 ps-3'>To-Do App</h1>
            <fieldset className="border border-dark rounded p-3 m-3">
                <legend className="fw-bold text-primary display-7">Enter Task Details</legend>
                <form onSubmit={handleAddtask}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="taskname"
                            className="form-control"
                            placeholder="Enter task name"
                            value={taskname}
                            onChange={(e) => setTaskname(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary me-2">Add Task</button>
                    <button type="button" className="btn btn-success me-2" onClick={handleShowDone}>
                        {showDone ? "Hide Completed" : "Show Completed"}
                    </button>
                    <button type="button" className="btn btn-warning" onClick={handleShowlist}>
                        {showlist ? "Hide Tasks" : "Show All Tasks"}
                    </button>

                    {/* To show all tasks */}
                    {showlist && (
                        resultArray.length > 0 ? (
                            <table className="table table-bordered table-hover mt-3">
                                <thead className="table-dark">
                                    <tr>
                                        <th className='ps-4'>No.</th>
                                        <th className='ps-4'>Task Name</th>
                                        <th className='ps-4'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultArray.map((task, id) => (
                                        <tr key={id}>
                                            <td className='ps-4'>{id + 1}</td>
                                            <td className='ps-4'>{task}</td>
                                            <td className='ps-4'>
                                                <button className="btn btn-success btn-sm me-2" onClick={() => handleDone(id)}>Done</button>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <h4 className="mt-3 text-danger">No tasks available.</h4>
                        )
                    )}

                    {/* To show completed tasks */}
                    {showDone && (
                        doneArray.length > 0 ? (
                            <div className="mt-3">
                                <h3 className="text-success">Completed Tasks:</h3>
                                <ol>
                                    {doneArray.map((element, id) => (
                                        <li key={id} className="text-success">
                                            {element}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        ) : (
                            <h4 className="mt-3 text-danger">No completed tasks...</h4>
                        )
                    )}
                </form>
            </fieldset>
        </div>
    );
}

export default AddTask;
