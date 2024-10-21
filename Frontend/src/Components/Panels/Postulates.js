import React, { useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import './JobApplications.css';

// Componente para el gráfico circular
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

// Componente principal de postulaciones
const Postulates = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);

    const applications = [
        {
            puesto: 'Senior UX/UI Designer',
            salario: 1500,
            estado: 'Pendiente',
            fecha: '15/09/2024',
        },
        {
            puesto: 'Consultor de Ciberseguridad',
            salario: 1500,
            estado: 'Rechazado',
            fecha: '15/09/2024',
        },
        {
            puesto: 'Junior Python Developer',
            salario: 1500,
            estado: 'Aceptado',
            fecha: '15/09/2024',
        },
    ];

    const getStatusClass = (estado) => {
        switch (estado) {
            case 'Pendiente':
                return 'status-pending';
            case 'Rechazado':
                return 'status-rejected';
            case 'Aceptado':
                return 'status-accepted';
            default:
                return '';
        }
    };

    const handleAcceptClick = () => {
        setPopupVisible(true);
        console.log('Trabajo aceptado'); // Para verificar si se está llamando
        setTimeout(() => {
            setPopupVisible(false); // Ocultar el popup después de 3 segundos
        }, 3000);
    };

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
                        <th>Salario</th>
                        <th>Estado</th>
                        <th>Decisión Final</th>
                        <th>Fecha de envío</th>
                        <th>Perfil</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app, index) => (
                        <tr key={index}>
                            <td>{app.puesto}</td>
                            <td>Q{app.salario}</td>
                            <td>
                                <span className={`status ${getStatusClass(app.estado)}`}>
                                    {app.estado}
                                </span>
                            </td>
                            <td>
                                {app.estado === 'Aceptado' ? (
                                    <button
                                        className="accept-button"
                                        style={{
                                            backgroundColor: '#56b261',
                                            color: 'white', 
                                            border: 'none', 
                                            padding: '8px 16px', 
                                            borderRadius: '12px', 
                                            cursor: 'pointer', 
                                            transition: 'background-color 0.3s ease', 
                                            fontSize: '14px', 
                                        }}
                                        onClick={() => {
                                            handleAcceptClick();
                                            closeModal(); // Cerrar el modal al aceptar
                                        }}
                                    >
                                        Aceptar
                                    </button>
                                ) : (
                                    <span></span> // No mostrar nada si no está aceptado
                                )}
                            </td>
                            <td>{app.fecha}</td>
                            <td>
                                <a onClick={() => openModal(app)}>Ver Perfil</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {popupVisible && (
                <div className="popup-notification">
                    ¡Has aceptado el trabajo!
                </div>
            )}

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
                                <div className="graph-container">
                                    <DonutChart percentage={25} />
                                    <div className="percentage">25%</div>
                                </div>
                            </div>
                            <h2>{selectedApplication.puesto}</h2>
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

export default Postulates;
