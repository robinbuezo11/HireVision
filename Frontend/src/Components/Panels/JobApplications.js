import React, { useState } from 'react';
import './JobApplications.css';

const JobApplications = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);

    const applications = [
        {
            puesto: 'Senior UX/UI Designer',
            postulado: 'Brandon Tejaxún',
            salario: 1500,
            fecha: '15/09/2024',
        },
        {
            puesto: 'Consultor de Ciberseguridad',
            postulado: 'Brandon Tejaxún',
            salario: 1500,
            fecha: '15/09/2024',
        },
        {
            puesto: 'Junior Python Developer',
            postulado: 'Brandon Tejaxún',
            salario: 1500,
            fecha: '15/09/2024',
        },
    ];

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
            <h1>Estado de Postulacións</h1> {/* Título actualizado */}
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
                            <td>{app.puesto}</td>
                            <td>{app.postulado}</td>
                            <td>Q{app.salario}</td>
                            <td>{app.fecha}</td>
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
                                    src="./Profile.svg"
                                    alt="Profile"
                                    className="profile-image-cv"
                                />
                            </div>
                            <h2>{selectedApplication.postulado}</h2>
                            <div className="skills">
                                <span>Python</span>
                                <span>JavaScript</span>
                                <span>MySQL</span>
                                <span>Docker</span>
                            </div>
                            <div className="download-section">
                                <select className="format-select">
                                    <option value="Pendiente" selected="true" disabled>Pendiente</option>
                                    <option value="Aceptado">Aceptado</option>
                                    <option value="Rechazado">Rechazado</option>
                                </select>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobApplications;
