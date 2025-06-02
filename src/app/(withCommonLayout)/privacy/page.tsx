
'use client';

import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-5xl bg-white rounded-3xl shadow-xl p-10 md:p-16 space-y-10">
        <h1 className="text-5xl font-extrabold text-[#0896EF] text-center mb-8">
          Privacy Policy
        </h1>

        <section>
          <h2 className="text-3xl font-bold text-[#0896EF] mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            At <span className="font-semibold">TIS-News</span>, your privacy is important to us.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#0896EF] mb-4">Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li>Personal identification information (Name, email address, phone number, etc.) when you contact us.</li>
            <li>Non-personal information such as browser type, device information, and browsing behavior.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#0896EF] mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li>Provide, operate, and maintain our website.</li>
            <li>Respond to your inquiries and provide customer support.</li>
            <li>Improve our website and personalize user experience.</li>
            <li>Send periodic emails and updates, if you opt-in.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#0896EF] mb-4">Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement reasonable security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#0896EF] mb-4">Your Rights</h2>
          <p className="text-gray-700 leading-relaxed">
            You have the right to access, correct, or delete your personal information held by us. Please contact us at{' '}
            <a href="mailto:tisnews3482@gmail.com" className="text-[#0896EF] font-semibold hover:underline">
              tisnews3482@gmail.com
            </a>{' '}
            to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#0896EF] mb-4">Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated effective date.
          </p>
        </section>

        <section className="text-center text-gray-600 text-sm mt-10">
          &copy; {new Date().getFullYear()} TIS-News. All rights reserved.
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
