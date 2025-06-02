/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";

const TermsOfUsePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-5xl bg-white rounded-3xl shadow-xl p-10 md:p-16 space-y-10">
        <h1 className="text-5xl font-extrabold text-[#0896EF] text-center mb-8">
          Terms of Use
        </h1>

        <section>
          <h2 className="text-3xl font-bold text-[#0896EF] mb-4">
            Acceptance of Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing and using{" "}
            <span className="font-semibold">TIS-News</span>, you agree to comply
            with and be bound by these Terms of Use. If you do not agree with
            these terms, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#0896EF] mb-4">
            Use of Content
          </h2>
          <p className="text-gray-700 leading-relaxed">
            All content provided on TIS-News is for informational purposes only.
            You may view, download, and print content for personal use, but you
            may not reproduce, distribute, or modify it without our prior
            written permission.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#0896EF] mb-4">
            User Conduct
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You agree not to use the website for any unlawful purpose or in a
            way that could damage, disable, or impair the website’s
            functionality. You are responsible for all content you submit or
            share on our platform.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#0896EF] mb-4">
            Disclaimer of Warranties
          </h2>
          <p className="text-gray-700 leading-relaxed">
            TIS-News provides content "as is" without warranties of any kind. We
            do not guarantee the accuracy, completeness, or reliability of the
            content and disclaim all liability for errors or omissions.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#0896EF] mb-4">
            Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Under no circumstances shall TIS-News be liable for any damages
            arising from your use of the website or reliance on its content.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#0896EF] mb-4">
            Changes to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these Terms of Use at any time.
            Changes will be effective immediately upon posting to this page.
            Continued use of the website after changes constitutes your
            acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#0896EF] mb-4">
            Contact Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            For any questions about these Terms of Use, please contact us at{" "}
            <a
              href="mailto:tisnews3482@gmail.com"
              className="text-[#0896EF] font-semibold hover:underline"
            >
              tisnews3482@gmail.com
            </a>
            .
          </p>
        </section>

        <section className="text-center text-gray-600 text-sm mt-10">
          &copy; {new Date().getFullYear()} TIS-News. All rights reserved.
        </section>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
