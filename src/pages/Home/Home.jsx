import React from "react";
import HeroBanner from "./HeroBanner/HeroBanner";
import AvailableLoans from "./AvailableLoans/AvailableLoans";
import HowItWorks from "./HowItWorks/HowItWorks";
import CustomerFeedback from "./CustomerFeedback/CustomerFeedback";
import LoanCalculator from "./LoanCalcualtor/LoanCalculator";
import FAQSection from "./FAQSection/FAQSection";
import TrustedSecurity from "./TrustedSecurity/TrustedSecurity";
import WhyChooseLoanLink from "./WhyChooseLoanLink/WhyChooseLoanLink";
import EligibilityChecker from "./EligibilityChecker/EligibilityChecker";
import CallToAction from "./CallToAction/CallToAction";

const Home = () => {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <TrustedSecurity></TrustedSecurity>
      <WhyChooseLoanLink></WhyChooseLoanLink>
      <AvailableLoans></AvailableLoans>
      <EligibilityChecker></EligibilityChecker>
      <HowItWorks></HowItWorks>
      <CustomerFeedback></CustomerFeedback>
      <LoanCalculator></LoanCalculator>
      <FAQSection></FAQSection>
      <CallToAction></CallToAction>
    </div>
  );
};

export default Home;

