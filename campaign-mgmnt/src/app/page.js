import Link from "next/link";

export default function Home() {
  return (
    <>
      <nav className="bg-gray-200 text-white w-full p-4">
        {/* Header Section */}
        <header className="bg-green-500 text-white p-4 rounded-md shadow-lg m-5 mt-0">
          <h1 className="text-3xl font-bold text-center">Welcome to Realm</h1>
          <p className="mt-2 text-center text-lg">
            Your very own customer relations and campaign management platform
          </p>
        </header>
      </nav>
      {/* Call to Action Section */}
      <div className="min-h-fit bg-gray-100 p-6 w-full">
        <section className="mt-8 flex flex-col items-center mb-4 p-5 rounded-md">
          <p className="text-gray-700 text-lg font-semibold text-center mb-4">
            Start managing your customers and campaigns today with ease!
          </p>
          <div className="flex space-x-4 m-5">
            <Link
              href="/login"
              className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-blue-700"
            >
              Login
            </Link>
            <Link href="/dashboard"
              className="bg-green-500 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-green-600"
            >
              Dashboard
            </Link>
          </div>
        </section>
      </div>
      <div className="min-h-fit bg-gray-100 p-6 w-full">

        {/* Core Features Section */}
        <section className="bg-white p-6 rounded-md shadow-md space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Core Features</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>
              <span className="font-semibold">Customer Management:</span> Easily
              create, update, and manage customer profiles. Segregate customers
              based on demographics and engagement levels.
            </li>
            <li>
              <span className="font-semibold">Bulk Order Processing:</span>{" "}
              Process bulk orders with minimal downtime, real-time tracking, and
              built-in validations.
            </li>
            <li>
              <span className="font-semibold">Campaign Creation:</span> Design
              personalized marketing campaigns with predefined templates and
              customizations.
            </li>
            <li>
              <span className="font-semibold">Campaign Sending:</span> Send
              campaigns with proper validations, schedule them, and track
              performance metrics.
            </li>
          </ul>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-200 p-6 rounded-md shadow-md mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold text-gray-800">How do I add customers?</h3>
              <p className="text-gray-700">
                Create detailed customer profiles with essential details by navigating to the "Add Customers" section in the dashboard.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">How can I segment customers?</h3>
              <p className="text-gray-700">
                Use filters and tags to group customers for targeted outreach. Go to the "Segment Customers" section to get started.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">How do I process bulk orders?</h3>
              <p className="text-gray-700">
                Ensure smooth handling of high-volume orders by using the "Process Bulk Orders" feature in the dashboard.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">How can I launch campaigns?</h3>
              <p className="text-gray-700">
                Create, schedule, and send campaigns that align with your marketing goals by accessing the "Launch Campaigns" section.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">How do I measure success?</h3>
              <p className="text-gray-700">
                Access real-time analytics to refine your strategies by visiting the "Measure Success" section in the dashboard.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
