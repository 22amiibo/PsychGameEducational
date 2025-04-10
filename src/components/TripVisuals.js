import React from "react";
import PropTypes from 'prop-types';

const TripVisuals = ({ tripVisuals, badTripActive, tripIntensity }) => {
    if (!tripVisuals) return null;
    return (
        <div
            className={`trip-visuals ${badTripActive ? "bad-trip-visuals" : ""}`}
            style={{ opacity: tripIntensity / 100 }}
        >
            <div className="visual-layer layer1"></div>
            <div className="visual-layer layer2"></div>
            <div className="visual-layer layer3"></div>
            <div className="visual-layer layer4"></div>
            <div className="mushroom-visuals">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className="floating-mushroom"
                        style={{
                            left: `${Math.random() * 90 + 5}%`,
                            top: `${Math.random() * 90 + 5}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            transform: `scale(${0.5 + Math.random() * 1.5}) rotate(${Math.random() * 360}deg)`,
                            opacity: 0.5 + Math.random() * 0.5 * (tripIntensity / 100),
                        }}
                    >
                        <div className="mushroom-cap"></div>
                        <div className="mushroom-stem"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

TripVisuals.propTypes = {
    tripVisuals: PropTypes.bool.isRequired,
    badTripActive: PropTypes.bool.isRequired,
    tripIntensity: PropTypes.number.isRequired,
};


export default TripVisuals;