import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="flex justify-center space-x-6 mt-8">
      {/* Facebook */}
      <a
        href="https://www.facebook.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 text-2xl"
      >
        <FaFacebook />
      </a>

      {/* Twitter */}
      <a
        href="https://twitter.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-600 text-2xl"
      >
        <FaTwitter />
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-600 hover:text-pink-800 text-2xl"
      >
        <FaInstagram />
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-900 text-2xl"
      >
        <FaLinkedin />
      </a>

      {/* YouTube */}
      <a
        href="https://www.youtube.com/c/yourchannel"
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-600 hover:text-red-800 text-2xl"
      >
        <FaYoutube />
      </a>
    </div>
  );
};

export default SocialMedia;
