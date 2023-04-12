import React from 'react';
import './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faMagic, faVoteYea } from '@fortawesome/free-solid-svg-icons';


const steps = [
  {
    title: 'Step 1: Receive Your Daily $WISH',
    description:
      'Each day, every Wisher is granted one $WISH. Make sure to claim your $WISH and contribute it to a Wishing Well or a Special Wishing Well for Common Good Initiatives.',
    link: '/claim-wish',
    buttonText: 'Claim Your $WISH',
    imageName: 'claim_wish.jpg',
    icon: faGift,
  },
  {
    title: 'Step 2: Genie DAOs Fulfill Wishes',
    description:
      'Genie DAOs apply to receive $WISH from Wishing Wells to fulfill Wishes or Common Good Initiatives. They create proposals that include GPI Lead and Lag Measures, and work towards fulfilling those Wishes.',
    link: '/genie-daos',
    buttonText: 'View Genie DAOs',
    imageName: 'genie_daos.jpg',
    icon: faMagic,
  },
  {
    title: 'Step 3: Wishers Vote and Allocate $WISH',
    description:
      'Wishers vote on Genie DAO proposals and grant $WISH to the chosen Genie DAOs. They also have the power to make rules and regulations for the proper administration of the Wishocratic Government.',
    link: '/vote',
    buttonText: 'Vote Now',
    imageName: 'vote.jpg',
    icon: faVoteYea,
  },
];

const HowItWorks = () => {
  return (
    <div className="how-it-works-container">
      <h2>How It Works</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <img
              src={`/images/${step.imageName}`}
              alt={step.title}
              className="step-image"
            />
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <a href={step.link} className="step-button">
              <FontAwesomeIcon icon={step.icon} className="icon" /> {step.buttonText}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
