'use client';

import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is TIS-News?',
    answer:
      'TIS-News is a reliable news platform dedicated to delivering the latest local and global news with accuracy and integrity.',
  },
  {
    question: 'How often is the news updated?',
    answer: 'We update our news content multiple times a day to keep you informed on the latest developments.',
  },
  {
    question: 'Can I contribute news or stories?',
    answer:
      'Yes! We welcome contributions from our readers. Please contact us at tisnews3482@gmail.com to learn more.',
  },
  {
    question: 'How can I contact customer support?',
    answer: 'You can reach us by email at tisnews3482@gmail.com or call us at 01853505787.',
  },
];

const AboutPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-5xl bg-white rounded-3xl shadow-xl p-10 md:p-16 space-y-14">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-5xl font-extrabold text-[#0896EF] mb-6">About TIS-News</h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed mb-4">
            Welcome to <span className="font-semibold">TIS-News</span>, your trusted source for up-to-date, factual, and
            insightful news coverage. Our team is committed to bringing you accurate news, in-depth stories, and
            reliable information from Bangladesh and around the world.
          </p>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Whether it’s politics, business, technology, sports, or entertainment, TIS-News strives to keep you informed and engaged.
          </p>
        </header>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-[#0896EF] mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To empower our readers with truthful, unbiased news and thoughtful analysis that helps them understand
              the world better and make informed decisions.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#0896EF] mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To become Bangladesh’s most trusted and widely-read news platform by consistently providing
              transparent, timely, and high-quality journalism.
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-[#0896EF] mb-6">Contact Us</h2>
          <p className="text-gray-700 mb-2">
            Questions? Suggestions? Reach out anytime:
          </p>
          <p className="text-gray-700 mb-1">
            Email: <a href="mailto:tisnews3482@gmail.com" className="text-[#0896EF] font-semibold hover:underline">tisnews3482@gmail.com</a>
          </p>
          <p className="text-gray-700">
            Phone: <span className="font-semibold">01853505787</span>
          </p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-bold text-[#0896EF] mb-6 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqData?.map(({ question, answer }, idx) => (
              <div key={idx} className="border rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-4 text-left text-lg font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 focus:outline-none flex justify-between items-center"
                >
                  <span>{question}</span>
                  <span className="text-2xl font-bold">
                    {activeIndex === idx ? '-' : '+'}
                  </span>
                </button>
                {activeIndex === idx && (
                  <div className="px-6 py-4 text-gray-700 bg-white border-t">{answer}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
