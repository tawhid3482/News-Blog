const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10 border-t">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div>
          <h2 className="text-xl font-semibold mb-4">TIS-News</h2>
          <p className="text-gray-400 text-sm">
            Stay informed with the latest headlines from around the world. Your trusted source for breaking news, in-depth analysis, and expert opinion.
          </p>
        </div>

        {/* Center Column */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition">Terms of Use</a></li>
          </ul>
        </div>

        {/* Right Column */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-[#0896EF] hover:bg-blue-600 text-white px-4 py-2 rounded font-medium transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} News-Blog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;