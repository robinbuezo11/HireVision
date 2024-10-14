import React from 'react';
import './GetJob.css'; 

const jobs = [
    {
        id: 1,
        date: '20 Sep, 2024',
        title: 'Senior UI/UX Designer',
        salary: '1000 USD/mes',
        skills: ['Figma', 'Adobe XD'],
        applicants: 15
    },
    {
        id: 2,
        date: '20 Sep, 2024',
        title: 'Junior UI/UX Designer',
        salary: '1000 USD/mes',
        skills: ['Figma', 'Adobe XD'],
        applicants: 10
    },
    {
        id: 3,
        date: '20 Sep, 2024',
        title: 'Junior UI/UX Designer',
        salary: '1000 USD/mes',
        skills: ['Figma', 'Adobe XD'],
        applicants: 8
    },
    {
        id: 4,
        date: '20 Sep, 2024',
        title: 'Junior UI/UX Designer',
        salary: '1000 USD/mes',
        skills: ['Figma', 'Adobe XD'],
        applicants: 12
    },
    // Puedes agregar más trabajos aquí
];

// Lista de colores para las tarjetas
const cardColors = ['#FFE1CC', '#CCFFE8', '#E1CCFF', '#CCE9FF'];

const GetJob = () => {
    return (
        <div className="job-list">
            {jobs.map((job, index) => (
                <div key={job.id} className="job-card" style={{ background: cardColors[index % cardColors.length] }}>
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
                        <button className="job-details-button">Detalles</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GetJob;
