import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BASE_URL from '../config/api.js';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingTask, setEditingTask] = useState(null);

    const token = localStorage.getItem("auth-token");

    // Fetch all tasks
    const fetchAllTasks = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/task/getAll`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                }
            });
            setTasks(res.data.tasks);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    // Add Task
    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/task/create`, { title, description }, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                }
            });
            setTitle("");
            setDescription("");
            fetchAllTasks();
        } catch (error) {
            console.error("Error Creating tasks", error);
        }
    };

    // Update task
    const handleUpdateTask = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${BASE_URL}/task/update/${editingTask.id}`, { title, description }, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                }
            });
            setTitle("");
            setDescription("");
            setEditingTask(null);
            fetchAllTasks();
        } catch (error) {
            console.error("Error Updating tasks", error);
        }
    };

    // Delete task
    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/task/delete/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                }
            });
            fetchAllTasks();
        } catch (error) {
            console.error("Error deleting tasks", error);
        }
    };

    const startEditing = (task) => {
        setEditingTask(task);
        setTitle(task.title);
        setDescription(task.description);
    };

    return (
        <div className='min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 flex flex-col items-center py-10'>
            <div className='w-full max-w-lg bg-white shadow-2xl rounded-3xl p-6'>
                <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>Task Manager</h1>

                <form
                    onSubmit={editingTask ? handleUpdateTask : handleAddTask}
                    className='space-y-4 mb-6'
                >
                    <input
                        type='text'
                        placeholder='Task title'
                        className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder='Task description'
                        className='w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        required
                    />
                    <button
                        type='submit'
                        className='w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all'
                    >
                        {editingTask ? "Update Task" : "Add Task"}
                    </button>
                </form>

                <h2 className='text-xl font-semibold mb-4 text-gray-700'>Your Tasks</h2>
                <div className='space-y-3'>
                    {tasks.length === 0 ? (
                        <p className='text-gray-500'>No tasks available</p>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className='bg-gray-50 hover:bg-gray-100 border border-gray-200 p-4 rounded-xl flex justify-between items-start transition-all'
                            >
                                <div>
                                    <h3 className='font-bold text-gray-800 text-lg'>{task.title}</h3>
                                    <p className='text-gray-600 mt-1'>{task.description}</p>
                                </div>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => startEditing(task)}
                                        className='bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg transition-all'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-all'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskPage;
