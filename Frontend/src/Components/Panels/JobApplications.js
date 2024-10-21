import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import './JobApplications.css';

const DonutChart = ({ percentage }) => {
    const data = [
        { name: 'Completed', value: percentage },
        { name: 'Remaining', value: 100 - percentage }
    ];

    const COLORS = ['#5243F5', '#F5F5F5'];

    return (
        <div className="graph-container">
            <PieChart width={120} height={120}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={50}
                    startAngle={90}
                    endAngle={450}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
            </PieChart>
            <div className="percentage">{percentage}%</div>
        </div>
    );
};

const JobApplications = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [applications, setApplications] = useState([]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const fetchApplications = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs/postulates`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('idToken')}`,
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('Error fetching applications');
            }
            
            const data = await response.json();
            setApplications(data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const openModal = (application) => {
        setSelectedApplication(application);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedApplication(null);
    };

    return (
        <div className="job-applications">
            <h1>Postulados</h1>
            <table>
                <thead>
                    <tr>
                        <th>Puesto</th>
                        <th>Postulado</th>
                        <th>Salario</th>
                        <th>Fecha de envío</th>
                        <th>Perfil</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app, index) => (
                        <tr key={index}>
                            <td>{app.PUESTO}</td>
                            <td>{app.POSTULADO}</td>
                            <td>Q{app.SALARIO}</td>
                            <td>{formatDate(app.FECHA_CREACION)}</td>
                            <td>
                                <a onClick={() => openModal(app)}>Ver Perfil</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && selectedApplication && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <div className="profile-cv">
                            <div className="profile-section">
                                <img
                                    src={
                                        selectedApplication.FOTO 
                                        ? selectedApplication.FOTO 
                                        : "./Profile.svg"
                                    }
                                    alt="Profile"
                                    className="profile-image-cv"
                                />
                                <div className="graph-container">
                                    <DonutChart percentage={25} />
                                </div>
                            </div>
                            <h2>{selectedApplication.POSTULADO}</h2>
                            <div className="skills">
                                <span>Python</span>
                                <span>JavaScript</span>
                                <span>MySQL</span>
                                <span>Docker</span>
                            </div>
                            <div className="download-section">
                                <button className="download-cv">
                                    Descargar CV
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobApplications;
