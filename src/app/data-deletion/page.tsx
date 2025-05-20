// src/app/data-deletion/page.tsx

export default function DataDeletionPage() {
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Data Deletion Instructions</h1>
      <p className="text-base leading-relaxed">
        If you want to delete your data from our system, please follow the instructions below:
      </p>
      <ul className="list-disc list-inside my-4 text-base">
        <li>Send an email to <strong>support@yourdomain.com</strong> with the subject <em>"Data Deletion Request"</em>.</li>
        <li>Mention your registered email address used for Facebook login.</li>
        <li>We will process and confirm your data deletion within 7 working days.</li>
      </ul>
      <p className="text-sm text-gray-500">Thank you for using our service.</p>
    </main>
  );
}
