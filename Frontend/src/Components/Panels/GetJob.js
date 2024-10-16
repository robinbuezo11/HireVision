import React, { useState } from 'react';
import './GetJob.css';

const GetJob = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [file, setFile] = useState(null); // Estado para almacenar el archivo cargado

    const colors = [
        '#ffab91', 
        '#80deea', 
        '#d1c4e9', 
        '#ffe0b2', 
        '#c5e1a5', 
    ];

    const jobs = Array.from({ length: 4 }, (_, index) => ({
        id: index + 1,
        title: `Trabajo ${index + 1}`,
        description: `Descripción detallada del trabajo ${index + 1}. Aquí puedes incluir más información relevante sobre el puesto.`,
        date: '20 Sep, 2024',
        salary: '1000 USD/mes',
        skills: ['Figma', 'Adobe XD'],
        applicants: 15, // Cantidad de postulados
        color: colors[index % colors.length], // Asigna color pastel de la lista
    }));

    const handleJobClick = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedJob(null);
        setFile(null); // Resetea el archivo al cerrar el modal
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Actualiza el estado con el archivo seleccionado
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles && droppedFiles.length > 0) {
            setFile(droppedFiles[0]); // Establece el archivo arrastrado
        }
    };

    const handleApply = () => {
        if (!file) {
            alert('Por favor, carga un archivo PDF antes de postular.');
            return;
        }

        alert(`Te has postulado para el trabajo: ${selectedJob.title} con el archivo: ${file.name}`);
        handleCloseModal(); // Cerrar el modal después de postular
    };

    return (
        <div className="jobs-container">
            <div className="jobs-grid">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="job-card"
                        style={{ backgroundColor: job.color }} 
                        onClick={() => handleJobClick(job)}
                    >
                        <div className="job-card-header">
                            <span className="job-date">{job.date}</span>
                        </div>
                        <h2 className="job-title">{job.title}</h2>
                        <div className="job-skills">
                            {job.skills.map((skill, index) => (
                                <span key={index} className="job-skill-tag">
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <div className="job-footer">
                            <span className="job-salary" style={{ fontWeight: 'bold' }}>{job.salary}</span>
                            <span className="job-applicants">Postulados: {job.applicants}</span>
                        </div>
                        <button className="btn btn-primary">Detalles</button>
                    </div>
                ))}
            </div>

            {showModal && selectedJob && (
                <div className="modal" onClick={handleCloseModal}>
                    <div
                        className="modal-content"
                        style={{ backgroundColor: selectedJob.color }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="close-modal" onClick={handleCloseModal}>&times;</span>
                        <div className="modal-header" style={{ textAlign: 'left' }}>
                            <p className="job-date">{selectedJob.date}</p> 
                        </div>
                        <h2 style={{ display: 'inline', textAlign: 'left' }}>{selectedJob.title}</h2>
                        <p style={{ fontWeight: 'bold', textAlign: 'left' }}>{selectedJob.salary}</p> 
                        <div className="modal-skills">
                            <div className="skills-list">
                                {selectedJob.skills.map((skill, index) => (
                                    <span key={index} className="job-skill-tag">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div style={{ margin: '10px 0' }}></div> {/* Espacio vacío */}
                        <div className="job-applicants" style={{ textAlign: 'left' }}>Postulados: {selectedJob.applicants}</div> {/* Cantidad de postulados */}
                        <div className="description-separator"></div>
                        <p className="modal-description" style={{ textAlign: 'left' }}>{selectedJob.description}</p> {/* Descripción */}

                        {/* Área de carga con arrastre */}
                        <div
                            className="file-upload" 
                            onDragOver={handleDragOver} 
                            onDrop={handleDrop}
                            style={{ 
                                border: '2px dashed #007bff', 
                                padding: '20px', 
                                textAlign: 'center', 
                                borderRadius: '5px',
                                marginTop: '20px',
                                backgroundColor: '#f0f8ff'
                            }}
                            onClick={() => document.getElementById('file-input').click()} // Abre el selector de archivos al hacer clic
                        >
                            <p>{file ? `Archivo: ${file.name}` : 'Arrastra tu CV en formato PDF aquí o haz clic para seleccionar uno.'}</p>
                            <input 
                                type="file" 
                                accept=".pdf" 
                                onChange={handleFileChange} 
                                style={{ display: 'none' }} 
                                id="file-input" 
                            />
                        </div>

                        {/* Botón Postular */}
                        <div style={{ marginTop: '30px' }}> {/* Aumentado el margen superior */}
                            <button className="btn-apply" onClick={handleApply}>Postular</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetJob;
