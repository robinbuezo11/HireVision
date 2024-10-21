import React, { useState, useEffect } from 'react';
import './Jobs.css';
import JobForm from './JobForm';

const JobDetailsModal = ({ job, onClose }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <div className="modal-header">
                    <h1>{job.puesto}</h1>
                </div>
                <div className="modal-body">
                    <p>{ formatDate(job.fecha_creacion) }</p>
                    <p>{job.salario} Q/mes</p>
                    <div className="skills-container">
                        {job.habilidades.split(',').map((skill, index) => (
                            <span key={index} className="job-skill-tag">
                                {skill.trim()}
                            </span>
                        ))}
                    </div>
                    <div className="job-description" 
                        dangerouslySetInnerHTML={{ __html: job.descripcion }} />
                </div>
            </div>
        </div>
    );
};

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [showJobModal, setShowJobModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const fetchJobs = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/jobs', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('idToken')}`,
                },
            });
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
        setShowJobModal(true);
    };

    const handleCloseJobModal = (created = false) => {
        setShowJobModal(false);
        if (created) {
            fetchJobs();
        }
    };

    const handleDetailsClick = (job) => {
        setSelectedJob(job);
        setShowDetailsModal(true);
    };

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
        setSelectedJob(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
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
                                    .slice(0, 5)
                                    .map((skill, index) => (
                                        <span key={index} className="job-skill-tag">
                                            {skill}
                                        </span>
                                    ))}
                            </div>
                            <div className="job-footer">
                                <span className="job-salary">{job.salario} Q/mes</span>
                                <button className="btn btn-primary" onClick={() => handleDetailsClick(job)}>
                                    Detalles
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay empleos disponibles.</p>
                )}
            </div>

            {showJobModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={handleCloseJobModal}>&times;</span>
                        <h2 className="title-modal">Nuevo Puesto</h2>
                        <JobForm handleCloseModal={handleCloseJobModal} />
                    </div>
                </div>
            )}

            {showDetailsModal && selectedJob && (
                <JobDetailsModal job={selectedJob} onClose={handleCloseDetailsModal} />
            )}
        </div>
    );
};

export default Jobs;
