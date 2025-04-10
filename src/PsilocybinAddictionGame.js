import React, { useState, useEffect, useRef } from 'react';
import './PsilocybinAddictionGame.css';

const PsilocybinAddictionGame = () => {
  // Define the initial thought patterns (this copy never changes)
  const initialThoughtPatterns = [
    { id: 1, text: "I need a cigarette to relax", strength: 95, color: 'fill-red-1' },
    { id: 2, text: "I can't handle stress without smoking", strength: 90, color: 'fill-red-2' },
    { id: 3, text: "I've tried to quit before and failed", strength: 85, color: 'fill-red-3' },
    { id: 4, text: "Smoking is part of my identity", strength: 80, color: 'fill-red-4' }
  ];

  // --- Game State ---
  const [gameState, setGameState] = useState('intro');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [defaultNetworkActivity, setDefaultNetworkActivity] = useState(100);
  const [thoughtPatterns, setThoughtPatterns] = useState(initialThoughtPatterns);
  const [newPerspectives, setNewPerspectives] = useState([
    { id: 1, text: "I can find healthier ways to relax", strength: 10, color: 'fill-green-1', unlocked: false, clicks: 0 },
    { id: 2, text: "I have tools to manage stress", strength: 5, color: 'fill-green-2', unlocked: false, clicks: 0 },
    { id: 3, text: "Past failures don't define future attempts", strength: 5, color: 'fill-green-3', unlocked: false, clicks: 0 },
    { id: 4, text: "I can redefine who I am", strength: 5, color: 'fill-green-4', unlocked: false, clicks: 0 }
  ]);

  // --- Additional State Variables ---
  const [therapyProgress, setTherapyProgress] = useState(0);
  const [recoveryRate, setRecoveryRate] = useState(0);
  const [message, setMessage] = useState('');
  const [showBounce, setShowBounce] = useState(false);
  const [activeConnections, setActiveConnections] = useState([]);
  const [tripVisuals, setTripVisuals] = useState(false);
  const [tripIntensity, setTripIntensity] = useState(0);
  const [visualTheme, setVisualTheme] = useState('default');
  const [badTripActive, setBadTripActive] = useState(false);
  const [badTripClicks, setBadTripClicks] = useState(0);
  const [eurekaActive, setEurekaActive] = useState(false);
  const [eurekaPosition, setEurekaPosition] = useState({ x: 50, y: 50 });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [challengeLevel, setChallengeLevel] = useState(1);
  const [timeLimit, setTimeLimit] = useState(12);
  const [timeRemaining, setTimeRemaining] = useState(12);
  const [obstacles, setObstacles] = useState([]);
  const [scoreMultiplier, setScoreMultiplier] = useState(1);
  const [showMultiplierEffect, setShowMultiplierEffect] = useState(false);
  const [particleEffects, setParticleEffects] = useState([]);
  const [fadeOutPatterns, setFadeOutPatterns] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);


  // Refs for animations, timers, and idle tracking
  const animationRef = useRef(null);
  const timerRef = useRef(null);
  const musicOscillatorsRef = useRef([]);
  const lastInsightClickRef = useRef(Date.now());
  const eurekaTimeoutRef = useRef(null);

  // --- Effects for updating brain connections and trip visuals ---
  useEffect(() => {
    if (gameState === 'session') {
      const newConnections = [];
      for (let i = 0; i < 8; i++) {
        const quadrant = i % 4;
        let x1, y1, x2, y2;
        if (quadrant === 0) {
          x1 = 20 + (i * 3) % 15;
          y1 = 30 + (i * 5) % 20;
        } else if (quadrant === 1) {
          x1 = 65 + (i * 3) % 15;
          y1 = 30 + (i * 5) % 20;
        } else if (quadrant === 2) {
          x1 = 20 + (i * 3) % 15;
          y1 = 70 + (i * 3) % 20;
        } else {
          x1 = 65 + (i * 3) % 15;
          y1 = 70 + (i * 3) % 20;
        }
        const targetQuadrant = (quadrant + 2) % 4;
        if (targetQuadrant === 0) {
          x2 = 20 + ((i + 3) * 5) % 15;
          y2 = 30 + ((i + 2) * 3) % 20;
        } else if (targetQuadrant === 1) {
          x2 = 65 + ((i + 3) * 5) % 15;
          y2 = 30 + ((i + 2) * 3) % 20;
        } else if (targetQuadrant === 2) {
          x2 = 20 + ((i + 3) * 5) % 15;
          y2 = 70 + ((i + 2) * 3) % 20;
        } else {
          x2 = 65 + ((i + 3) * 5) % 15;
          y2 = 70 + ((i + 2) * 3) % 20;
        }
        newConnections.push({
          id: i,
          x1,
          y1,
          x2,
          y2,
          active: defaultNetworkActivity < 70 && i % 3 === 0
        });
      }
      setActiveConnections(newConnections);
      setTripVisuals(true);
      setTripIntensity(0);
      const tripInterval = setInterval(() => {
        setTripIntensity(prev => {
          if (prev < 100) return prev + 10;
          clearInterval(tripInterval);
          return 100;
        });
      }, 800);
      return () => clearInterval(tripInterval);
    } else if (gameState !== 'badTrip') {
      const fadeOutInterval = setInterval(() => {
        setTripIntensity(prev => {
          if (prev > 0) return prev - 10;
          clearInterval(fadeOutInterval);
          setTripVisuals(false);
          return 0;
        });
      }, 300);
      return () => clearInterval(fadeOutInterval);
    }
  }, [gameState, defaultNetworkActivity]);

  // --- Timer effect for challenges ---
  useEffect(() => {
    if (timerActive) {
      const timerInterval = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            if (gameState === 'insights') {
              setMessage("Time's up! You need to move faster in the next session.");
            }
            setGameState('integration');
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [timerActive, gameState]);
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = useRef(null);
  useEffect(() => {
    if (tripVisuals) {
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationRef.current);
    }
  }, [tripVisuals]);

  // --- Initialize obstacle challenge when in 'challenge' state ---
  useEffect(() => {
    if (gameState === 'challenge') {
      const initialObstacles = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10
      }));
      setObstacles(initialObstacles);
      setMessage("Negative thought obstacles have emerged! Click them to clear your path to insight.");
    }
  }, [gameState]);

  // --- Transition to insights when obstacles are cleared ---
  useEffect(() => {
    if (gameState === 'challenge' && obstacles.length === 0) {
      setMessage("Transform thought patterns after psilocybin has been administered in a safe controlled environment");
      setTimeout(() => setGameState('insights'), 1000);
    }
  }, [obstacles, gameState]);

  // --- Idle decay effect in 'insights' state ---
  useEffect(() => {
    if (gameState === 'insights') {
      const idleInterval = setInterval(() => {
        const elapsed = Date.now() - lastInsightClickRef.current;
        if (elapsed > 50) { // if idle more than 3 seconds
          setNewPerspectives(prev =>
            prev.map(p => {
              if (p.unlocked && p.clicks > 0) {
                return { ...p, clicks: p.clicks - 1, strength: Math.max(p.strength - 5, 5) };
              }
              return p;
            })
          );
          setScore(prev => Math.max(prev - 10, 0));
        }
      }, 1000);
      return () => clearInterval(idleInterval);
    }
  }, [gameState]);

  // --- Game mechanics functions ---
  const resetGame = () => {
    setGameState('intro');
    setLevel(1);
    setScore(0);
    setDefaultNetworkActivity(100);
    setThoughtPatterns(initialThoughtPatterns);
    setNewPerspectives([
      { id: 1, text: "I can find healthier ways to relax", strength: 5, color: 'fill-green-1', unlocked: false, clicks: 0 },
      { id: 2, text: "I have tools to manage stress", strength: 5, color: 'fill-green-2', unlocked: false, clicks: 0 },
      { id: 3, text: "Past failures don't define future attempts", strength: 5, color: 'fill-green-3', unlocked: false, clicks: 0 },
      { id: 4, text: "I can redefine who I am", strength: 5, color: 'fill-green-4', unlocked: false, clicks: 0 }
    ]);
    setTherapyProgress(0);
    setRecoveryRate(0);
    setMessage('');
    setTutorialStep(1);
    setTripVisuals(false);
    setTripIntensity(0);
    setBadTripActive(false);
    setBadTripClicks(0);
    setEurekaActive(false);
    setChallengeLevel(1);
    setTimeLimit(12);
    setTimeRemaining(12);
    setTimerActive(false);
    setScoreMultiplier(1);
    setParticleEffects([]);
    setFadeOutPatterns([]);
    setObstacles([]);
  };

  const startTutorial = () => {
    setGameState('tutorial');
    setMessage("Welcome! As a neuropsychiatrist, your task is to guide patients out of addiction using psilocybin therapy.");
    playSound('button');
  };

  const nextTutorialStep = () => {
    playSound('button');
    if (tutorialStep === 1) {
      setTutorialStep(2);
      setMessage("In each session, you administer psilocybin to temporarily quiet the Default Mode Network (DMN) and allow new connections.");
    } else if (tutorialStep === 2) {
      setTutorialStep(3);
      setMessage("Next, guide the patient to form new, healthier thought patterns as the old ones weaken.");
    } else if (tutorialStep === 3) {
      setTutorialStep(4);
      setMessage("Sometimes, challenging moments (or 'bad trips') occur. Help stabilize them using calming techniques.");
    } else if (tutorialStep === 4) {
      setTutorialStep(5);
      setMessage("Occasionally, obstacles emerge that block progress. Clear them to unlock deeper insights!");
    } else {
      startTherapy();
    }
  };

  const startTherapy = () => {
    setGameState('session');
    setMessage("Level " + level + ": Begin psilocybin session. Reduce DMN activity to open the mind to new perspectives.");
    setShowBounce(true);
    setTimeout(() => setShowBounce(false), 5000);
    const newTimeLimit = Math.max(10, 30 - (level * 2));
    setTimeLimit(newTimeLimit);
    setTimeRemaining(newTimeLimit);
    if (soundEnabled) {
      playAmbientMusic();
    }
  };

  const playSound = (type) => {
    if (!soundEnabled) return;
    let timeoutId;
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
    }
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    switch (type) {
      case 'button':
        oscillator.type = 'sine';
        oscillator.frequency.value = 440;
        gainNode.gain.value = 0.1;
        oscillator.start();
        timeoutId = setTimeout(() => oscillator.stop(), 100);
        break;
      case 'insight':
        oscillator.type = 'sine';
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.1;
        oscillator.start();
        timeoutId = setTimeout(() => oscillator.stop(), 200);
        break;
      case 'badTrip':
        oscillator.type = 'sawtooth';
        oscillator.frequency.value = 220;
        gainNode.gain.value = 0.15;
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          audioContext.current.currentTime + 0.5
        );
        timeoutId = setTimeout(() => oscillator.stop(), 500);
        break;
      case 'eureka':
        oscillator.type = 'sine';
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.2;
        oscillator.start();
        oscillator.frequency.exponentialRampToValueAtTime(
          1760,
          audioContext.current.currentTime + 0.3
        );
        timeoutId = setTimeout(() => oscillator.stop(), 300);
        break;
      default:
        timeoutId = setTimeout(() => oscillator.stop(), 0);

        break;
    }
  };

  const playAmbientMusic = () => {
    if (musicPlaying || !soundEnabled) return;
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
    }
    setMusicPlaying(true);
    const oscillator1 = audioContext.current.createOscillator();
    const oscillator2 = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    oscillator1.type = 'sine';
    oscillator1.frequency.value = 220;
    oscillator2.type = 'sine';
    oscillator2.frequency.value = 329.63;
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    gainNode.gain.value = 0.05;
    oscillator1.start();
    oscillator2.start();
    musicOscillatorsRef.current = [oscillator1, oscillator2];
  };

  const stopAmbientMusic = () => {
    if (!musicPlaying) return;
    musicOscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
      } catch (e) {}
    });

    setMusicPlaying(false);
  };

  useEffect(() => {
    return () => {
      if (musicOscillatorsRef.current) {
        musicOscillatorsRef.current.forEach(osc => {
          try { osc.stop(); } catch (e) { }
        });
      }
    };
  }, []);
  // Bad trip mechanics
  const handleBadTripAction = () => {
    playSound('badTrip');
    setBadTripClicks(prev => {
      const newCount = prev + 1;
      addParticleEffect({
        x: 50 + Math.random() * 20 - 10,
        y: 60 + Math.random() * 20 - 10,
        color: 'blue'
      });
      if (newCount >= 5) {
        setMessage("Patient stabilized after the challenging experience. Difficult moments can lead to growth.");
        setScore(prevScore => {
          const pointsLost = Math.max(0, prevScore * 0.1);
          return Math.round(Math.max(0, prevScore - pointsLost));
        });
        setBadTripActive(false);
        setGameState('insights');
        const randomPerspectiveId = Math.floor(Math.random() * 4) + 1;
        const updatedPerspectives = newPerspectives.map(p =>
          p.id === randomPerspectiveId ? { ...p, strength: Math.min(p.strength + 10, 100) } : p
        );
        setNewPerspectives(updatedPerspectives);
        setTimeout(() => {
          setMessage("The challenge has deepened the patient's perspective: \"" +
            updatedPerspectives.find(
              (p) => p.id === randomPerspectiveId
            ).text + "\"");
        }, 3000);
        return 0;
      }
      return newCount;
    });
  };

  const triggerEurekaMoment = () => {
    if (eurekaActive) return;
    const randomX = 20 + Math.random() * 60;
    const randomY = 30 + Math.random() * 40;
    setEurekaPosition({ x: randomX, y: randomY });
    setEurekaActive(true);
    clearTimeout(eurekaTimeoutRef.current); // Clear any existing timeout
    eurekaTimeoutRef.current = setTimeout(() => {
      setEurekaActive(false);
    }, 5000);
  

    playSound('eureka');
  };

  const captureEurekaMoment = () => {
    if (eurekaTimeout) clearTimeout(eurekaTimeout);
    setEurekaTimeout(null);
    setScore(prevScore => prevScore + 150);
    setScoreMultiplier(prev => Math.min(prev + 0.5, 3.0));
    setShowMultiplierEffect(true);
    setTimeout(() => setShowMultiplierEffect(false), 2000);
    const randomPerspectiveId = Math.floor(Math.random() * 4) + 1;
    const updatedPerspectives = newPerspectives.map(p =>
      p.id === randomPerspectiveId ? { ...p, strength: Math.min(p.strength + 20, 100) } : p
    );
    setNewPerspectives(updatedPerspectives);
    for (let i = 0; i < 10; i++) {

      addParticleEffect(
        {
        x: eurekaPosition.x + Math.random() * 10 - 5,
        y: eurekaPosition.y + Math.random() * 10 - 5,
        color: 'gold'
      });
    }
    setEurekaActive(false);
    setMessage("Eureka! A powerful insight has reshaped the patient's perspective!");
    playSound('eureka');
  };

  // Obstacle challenge functions
  const handleObstacleClick = (id) => {
    setObstacles(prev => prev.filter(obstacle => obstacle.id !== id));
  };

  // Particle and fade-out effects
  const addParticleEffect = (particleProps) => {
    setParticleEffects((prevParticles) => {
      if (prevParticles.length >= 50) {
        return prevParticles; // Don't add more if limit reached
      }

      const newParticle = {
        id: Math.random().toString(36).substr(2, 9),
        x: particleProps.x,
        y: particleProps.y,
        color: particleProps.color || 'white',
        size: particleProps.size || 5,
        lifetime: 100, // Initial lifetime
        speedX: 0.2 + Math.random() * 0.2, // Slight rightward movement
        speedY: (Math.random() - 0.5) * 0.5, // Slight vertical variation
      };
      return [...prevParticles, newParticle];
    });
  };

  useEffect(() => {
    let animationFrameId;

    const updateParticles = () => {
      setParticleEffects((prevParticles) =>
        prevParticles.reduce((updatedParticles, particle) => {
          const updatedParticle = {
            ...particle,
            x: particle.x + particle.speedX,
            y: particle.y + particle.speedY,
            lifetime: particle.lifetime - 1,
          };

          // Apply fading effect as particle's lifetime decreases
          if (updatedParticle.lifetime > 0) {
            updatedParticles.push(updatedParticle);
          }

          return updatedParticles;
        }, [])
      );

      animationFrameId = requestAnimationFrame(updateParticles);
    };

    animationFrameId = requestAnimationFrame(updateParticles);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const addFadeOutPattern = (patternId) => {
    setFadeOutPatterns(prev => [...prev, patternId]);
    setTimeout(() => {
      setFadeOutPatterns(prev => prev.filter(id => id !== patternId));
    }, 1000);
  };

  // Updated conductSession: sometimes triggers obstacle challenge, bad trip, or insights.
  const conductSession = () => {
    playSound('button');
    setDefaultNetworkActivity(prev => Math.max(30, prev - 40));
    const updatedPerspectives = newPerspectives.map(p => ({ ...p, unlocked: true }));
    setNewPerspectives(updatedPerspectives);
    setScore(prev => prev + 100);
    if (Math.random() < 0.2) {
      setMessage("The patient is experiencing a challenging psychedelic experience. Help them calm down.");
      setBadTripActive(true);
      setBadTripClicks(0);
      setGameState('badTrip');
      setTripIntensity(Math.min(tripIntensity + 40, 100));
    } else {
      if (Math.random() < 0.5) {
        setGameState('challenge');
        setMessage("Negative thought obstacles appear! Clear them to progress.");
      } else {
        setGameState('insights');
        setMessage("DMN activity reduced! The patient's mind is more open. Engage with insights to advance your therapy.");
        setTimeRemaining(timeLimit); // Reset timer for insights phase
  
        // Eureka moment within insights
        setTimeout(() => {
          if (Math.random() < 0.7) {
            triggerEurekaMoment();
          }
        }, 5000 + Math.random() * 10000);
        }
    }
  };

  
  useEffect(() => {
    // This effect doesn't directly manage a timeout, so no cleanup is needed here.
    // The timeout is now handled within the conductSession function.
  }, [gameState]);

  // Updated processInsights: increments clicks and updates last click time.
  const processInsights = (insightId) => {
    playSound('insight');
  
    // Update the timestamp for the last insight click.
    lastInsightClickRef.current = Date.now();
  
    const basePoints = 25;
    const pointsToAdd = Math.round(basePoints * scoreMultiplier);
  
    // Increase the strength of the clicked insight.
    const updatedPerspectives = newPerspectives.map(p => 
      p.id === insightId ? { 
        ...p, 
        clicks: p.clicks + 1,
        strength: Math.min(p.strength + 10, 100)
      } : p
    );
    setNewPerspectives(updatedPerspectives);
  
    // Update the corresponding negative thought pattern.
    const updatedPatterns = thoughtPatterns.map(p => {
      if (p.id === insightId) {
        addFadeOutPattern(p.id);
        // Instead of subtracting a flat 15, subtract a diminishing amount.
        const decrement = Math.max(5, Math.floor(0.15 * p.strength));
        return { ...p, strength: Math.max(p.strength - decrement, 20) };
      }
      return p;
    });
    setThoughtPatterns(updatedPatterns);
  
    // Particle effects and score update remain unchanged.
    const insightElement = document.querySelector(`.insight-card[data-id="${insightId}"]`);
    if (insightElement) {
      const rect = insightElement.getBoundingClientRect();
      const gameContainer = document.querySelector('.game-container');
      const containerRect = gameContainer.getBoundingClientRect();
      const relativeX = ((rect.left + rect.width / 2) - containerRect.left) / containerRect.width * 100;
      const relativeY = ((rect.top + rect.height / 2) - containerRect.top) / containerRect.height * 100;
      for (let i = 0; i < 5; i++) {
        addParticleEffect({
          x: relativeX + Math.random() * 10 - 5,
          y: relativeY + Math.random() * 10 - 5,
          color: updatedPerspectives.find(p => p.id === insightId).color.replace('fill-', '')
        }

      );
      }
    }
    
    setScore(prev => prev + pointsToAdd);
    if (scoreMultiplier > 1) {
      setShowMultiplierEffect(true);
      setTimeout(() => setShowMultiplierEffect(false), 500);
    }
  
    if (updatedPerspectives.every(p => p.strength >= 70) && timeRemaining < (timeLimit / 2)) {
      setGameState('integration');
      setTimerActive(false);
      setMessage("Great work! All new perspectives are strong. Now integrate these insights into lasting change.");
      stopAmbientMusic();
    }
  };
  

  // Idle decay effect: subtract clicks and reduce strength/score when idle in 'insights'
  useEffect(() => {
    if (gameState === 'insights') {
      const idleInterval = setInterval(() => {
        const elapsed = Date.now() - lastInsightClickRef.current;
        if (elapsed > 50) {
          setNewPerspectives(prev =>
            prev.map(p => {
              if (p.unlocked && p.clicks > 0) {
                return { ...p, clicks: p.clicks - 1, strength: Math.max(p.strength - 5, 5) };
              }
              return p;
            })
          );
          setScore(prev => Math.max(prev - 10, 0));
        }
      }, 1000);
      return () => clearInterval(idleInterval);
    }
  }, [gameState]);

  const integrateExperience = async () => {
    playSound('button');
    setDefaultNetworkActivity(prev => Math.min(prev + 10, 70));
    const avgOldStrength = thoughtPatterns.reduce((sum, p) => sum + p.strength, 0) / thoughtPatterns.length;
    const avgNewStrength = newPerspectives.reduce((sum, p) => sum + p.strength, 0) / newPerspectives.length;
    setTherapyProgress(avgNewStrength);
    setRecoveryRate(100 - avgOldStrength);
    setScore(prev => prev + 200);

    // --- Save score to Firestore ---
    if (auth.currentUser) { // Check if user is logged in
      try {
        await addDoc(collection(db, "leaderboard"), {
          userId: auth.currentUser.uid,
          username: auth.currentUser.displayName || "Anonymous", // Get username, or use "Anonymous"
          score: score, // The score from the game
          timestamp: serverTimestamp() // Timestamp for when the score was saved
        });
        console.log("Score saved successfully!");
      } catch (error) {
        console.error("Error saving score: ", error);
      }
    } else {
      console.warn("User not logged in. Score not saved.");
    }
    setLevel(prev => prev + 1);
  };
  const proceedToNextLevel = () => {
    if (level < 3) {
        // Transition to the next session
        setGameState('session');
        setMessage(`Level ${level + 1}: The patient has integrated previous insights. Begin next psilocybin session.`);
        setChallengeLevel(prev => prev + 1);
    } else {
        // End of treatment, show results
        setGameState('results');
        setMessage("Treatment complete! Let's see how effective the therapy was in transforming thought patterns.");
    }
  };

  const { db, auth } = require('./firebase');








  // Game theme and sound
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    if (musicPlaying) { stopAmbientMusic(); }
  };

  // Custom Components
  const BrainNetwork = () => {
    return (
      <div className={`brain-container theme-${visualTheme}`}>
        {activeConnections.map(conn => (
          <React.Fragment key={conn.id}>
            <div 
              className={`connection ${conn.active ? 'active-connection' : ''}`}
              style={{
                left: `${conn.x1}%`,
                top: `${conn.y1}%`,
                width: `${Math.sqrt(Math.pow(conn.x2 - conn.x1, 2) + Math.pow(conn.y2 - conn.y1, 2))}%`,
                transform: `rotate(${Math.atan2(conn.y2 - conn.y1, conn.x2 - conn.x1)}rad)`
              }}
            ></div>
            <div className={`node ${conn.active ? 'active-node' : ''}`}
              style={{ left: `${conn.x1}%`, top: `${conn.y1}%` }}>
            </div>
            <div className={`node ${conn.active ? 'active-node' : ''}`}
              style={{ left: `${conn.x2}%`, top: `${conn.y2}%` }}>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  };

  const TripVisuals = () => {
    if (!tripVisuals) return null;
    return (
      <div 
        className={`trip-visuals ${badTripActive ? 'bad-trip-visuals' : ''}`} 
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
                opacity: 0.5 + (Math.random() * 0.5 * (tripIntensity / 100))
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

  const Cigarette = ({ burning, crossed, fading }) => (
    <div className={`cigarette ${burning ? 'burning' : ''} ${crossed ? 'crossed' : ''} ${fading ? 'fading' : ''}`}></div>
  );
  
  const Mushroom = ({ active }) => (
    <div className={`mushroom ${active ? 'active' : ''}`}>
      <div className="mushroom-cap"></div>
      <div className="mushroom-stem"></div>
    </div>
  );
  
  const ProgressSteps = () => {
    return (
      <div className="progress-step">
        <div className={`step-indicator ${level >= 1 ? 'completed' : ''}`}>1</div>
        <div className="step-connector"></div>
        <div className={`step-indicator ${level >= 2 ? 'completed' : ''}`}>2</div>
        <div className="step-connector"></div>
        <div className={`step-indicator ${level >= 3 ? 'completed' : ''}`}>3</div>
      </div>
    );
  };

  const ParticleEffects = () => (
    <div className="particle-container">
      {particleEffects.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            opacity: particle.lifetime / 100, // Fading effect
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        ></div>
      ))}
    </div>
  );

  // --- Render the game UI based on current state ---
  return (
    <div className={`game-container theme-${visualTheme}`}>
      {/* Trip visuals and particle effects */}
      <TripVisuals />
      <ParticleEffects />
      
      {/* Header */}
      <div className="game-header">
        <h1>Psilocybin Therapy Simulator</h1>
        <div className="game-controls">
          <button onClick={toggleSound} className="control-button">
            {soundEnabled ? "Mute" : "Unmute"}
          </button>
          <div className="theme-selector">
            <button onClick={() => changeVisualTheme('default')} className="theme-button default">Default</button>
            <button onClick={() => changeVisualTheme('calm')} className="theme-button calm">Calm</button>
            <button onClick={() => changeVisualTheme('intense')} className="theme-button intense">Intense</button>
          </div>
        </div>
      </div>
      
      {/* Game stats */}
      <div className="game-stats">
        <div className="stat-item">
          <div className="stat-label">Score</div>
          <div className={`stat-value ${showMultiplierEffect ? 'multiplier-active' : ''}`}>
            {score} {scoreMultiplier > 1 && <span className="multiplier">x{scoreMultiplier.toFixed(1)}</span>}
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Progress</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${therapyProgress}%` }}></div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Level</div>
          <ProgressSteps />
        </div>
      </div>
      
      {/* Main game content */}
      <div className="game-content">
        {gameState === 'intro' && (
          <div className="intro-screen">
            <h2>Welcome to Psilocybin Therapy Simulator</h2>
            <p>Explore the neuroscience behind psilocybin-assisted addiction therapy.</p>
            <p>Your role: Guide patients through transformative sessions to reshape thought patterns.</p>
            <div className="button-row">
              <button onClick={startTutorial} className="main-button">Start Tutorial</button>
              <button onClick={startTherapy} className="secondary-button">Skip to Therapy</button>
            </div>
          </div>
        )}
        
        {gameState === 'tutorial' && (
          <div className="tutorial-screen">
            <h2>Tutorial: Step {tutorialStep} of 5</h2>
            <p>{message}</p>
            <div className="tutorial-visual">
              {tutorialStep === 1 && <BrainNetwork />}
              {tutorialStep === 2 && (
                <div className="tutorial-dmt">
                  <Mushroom active={true} />
                  <div className="tutorial-brain">
                    <BrainNetwork />
                  </div>
                </div>
              )}
              {tutorialStep === 3 && (
                <div className="tutorial-insights">
                  <div className="thought-pattern">I need a cigarette to relax</div>
                  <div className="arrow-down">↓</div>
                  <div className="new-perspective">I can find healthier ways to relax</div>
                </div>
              )}
              {tutorialStep === 4 && (
                <div className="tutorial-badtrip">
                  <div className="bad-trip-icon">⚠️</div>
                  <button className="calm-button">Calm Patient</button>
                </div>
              )}
              {tutorialStep === 5 && (
                <div className="tutorial-eureka">
                  <div className="eureka-icon">💡</div>
                  <div className="tutorial-text">Click quickly!</div>
                </div>
              )}
            </div>
            <button onClick={nextTutorialStep} className="main-button">
              {tutorialStep < 5 ? "Next" : "Start Therapy"}
            </button>
          </div>
        )}
        
        {gameState === 'session' && (
          <div className="session-screen">
            <h2>Psilocybin Session: Level {level}</h2>
            <p>{message}</p>
            <div className="brain-section">
              <BrainNetwork />
              <div className="dmn-meter">
                <div className="meter-label">Default Mode Network Activity</div>
                <div className="meter-container">
                  <div className={`meter-fill ${defaultNetworkActivity > 70 ? 'high' : defaultNetworkActivity > 40 ? 'medium' : 'low'}`}
                       style={{ width: `${defaultNetworkActivity}%` }}>
                  </div>
                </div>
              </div>
            </div>
            <div className="thought-patterns">
              <h3>Current Thought Patterns</h3>
              <div className="pattern-cards">
                {thoughtPatterns.map(pattern => (
                  <div key={pattern.id} className={`pattern-card ${fadeOutPatterns.includes(pattern.id) ? 'fading' : ''}`} data-id={pattern.id}>
                    <div className="card-header">
                      <Cigarette burning={pattern.strength > 50} crossed={pattern.strength < 30} fading={fadeOutPatterns.includes(pattern.id)} />
                    </div>
                    <div className="card-text">{pattern.text}</div>
                    <div className="strength-meter">
                      <div className={`strength-fill ${pattern.color}`} style={{ width: `${pattern.strength}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={conductSession} className={`main-button ${showBounce ? 'bounce' : ''}`}>
              Administer Psilocybin
            </button>
          </div>
        )}
        
        {gameState === 'badTrip' && (
          <div className="bad-trip-screen">
            <h2>Challenging Experience</h2>
            <p>{message}</p>
            <div className="bad-trip-visuals">
              <div className="turbulent-mind"></div>
              <div className="distortion-effect"></div>
            </div>
            <div className="calm-down-container">
              <div className="bad-trip-meter">
                <div className="meter-fill" style={{ width: `${badTripClicks * 20}%` }}></div>
              </div>
              <button onClick={handleBadTripAction} className="calm-button">
                Provide Reassurance ({5 - badTripClicks} more needed)
              </button>
              <div className="calm-tips">
                <p>During challenging moments:</p>
                <ul>
                  <li>Create a calm environment</li>
                  <li>Provide gentle reassurance</li>
                  <li>Remind them the experience is temporary</li>
                  <li>Encourage acceptance</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {gameState === 'challenge' && (
          <div className="challenge-screen">
            <h2>Overcome Negative Patterns</h2>
            <p>{message}</p>
            <div className="obstacles-container">
              {obstacles.map(obstacle => (
                <div key={obstacle.id}
                     className="obstacle"
                     style={{ left: `${obstacle.x}%`, top: `${obstacle.y}%` }}
                     onClick={() => handleObstacleClick(obstacle.id)}>
                </div>
              ))}
            </div>
            <p>{obstacles.length === 0 ? "Challenge complete! Moving to new insights." : "Clear all obstacles to proceed."}</p>
          </div>
        )}
        
        {gameState === 'insights' && (
          <div className="insights-screen">
            <h2>Channel New Perspectives</h2>
            <p>{message}</p>
            {eurekaActive && (
              <div
                className="eureka-moment"
                style={{ left: `${eurekaPosition.x}%`, top: `${eurekaPosition.y}%` }}
                onClick={captureEurekaMoment}
              >
                <div className="eureka-icon">💡</div>
                <div className="eureka-timer">{eurekaTimer}s</div>
              </div>
            )}
            <div className="timer-bar">
              <div className="timer-label">Time Remaining:</div>
              <div className="timer-container">
                <div
                  className="timer-fill"
                  style={{ width: `${(timeRemaining / timeLimit) * 100}%` }}
                ></div>
              </div>
              <div className="timer-value">{timeRemaining}s</div>
            </div>
            <div className="insight-container">
              <div className="insight-grid">
                {newPerspectives.map(insight => (
                  <div
                    key={insight.id}
                    className={`insight-card ${insight.unlocked ? 'unlocked' : 'locked'}`}
                    data-id={insight.id}
                    onClick={() => insight.unlocked && processInsights(insight.id)}
                  >
                    <div className="card-text">{insight.text}</div>
                    <div className="strength-meter">
                      <div
                        className={`strength-fill ${insight.color} trippy`}
                        style={{ width: `${(insight.clicks / 10) * 100}%` }}
                      ></div>
                      <div className="click-count">Clicks: {insight.clicks}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="brain-mini">
              <BrainNetwork />
            </div>
          </div>
        )}
        
        {gameState === 'integration' && (
          <div className="integration-screen">
            <h2>Integration Phase</h2>
            
            <p>Level: {level}</p> {/* Display the current level */}
            
            <p>{message}</p>
            <div className="integration-visual">
              <div className="brain-changes">
                <BrainNetwork />
              </div>
              <div className="progress-summary">
                <div className="summary-item">
                  <div className="summary-label">Addiction Strength Reduced:</div>
                  <div className="summary-value">
                    {Math.round(100 - thoughtPatterns.reduce((sum, p) => sum + p.strength, 0) / thoughtPatterns.length)}%
                  </div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">New Perspectives Gained:</div>
                  <div className="summary-value">
                    {Math.round(newPerspectives.reduce((sum, p) => sum + p.strength, 0) / newPerspectives.length)}%
                  </div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">DMN Flexibility:</div>
                  <div className="summary-value">{Math.round(100 - defaultNetworkActivity)}%</div>
                </div>
              </div>
            </div>
            <button onClick={proceedToNextLevel} className="main-button">
              {level < 3 ? "Continue to Next Session" : "Complete Treatment"}
            </button>
          </div>
        )}
        
        {gameState === 'results' && (
          <div className="results-screen">
            <div className="results-comparison">
              <h2>Results: Before vs. After Treatment</h2>
              {initialThoughtPatterns.map(initialPattern => {
                const finalPattern = thoughtPatterns.find(p => p.id === initialPattern.id);
                return (
                  <div key={initialPattern.id} className="comparison-row">
                    <div className="pattern-text">{initialPattern.text}</div>
                    <div className="comparison-values">
                      <span className="before-value">Before: {initialPattern.strength}%</span> 
                      <span className="arrow">→</span>
                      <span className="after-value">After: {finalPattern.strength}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <h2>Treatment Results</h2>
            <div className="final-score">
              <div className="score-label">Final Score:</div>
              <div className="score-value">{score}</div>
            </div>
            <div className="results-summary">
              <div className="results-comparison">
                <h3>Thought Pattern Progress</h3>
                {initialThoughtPatterns.map(initialP => {
                  const finalP = thoughtPatterns.find(fp => fp.id === initialP.id);
                  return (
                    <div key={initialP.id} className="comparison-row">
                      <div className="comparison-pattern">
                        <div>{initialP.text}</div>
                        <div className="before-after">
                          <span className="before-value">{initialP.strength}%</span> 
                          <span className="arrow">→</span>
                          <span className="after-value">{finalP.strength}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <h3>New Perspectives:</h3>
              <div className="pattern-cards small">
                {newPerspectives.map(insight => (
                  <div key={insight.id} className="pattern-card">
                    <div className="card-text">{insight.text}</div>
                    <div className="strength-meter">
                      <div className={`strength-fill ${insight.color}`} style={{ width: `${insight.strength}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="educational-summary">
              <h3>About Psilocybin Therapy</h3>
              <p>Research suggests that psilocybin-assisted therapy can help treat addiction by:</p>
              <ul>
                <li>Temporarily reducing DMN activity to allow new connections</li>
                <li>Enabling patients to gain fresh perspectives on their addiction</li>
                <li>Creating opportunities for lasting insight and change</li>
                <li>Providing emotional breakthroughs that alter entrenched patterns</li>
              </ul>
              <p>This simulation is an educational tool—real therapy should be conducted by licensed professionals.</p>
            </div>
            <div className="button-row">
              <button onClick={resetGame} className="main-button">Play Again</button>
            </div>
          </div>
        )}
      </div>
      
      {/* Game message display */}
      <div className="game-message">{message}</div>
    </div>
  );
};

export default PsilocybinAddictionGame;
