import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem } from '@mui/material';
import { getCategories } from '../actions/categories.actions';

function TaskForm({ open, onClose, onSubmit, selectedTask }) {

    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    console.log("las categorias", categories);

    useEffect(() => {
        dispatch(getCategories()); 
    }, [dispatch]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]); 

    useEffect(() => {
      if (selectedTask) {
          setTitle(selectedTask.title);
          setDescription(selectedTask.description);
          setSelectedCategories(selectedTask.categories.map(category => category.id));
      }
    }, [selectedTask]);

    const handleSubmit = () => {
        console.log("title", title,description);
        const taskData = {title, description, categories: selectedCategories};
        if (selectedTask) {

            onSubmit(selectedTask.id, taskData); 
        } else {
            onSubmit({...taskData, active: true}); 
        }
        onClose();
        setTitle('')
        setDescription('')
        setSelectedCategories([])
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Agregar Nueva Tarea</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Título"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Descripción"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Select
                    multiple
                    fullWidth
                    value={selectedCategories}
                    onChange={(e) => setSelectedCategories(e.target.value)}
                    label="Categorías"
                >
                    {categories?.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} color="primary">
                {selectedTask ? 'Editar' : 'Agregar'} 
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TaskForm;
