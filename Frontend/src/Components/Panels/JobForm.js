import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './JobForm.css';

const JobForm = () => {
    const [description, setDescription] = useState('');
    const [skillInput, setSkillInput] = useState('');
    const [skills, setSkills] = useState([]);

    const handleDescriptionChange = (value) => {
        setDescription(value);
    };

    const handleSkillChange = (e) => {
        setSkillInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        // Detectar Ctrl + Enter
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            if (skillInput.trim() !== '') {
                setSkills([...skills, skillInput.trim()]);
                setSkillInput(''); // Limpiar el input
            }
        }
    };

    const removeSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    return (
        <form className="job-form">
            <div className="form-row">
                <div className="form-group1">
                    <input type="text" id="title" required placeholder=" " />
                    <label htmlFor="title">Título del puesto</label>
                </div>
                <div className="form-group1">
                    <input type="text" id="salary" required placeholder=" " />
                    <label htmlFor="salary">Salario</label>
                </div>
            </div>

            <div className="form-group1">
                <div className="skills-input-container">
                    <div className="input-chip-container">
                        <div className="chips-container">
                            {skills.map((skill, index) => (
                                <div key={index} className="chip">
                                    {skill}
                                    <button
                                        type="button"
                                        className="chip-close"
                                        onClick={() => removeSkill(index)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            <input
                                type="text"
                                value={skillInput}
                                onChange={handleSkillChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Escribe una habilidad y presiona Ctrl + Enter"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-group1">
                <ReactQuill 
                    value={description} 
                    onChange={handleDescriptionChange} 
                    placeholder="Escribe la descripción del puesto..." 
                />
            </div>

            <button type="submit">Crear Puesto</button>
        </form>
    );
};

export default JobForm;
