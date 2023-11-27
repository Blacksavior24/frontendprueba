import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, IconButton, Button, Card, CardContent, CardActions, Box, useMediaQuery,FormControl, MenuItem, Select } from '@mui/material';
import { Delete, Edit, Archive, Unarchive } from '@mui/icons-material';
import { createTask, deleteTask, getTasks, updateTask } from '../actions/tasks.actions';

import TaskForm from './TaskForm';
import { getCategories } from '../actions/categories.actions';

function TaskList() {
    const dispatch = useDispatch();
    const allTasks = useSelector(state => state.tasks.tasks);
    const categories = useSelector(state => state.categories.categories);

    console.log("tareas",allTasks);
    const [showActiveTasks, setShowActiveTasks] = useState(true);
    const [dialogFormOpen, setDialogFormOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const activeTasks = allTasks.filter(task => task.active === true);
    const archivedTasks = allTasks.filter(task => task.active === false);

    const tasksToShow = showActiveTasks ? activeTasks : archivedTasks;

    const filteredTasks = selectedCategory
    ? tasksToShow.filter(task =>
        task.categories.some(category => category.id === selectedCategory)
      )
    : tasksToShow;


    useEffect(() => {
        dispatch(getTasks());
        dispatch(getCategories());
      }, [dispatch]);

    const handleToggleTasks = () => {
        setShowActiveTasks(prevState => !prevState);
    };

    
    const handleOpenDialog = (task, value) => {
        setSelectedTask(null)
        console.log("abriendo", task, value);
        if (value == 'edit') {
            setSelectedTask(task); 
            setTitle(task.title); 
            setDescription(task.description);
        } else {
            setSelectedTask(null);
            setTitle('');
            setDescription('');
            console.log("tarea seleccionada y", selectedTask);  
        }
        setDialogFormOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogFormOpen(false);
    };

    const handleAddTask = async (newTask, data) => {
        if (selectedTask) {
            console.log("seleccionada", selectedTask, newTask, data);
            const updatedTaskData = data
            console.log("update", updatedTaskData);
            await dispatch(updateTask(selectedTask.id, updatedTaskData));
            dispatch(getTasks())
        } else {
            console.log('Nueva tarea:', newTask, data);
            dispatch(createTask(newTask));
        }
    };

    const handleArchiveTask = async (taskId) =>{
        console.log('Archivado', taskId);
        const task = allTasks.find((task) => task.id === taskId);
        console.log("Tarea archivar", task);
        if (task) {
            const updatedTask = {
                active: !task.active,
            };
            console.log("Cambio", updatedTask);
            await dispatch(updateTask(taskId, updatedTask));
            dispatch(getTasks());
        }
    }

    const handleDeleteTask = (taskId) =>{
        console.log("Delete tarea", taskId);
        dispatch(deleteTask(taskId))
    }

    const handleClearFilter = () => {
        setSelectedCategory(null);
    };

    const handleDeleteCategory = async (taskId, categoryId) => {
        
        console.log("categorias a borrar de las tareas", taskId, categoryId);
        const task = allTasks.find(task => task.id === taskId);
    
        if (task) {
            // Filtra las categorías, excluyendo la que queremos eliminar
            const updatedCategories = task.categories.filter(category => category.id !== categoryId);
    
            const updatedCategoryIds = updatedCategories.map(category => category.id);

            // Actualiza la tarea con las categorías actualizadas
            const updatedTask = {
                categories: updatedCategoryIds,
            };
            console.log("como se borrara", taskId, updatedTask);
            // Dispara la acción de actualizar la tarea con las categorías actualizadas
            await dispatch(updateTask(taskId, updatedTask));
            dispatch(getTasks())
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant={isSmallScreen?'h3':'h1'}>LISTA DE TAREAS</Typography>
            <Box display="flex" justifyContent="center">
                <Button onClick={handleToggleTasks} variant="outlined" color="primary">
                    {showActiveTasks ? 'Ver Archivadas' : 'Ver Activas'}
                </Button>
                <FormControl variant="outlined" style={{ marginLeft: '16px' }}>
                    <Select
                        value={selectedCategory || ''}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            Filtrar por Categoría
                        </MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {selectedCategory && (
                    <Button variant="outlined" color="primary" onClick={handleClearFilter}>
                        Quitar Filtro
                    </Button>
                )}
            </Box>
            <Box display="flex" justifyContent="center">
                <Grid container spacing={2} justifyContent="center">
                    {filteredTasks.map((task) => (
                        <Grid key={task.id} item xs={12} sm={6} md={6} lg={6}>
                                <Card style={{ maxWidth: '100%', minWidth: 300 }}>
                                    <CardContent>
                                        <Typography variant="h6">{task.title}</Typography>
                                        <Typography variant="body1">{task.description}</Typography>
                                    </CardContent>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="flex-end"
                                        px={2}
                                        pb={1}
                                    >
                                        <Box>
                                            {task.categories.map(category => (
                                                <Button key={category.id} variant="outlined" onClick={() => handleDeleteCategory(task.id, category.id)}>
                                                    {category.name} <span style={{ marginLeft: '4px', cursor: 'pointer' }} onClick={() => handleDeleteCategory(task.id, category.id)}>❌</span>
                                                </Button>
                                            ))}
                                        </Box>
                                        <Box>
                                            <IconButton aria-label="archive" onClick={()=>handleArchiveTask(task.id)}>
                                                {task.active ? <Archive /> : <Unarchive />}
                                            </IconButton>
                                            <IconButton aria-label="edit" onClick={() => handleOpenDialog(task, 'edit')}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={()=>handleDeleteTask(task.id)}>
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Button onClick={handleOpenDialog} variant="outlined" color="primary">
                Agregar Tarea
            </Button>
            <TaskForm open={dialogFormOpen} onClose={handleCloseDialog} onSubmit={handleAddTask} selectedTask={selectedTask} />
            
        </div>
    );
}

export default TaskList;
