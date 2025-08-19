import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Credits & Acknowledgments */}
          <div>
            <h4 className="text-white font-semibold mb-4" data-testid="text-credits-header">
              Credits & Acknowledgments
            </h4>
            <div className="space-y-2 text-sm">
              <p>• AI4Bharat for IndicTrans2</p>
              <p>• OpenAI for Whisper API</p>
              <p>• Indian Meteorological Department</p>
              <p>• Open-source agricultural datasets</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4" data-testid="text-contact-header">
              Contact Information
            </h4>
            <div className="space-y-2 text-sm">
              <p className="flex items-center" data-testid="text-email">
                <Mail className="mr-2" size={16} />
                support@agentkrishi.in
              </p>
              <p className="flex items-center" data-testid="text-phone">
                <Phone className="mr-2" size={16} />
                +91-XXXX-XXXXXX
              </p>
              <p className="flex items-center" data-testid="text-location">
                <MapPin className="mr-2" size={16} />
                Bangalore, India
              </p>
            </div>
          </div>

          {/* Sponsor Logos */}
          <div>
            <h4 className="text-white font-semibold mb-4" data-testid="text-sponsors-header">
              Hackathon Partners
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {["TechCorp", "AI Labs", "FarmTech", "GreenAI"].map((sponsor, index) => (
                <div key={index} className="bg-white rounded-lg p-3 flex items-center justify-center" data-testid={`logo-sponsor-${index}`}>
                  <span className="text-gray-800 text-xs font-medium">{sponsor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-6" data-testid="disclaimer">
            <div className="flex items-start space-x-3">
              <span className="text-yellow-400 mt-1">⚠️</span>
              <div>
                <h5 className="text-yellow-400 font-medium mb-1">Important Disclaimer</h5>
                <p className="text-yellow-200 text-sm">
                  This is advisory information only. Please verify recommendations with local agricultural experts 
                  and extension officers before implementing any farming practices. AgentKrishi is not responsible 
                  for any losses due to reliance on this information.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p data-testid="text-copyright">&copy; 2024 AgentKrishi. Built for Indian farmers with ❤️</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-agri-green transition-colors" data-testid="link-privacy">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-agri-green transition-colors" data-testid="link-terms">
                Terms of Service
              </a>
              <a href="#" className="hover:text-agri-green transition-colors" data-testid="link-opensource">
                Open Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
