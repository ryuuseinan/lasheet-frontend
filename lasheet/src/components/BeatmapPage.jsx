import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BeatmapPage.css';  // Asegúrate de tener el archivo CSS adecuado
import { API_BASE_URL } from '../config';

const BeatmapPage = () => {
    const { id } = useParams(); // Extrae el parámetro `id` de la URL
    const [beatmap, setBeatmap] = useState(null);
    const [selectedDifficulties, setSelectedDifficulties] = useState({});

    useEffect(() => {
        const fetchBeatmap = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/beatmaps/${id}`); // URL de tu API para un beatmap específico
                const data = await response.json();
                setBeatmap(data);
                // Inicializa el estado de los checkboxes
                const initialSelection = {};
                data.difficulties.forEach(difficulty => {
                    initialSelection[difficulty.id] = false;
                });
                setSelectedDifficulties(initialSelection);
            } catch (error) {
                console.error("Error fetching beatmap:", error);
                setBeatmap(null); // Establece null si ocurre un error
            }
        };

        fetchBeatmap();
    }, [id]);

    if (!beatmap) {
        return <div>Loading...</div>;
    }

    const handleDownload = (event) => {
        event.preventDefault();
        // Logic to handle download
        console.log("Download button clicked");
    };

    const handleSelectAll = () => {
        const newSelection = {};
        const selectAll = !Object.values(selectedDifficulties).every(value => value);
        beatmap.difficulties.forEach(difficulty => {
            newSelection[difficulty.id] = selectAll;
        });
        setSelectedDifficulties(newSelection);
    };

    const handleCheckboxChange = (id) => {
        setSelectedDifficulties(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <div className="beatmap-item-box-long">
            <div className="beatmap-page">
                <div className="bg-image" style={{ backgroundImage: `url(${beatmap.bg})` }}></div>
                <div className="card-content">
                    <h1>{beatmap.artist} - {beatmap.title} <a href={`https://osu.ppy.sh/beatmapsets/${beatmap.beatmapset_id}`} target="_blank" rel="noopener noreferrer"><i className="fas fa-external-link-alt"></i></a></h1>
                    <p className="creator">Mapped by <a href={`https://osu.ppy.sh/users/${beatmap.creator}`} target="_blank" rel="noopener noreferrer">{beatmap.creator}</a></p>
                    <p className="size">Size: {(beatmap.size / (1024 * 1024)).toFixed(2)} MB</p>

                    {/* Mostrar las dificultades en una lista */}
                    <form onSubmit={handleDownload}>
                        <div className="row">
                            <div className="col">
                                <h2>Difficulties</h2>
                                <button onClick={handleSelectAll} className="btn btn-primary me-2">
                                    {Object.values(selectedDifficulties).every(value => value) ? 'Deselect All' : 'Select All'}
                                </button>
                                <ul className="difficulty-list">
                                    {beatmap.difficulties.map((difficulty) => (
                                        <li key={difficulty.id} className="difficulty-item">
                                            <input
                                                type="checkbox" 
                                                id={`difficulty-${difficulty.id}`} 
                                                name="difficulties" 
                                                value={difficulty.id} 
                                                checked={selectedDifficulties[difficulty.id]} 
                                                onChange={() => handleCheckboxChange(difficulty.id)}
                                            />
                                            <label htmlFor={`difficulty-${difficulty.id}`}>
                                                <img 
                                                    src={getDifficultyImage(difficulty.star_rating)} 
                                                    alt={`${difficulty.version} - ${difficulty.star_rating}★`} 
                                                    className="difficulty-icon"
                                                />
                                                <span>
                                                    {difficulty.version} - {difficulty.star_rating}★ (Aim: {difficulty.aim_difficulty}) (Speed: {difficulty.speed_difficulty}) (Slider: {difficulty.slider_factor_difficulty}) (md5: {difficulty.md5})
                                                </span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                                <button type="submit" className="btn btn-primary me-2">
                                    <i className="fas fa-download"></i> Download
                                </button>
                            </div>
                            <div className="col">
                            <h2>Custom Difficulties</h2>
                                <br></br>
                                <ul className="difficulty-list">
                                    {beatmap.difficulties.map((difficulty) => (
                                        <li key={difficulty.id} className="difficulty-item">
                                            <input
                                                type="checkbox" 
                                                id={`difficulty-${difficulty.id}`} 
                                                name="difficulties" 
                                                value={difficulty.id} 
                                                checked={selectedDifficulties[difficulty.id]} 
                                                onChange={() => handleCheckboxChange(difficulty.id)}
                                            />
                                            <label htmlFor={`difficulty-${difficulty.id}`}>
                                                <img 
                                                    src={getDifficultyImage(difficulty.star_rating)} 
                                                    alt={`${difficulty.version} - ${difficulty.star_rating}★`} 
                                                    className="difficulty-icon"
                                                />
                                                <span>
                                                    {difficulty.version} HRHR - {difficulty.star_rating}★ (Aim: {difficulty.aim_difficulty}) (Speed: {difficulty.speed_difficulty}) (Slider: {difficulty.slider_factor_difficulty}) 
                                                </span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Función que devuelve la URL de la imagen según el rating
const getDifficultyImage = (starRating) => {
    if (starRating <= 1.99) return 'https://i.ppy.sh/e4046437c0d195a3f2bed4b4140a41d696bdf7f0/68747470733a2f2f6f73752e7070792e73682f77696b692f696d616765732f7368617265642f646966662f656173792d6f2e706e673f3230323131323135';
    if (starRating <= 2.69) return 'https://i.ppy.sh/20d7052354c61f8faf3a4828d9ff7751bb6776b1/68747470733a2f2f6f73752e7070792e73682f77696b692f696d616765732f7368617265642f646966662f6e6f726d616c2d6f2e706e673f3230323131323135';
    if (starRating <= 3.99) return 'https://i.ppy.sh/f6eabcfbacdfe85e520106702ec3a382a0430d40/68747470733a2f2f6f73752e7070792e73682f77696b692f696d616765732f7368617265642f646966662f696e73616e652d6f2e706e673f3230323131323135';
    if (starRating <= 5.29) return 'https://i.ppy.sh/f6eabcfbacdfe85e520106702ec3a382a0430d40/68747470733a2f2f6f73752e7070792e73682f77696b692f696d616765732f7368617265642f646966662f696e73616e652d6f2e706e673f3230323131323135';
    if (starRating <= 6.49) return 'https://i.ppy.sh/cd145e0f3cf7039d72cb7cfe58f3931585f8e7a7/68747470733a2f2f6f73752e7070792e73682f77696b692f696d616765732f7368617265642f646966662f6578706572742d6f2e706e673f3230323131323135';
    return 'https://i.ppy.sh/3b561ef8a73118940b59e79f3433bfa98c26cbf1/68747470733a2f2f6f73752e7070792e73682f77696b692f696d616765732f7368617265642f646966662f657870657274706c75732d6f2e706e673f3230323131323135';
};

export default BeatmapPage;
