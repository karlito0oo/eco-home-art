import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const productInquiry = searchParams.get('product');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: productInquiry ? `I would like to inquire about ${productInquiry}` : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = productInquiry 
      ? `Product Inquiry: ${productInquiry}`
      : 'Contact Form Submission';
      
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}
    `.trim();

    window.location.href = `mailto:info.alphaddsi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="container mx-auto px-4 pb-10" style={{paddingTop: "120px"}}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Contact Information */}
          <div className="bg-green-800 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-700 rounded-full transform translate-x-32 -translate-y-32 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-700 rounded-full transform -translate-x-32 translate-y-32 opacity-20"></div>
            
            <div className="relative">
              <div className="mb-16 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <img src="/alpha-logo.png" alt="Alpha Logo" className="w-32 h-32 object-contain" />
                  </div>
                </div>
                <h2 className="text-2xl font-medium mb-8">Alpha Distinct Development Solutions Inc</h2>
                <div className="text-center">
                  <h1 className="text-2xl font-bold tracking-wide">WE CUSTOMIZE!</h1>
                </div>
              </div>
              
              <div className="space-y-12">
                <div>
                  <h2 className="text-3xl font-bold mb-8">CONTACT US</h2>
                  
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-700/50 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-lg">+63 2 8876 7285</p>
                        <p className="font-medium text-lg">+63 995 324 3922</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-green-700/50 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="font-medium text-lg">info.alphaddsi@gmail.com</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-green-700/50 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="font-medium text-lg">
                        17 Valencia St., Susana Heights Subd.,<br />
                        Tunasan Muntinlupa City, Philippines 1774
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-6">FOLLOW US</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-xl">
                      <img src="/sample-qr.png" alt="QR Code" className="w-full" />
                      <p className="text-green-800 text-center mt-3 font-semibold">Facebook</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl">
                      <img src="/sample-qr.png" alt="QR Code" className="w-full" />
                      <p className="text-green-800 text-center mt-3 font-semibold">Instagram</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              {productInquiry ? 'Product Inquiry' : 'Send us a message'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-green-800 transition-all"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-green-800 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-green-800 transition-all"
                  placeholder="+63 XXX XXX XXXX"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-green-800 transition-all"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-800 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 