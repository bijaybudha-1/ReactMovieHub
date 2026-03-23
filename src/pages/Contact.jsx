export default function Contact() {
  return (
    <div className="pt-[72px] min-h-screen bg-bg-primary">
      <section className="bg-bg-secondary border-b border-border-color pt-16 pb-12">
        <div className="container-custom">
          <h1 className="text-4xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
          {/* Form */}
          <div className="bg-bg-card border border-border-color rounded-2xl p-10 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors"></div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 relative z-10">
              <i className="bx bx-paper-plane text-primary"></i> Send a Message
            </h2>
            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-secondary">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-bg-input border border-border-color rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors text-sm"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-secondary">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-bg-input border border-border-color rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors text-sm"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-secondary">Subject</label>
                <select className="w-full bg-bg-input border border-border-color rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors text-sm appearance-none cursor-pointer">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Content Correction</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-secondary">Message</label>
                <textarea 
                  className="w-full bg-bg-input border border-border-color rounded-lg px-4 py-3 outline-none focus:border-primary transition-colors text-sm min-h-[150px] resize-none"
                  placeholder="How can we help?"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-full md:w-auto px-10">
                Submit Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-bg-card border border-border-color rounded-2xl p-8 hover:border-primary transition-colors">
              <h3 className="text-xl font-bold mb-6">Our Information</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xl">
                    <i className="bx bx-map"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Location</h4>
                    <p className="text-text-secondary text-sm">Kathmandu, Nepal</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xl">
                    <i className="bx bx-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Email</h4>
                    <p className="text-text-secondary text-sm">contact@moviehub.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xl">
                    <i className="bx bx-phone"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Phone</h4>
                    <p className="text-text-secondary text-sm">+977 123 456 7890</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-bg-card border border-border-color rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-xl bg-glass-bg border border-border-color flex items-center justify-center text-2xl hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1 transition-all">
                  <i className="bx bxl-twitter"></i>
                </a>
                <a href="#" className="w-12 h-12 rounded-xl bg-glass-bg border border-border-color flex items-center justify-center text-2xl hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1 transition-all">
                  <i className="bx bxl-instagram"></i>
                </a>
                <a href="#" className="w-12 h-12 rounded-xl bg-glass-bg border border-border-color flex items-center justify-center text-2xl hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1 transition-all">
                  <i className="bx bxl-facebook"></i>
                </a>
                <a href="#" className="w-12 h-12 rounded-xl bg-glass-bg border border-border-color flex items-center justify-center text-2xl hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1 transition-all">
                  <i className="bx bxl-github"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
