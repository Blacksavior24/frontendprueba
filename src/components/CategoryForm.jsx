import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem } from '@mui/material';


function CategoryForm({ open, onClose, onSubmit, selectedTask }) {


    const [name, setName] = useState('');

    const handleSubmit = () => {
        console.log("title", name);
        const taskData = {name};
        onSubmit(taskData)
        onClose();
        setName('')
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Agregar Nueva Categoria</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} color="primary">
                {'Agregar'} 
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CategoryForm;
