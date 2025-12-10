import React from 'react';
import HeroBanner from './HeroBanner/HeroBanner';
import AvailableLoans from './AvailableLoans/AvailableLoans';
import HowItWorks from './HowItWorks/HowItWorks';
import CustomerFeedback from './CustomerFeedback/CustomerFeedback';
import LoanCalculator from './LoanCalcualtor/LoanCalculator';
import FAQSection from './FAQSection/FAQSection';

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <AvailableLoans></AvailableLoans>
            <HowItWorks></HowItWorks>
            <CustomerFeedback></CustomerFeedback>
            <LoanCalculator></LoanCalculator>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;