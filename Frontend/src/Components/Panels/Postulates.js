import React from 'react';
import './Postulates.css';

const jobs = [
    {
        id: 1,
        date: '20 Sep, 2024',
        title: 'Senior UI/UX Designer',
        salary: '1000 USD/mes',
        skills: ['Figma', 'Adobe XD'],
        applicants: 15,
        status: 'Aceptada' // Puedes cambiar el estatus a 'Pendiente' o 'Rechazada'
    },
    {
        id: 2,
        date: '20 Sep, 2024',
        title: 'Junior UI/UX Designer',
        salary: '1000 USD/mes',
        skills: ['Figma', 'Adobe XD'],
        applicants: 10,
        status: 'Pendiente'
    },
    {
        id: 3,
        date: '20 Sep, 2024',
        title: 'Junior UI/UX Designer',
        salary: '1000 USD/mes',
        skills: ['Figma', 'Adobe XD'],
        applicants: 8,
        status: 'Rechazada'
    },
    {
        id: 4,
        date: '20 Sep, 2024',
        title: 'Junior UI/UX Designer',
        salary: '1000 USD/mes',
        skills: ['Figma', 'Adobe XD'],
        applicants: 12,
        status: 'Aceptada'
    },
];

const statusColors = {
    'Pendiente': '#FFE1CC',
    'Rechazada': '#FFCCCC',
    'Aceptada': '#CCFFE8',
};

const Postulates = () => {
    const handleAccept = (id) => {
        alert(`Has aceptado la oferta para el trabajo con ID: ${id}`);
        // Lógica adicional para manejar la aceptación de la oferta
    };

    return (
        <div className="job-list">
            {jobs.map((job) => (
                <div key={job.id} className="job-card" style={{ background: statusColors[job.status] }}>
                    <div className="job-header">
                        <span className="job-date">{job.date}</span>
                    </div>
                    <div className="job-body">
                        <h2 className="job-title">{job.title}</h2>
                        <div className="job-skills">
                            {job.skills.map((skill, index) => (
                                <span key={index} className="job-skill">{skill}</span>
                            ))}
                        </div>
                        <div className="job-footer">
                            <span className="job-salary">{job.salary}</span>
                            <span className="job-applicants">Postulados: {job.applicants}</span>
                        </div>
                        {job.status === 'Aceptada' && (
                            <button className="job-details-button" onClick={() => handleAccept(job.id)}>Aceptar</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Postulates;
