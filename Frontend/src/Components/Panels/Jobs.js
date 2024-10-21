import React, { useState, useEffect } from 'react';
import './Jobs.css';
import JobForm from './JobForm';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchJobs = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/admin/jobs');
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleNewJobClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    
    return (
        <div className="jobs-container">
            <div className="jobs-header">
                <button className="btn btn-new-job" onClick={handleNewJobClick}>
                    Nuevo Puesto
                </button>
            </div>
    
            <div className="jobs-grid">
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <div key={job.empleo_id} className="job-card">
                            <div className="job-card-header">
                                <span className="job-date">{formatDate(job.fecha_creacion)}</span>
                            </div>
                            <h2 className="job-title">{job.puesto}</h2>
                            <div className="job-skills">
                                {job.habilidades
                                    .split(',')
                                    .map((skill, index) => (
                                        <span key={index} className="job-skill-tag">
                                            {skill}
                                        </span>
                                    ))}
                            </div>
                            <div className="job-footer">
                                <span className="job-salary">{job.salario} Q/mes</span>
                                <button className="btn btn-primary">Detalles</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay empleos disponibles.</p>
                )}
            </div>
    
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={handleCloseModal}>
                            &times;
                        </span>
                        <h2 className="title-modal">Nuevo Puesto</h2>
                        <JobForm handleCloseModal={handleCloseModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Jobs;
