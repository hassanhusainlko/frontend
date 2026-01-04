import howWeWorkImage from "/how_we_work.png";

export default function HowWeWork() {
  return (
    <section className="w-full px-4 md:px-8 my-10">
      {/* Main How We Work */}
      <div className="flex flex-col lg:flex-row items-start gap-8 mb-10">
        {/* Content */}
        <div className="lg:w-2/3 w-full">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <i className="fa-solid fa-check-to-slot mr-2"></i>
            How We Work
          </h3>

          <div className="prose prose-sm md:prose-base max-w-none">
            <div className="pl-0 md:pl-2">
              <h5 className="text-lg font-semibold mt-2 flex items-center">
                <i className="fa-solid fa-check-to-slot mr-2"></i>
                Placing an Order
              </h5>
              <p>
                A client has to Login (register) on our website{" "}
                <a
                  href="https://www.texscript.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  www.texscript.com
                </a>{" "}
                and Upload Document by providing the following information:
              </p>
              <ul className="ml-5 list-disc">
                <li>Name of Document</li>
                <li>Service Type</li>
                <li>Tentative Number of Pages</li>
                <li>Any other additional instructions</li>
              </ul>

              <h5 className="text-lg font-semibold mt-4 flex items-center">
                <i className="fa-solid fa-check-to-slot mr-2"></i>
                Reviewing Order Details by Admin
              </h5>
              <p>
                We review the order and make corrections in the details (like
                number of pages, service type, etc.) provided by the client, if
                necessary.
              </p>

              <h5 className="text-lg font-semibold mt-4 flex items-center">
                <i className="fa-solid fa-check-to-slot mr-2"></i>
                Acceptance of Corrections
              </h5>
              <p>
                A client either accepts or rejects the corrections made by
                admin. In case the client accepts the corrections, they will
                have to pay a “Token Amount,” which indicates the admin to start
                working on the project.
              </p>

              <h5 className="text-lg font-semibold mt-4 flex items-center">
                <i className="fa-solid fa-check-to-slot mr-2"></i>
                First Draft
              </h5>
              <p>
                Admin will upload the “First Draft” for proof-reading and
                checking for any errors or deviations from instructions provided
                at the time of uploading the document. The client either asks us
                for corrections or finalizes the First Draft.
              </p>

              <h5 className="text-lg font-semibold mt-4 flex items-center">
                <i className="fa-solid fa-check-to-slot mr-2"></i>
                Final Document
              </h5>
              <p>
                After incorporating the client’s suggestions, the admin will
                upload the Final Document.
              </p>

              <h5 className="text-lg font-semibold mt-4 flex items-center">
                <i className="fa-solid fa-check-to-slot mr-2"></i>
                Payment of Remaining Amount
              </h5>
              <p>
                After viewing the “Final Document,” the client pays the
                remaining amount.
              </p>

              <h5 className="text-lg font-semibold mt-4 flex items-center">
                <i className="fa-solid fa-check-to-slot mr-2"></i>
                Delivery of Final Project
              </h5>
              <p>
                After verifying the payment of the remaining amount, the admin
                uploads the Final Project for the client to download.
              </p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="lg:w-1/3 w-full flex-shrink-0">
          <img
            src={howWeWorkImage}
            alt="How We Work"
            className="w-full h-[320px] md:h-[380px] object-cover rounded-xl shadow-md"
          />
        </div>
      </div>

      {/* Referral Program */}
      <div className="w-full bg-gray-100 rounded-xl p-6">
        <div className="max-w-5xl mx-auto">
          <h5 className="text-lg font-semibold mb-3 flex items-center">
            <i className="fa-solid fa-check-to-slot mr-2"></i>
            Referral Program
          </h5>

          <p>
            We provide a Referral Bonus to every user, which can be accessed by
            clicking on “My Referral Bonus.” The amount earned by the user is
            credited to “My Referral Bonus.” A user can use their earned bonus
            amount while paying on the website. The detailed policy of our
            referral program is as follows:
          </p>

          <ul className="mt-3 ml-5 list-disc space-y-2">
            <li>
              When a new user (“Referred User”) registers with our website using
              a Referral Code of any existing user (“Referrer”), the “Referrer”
              gets a bonus amount of 10% of the first completed project of the
              new user.
            </li>
            <li>
              The website reserves all rights to change, modify, or remove the
              above-given percentage at any time without prior notice or
              consent.
            </li>
            <li>
              The Referral Bonus will be credited only after the completion of
              the first project of the “Referred User.” No bonus will be given
              to the “Referrer” from subsequent projects of the “Referred User.”
            </li>
            <li>
              A user can use a maximum of 25% of the total available “Referral
              Bonus” in one project.
            </li>
            <li>
              This referral program can be changed, modified, or ended at any
              time without prior notice or consent. However, the “Referral
              Bonus” earned before can still be used by the user.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
