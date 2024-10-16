import React, { useState } from 'react';
import './GetJob.css';

const GetJob = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const colors = [
        '#ffab91', // Color pastel 1
        '#80deea', // Color pastel 2
        '#d1c4e9', // Color pastel 3
        '#ffe0b2', // Color pastel 4
        '#c5e1a5', // Color pastel 5
    ];

    const jobs = Array.from({ length: 4 }, (_, index) => ({
        id: index + 1,
        title: `Trabajo ${index + 1}`,
        description: `Descripción detallada del trabajo ${index + 1}. Aquí puedes incluir más información relevante sobre el puesto.`,
        date: '20 Sep, 2024',
        salary: '1000 USD/mes',
        skills: ['Figma', 'Adobe XD'],
        color: colors[index % colors.length], // Asigna color pastel de la lista
    }));

    const handleJobClick = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedJob(null);
    };

    const handleApply = () => {
        alert(`Te has postulado para el trabajo: ${selectedJob.title}`);
        handleCloseModal(); // Cerrar el modal después de postular
    };

    return (
        <div className="jobs-container">
            <div className="jobs-grid">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="job-card"
                        style={{ backgroundColor: job.color }} // Aplicar color del trabajo
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
                            <span className="job-salary">{job.salary}</span>
                            <button className="btn btn-primary">Detalles</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && selectedJob && (
                <div className="modal" onClick={handleCloseModal}>
                    <div className="modal-content" style={{ backgroundColor: selectedJob.color }} onClick={(e) => e.stopPropagation()}>
                        <span className="close-modal" onClick={handleCloseModal}>&times;</span>
                        <div className="modal-header">
                            <h2 style={{ display: 'inline' }}>{selectedJob.title}</h2>
                            <button className="btn-apply" onClick={handleApply}>Postular</button>
                        </div>
                        <p><strong>Fecha:</strong> {selectedJob.date}</p>
                        <p><strong>Salario:</strong> {selectedJob.salary}</p>
                        <div className="modal-skills">
                            <strong>Habilidades:</strong>
                            <div className="skills-list">
                                {selectedJob.skills.map((skill, index) => (
                                    <span key={index} className="job-skill-tag">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="description-separator"></div>
                        <p><strong>Descripción:</strong></p>
                        <p>{selectedJob.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetJob;
