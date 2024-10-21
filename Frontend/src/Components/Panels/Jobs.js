import React, { useState } from 'react';
import './Jobs.css';
import JobForm from './JobForm';

const Jobs = () => {
    const [showModal, setShowModal] = useState(false);

    const jobs = Array.from({ length: 4 }, (_, index) => ({
        id: index + 1,
        title: `Trabajo ${index + 1}`,
        description: `Descripción del trabajo ${index + 1}`,
        date: '20 Sep, 2024',
        salary: '1000 USD/mes',
        skills: ['Figma', 'Adobe XD'],
    }));

    const handleNewJobClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="jobs-container">
            <div className="jobs-header">
                <button className="btn btn-new-job" onClick={handleNewJobClick}>
                    Nuevo Puesto
                </button>
            </div>

            <div className="jobs-grid">
                {jobs.map((job) => (
                    <div key={job.id} className="job-card">
                        <div className="job-card-header">
                            <span className="job-date">{job.date}</span>
                        </div>
                        <h2 className="job-title">{job.title}</h2>
                        <p className="job-description">{job.description}</p>
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

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={handleCloseModal}>
                            &times;
                        </span>
                        <h2 className='title-modal'>Nuevo Puesto</h2>
                        <JobForm handleCloseModal={handleCloseModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Jobs;
