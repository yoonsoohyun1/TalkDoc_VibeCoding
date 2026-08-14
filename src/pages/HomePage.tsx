import { HeroSection } from '../intro/HeroSection'
import { HowItWorksSection } from '../intro/HowItWorksSection'
import { HospitalComparisonSection } from '../intro/HospitalComparisonSection'
import { LiveDoctorsSwiper } from '../intro/LiveDoctorsSwiper'
import { ReviewsSection } from '../intro/ReviewsSection'
import { QuickConsultFormSection } from '../intro/QuickConsultFormSection'
import { PrescriptionSection } from '../intro/PrescriptionSection'
import { FAQSection } from '../intro/FAQSection'



export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <HospitalComparisonSection />
      <LiveDoctorsSwiper />
      <ReviewsSection />
      <QuickConsultFormSection />
      <PrescriptionSection />
      <FAQSection />
    </>
  )
}
