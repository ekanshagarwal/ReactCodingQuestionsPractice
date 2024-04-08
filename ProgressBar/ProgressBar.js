import { useState, useEffect } from 'react';

const ProgressBar = ({ value = 0, onComplete = () => { } }) => {
    const [percentage, setPercentage] = useState(value);

    useEffect(() => {
        setPercentage(Math.min(100, Math.max(value, 0)));
        if (value >= 100) {
            onComplete();
        }
    }, [value]);
    return (
        <div className="progress">
            <span style={{ color: percentage > 49 ? 'white' : 'black' }}>{percentage.toFixed()}%</span>
            <div
                // style={{ width: `${percentage}%` }} 
                style={{ transform: `scaleX(${percentage / 100})`, transformOrigin: 'left' }}
                role="progressbar"
                aria-valuemin={0}
                aria-valuenow={percentage.toFixed()}
                aria-valuemax={100}
            />
        </div >
    );
};

export default ProgressBar;