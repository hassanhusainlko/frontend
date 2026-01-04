import about_us from "/about_us.png";

export default function About() {
  return (
    <>
      <div className="w-full px-4 md:px-8 my-10">
        {/* ---------------------- ABOUT US SECTION ---------------------- */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
          {/* Text Section */}
          <div className="lg:w-2/3 w-full">
            <div className="bg-white shadow-sm rounded-xl p-6">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <i className="fa-solid fa-check-to-slot mr-2"></i> About Us
              </h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                We at texscript.com provide professional typesetting services,
                specializing in LaTeX for scientific documents such as research
                papers, articles, theses, dissertations, and more. LaTeX is the
                preferred choice for standard and reputable publishers, and our
                expertise ensures your document is prepared efficiently and
                accurately.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Whether you are a researcher, student, or professional, we offer
                time- and cost-efficient typesetting solutions tailored to your
                needs.
              </p>

              <h3 className="text-2xl font-semibold mt-6 flex items-center">
                <i className="fa-solid fa-check-to-slot mr-2"></i> Our Services
              </h3>

              <h5 className="text-lg font-medium mb-2">
                We specialize in the following typesetting services:
              </h5>

              <ul className="list-disc ml-6 space-y-1 text-gray-700">
                <li>Research papers</li>
                <li>Articles</li>
                <li>Theses and dissertations</li>
                <li>Books and manuals</li>
              </ul>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/3 w-full">
            <img
              src={about_us}
              alt="About Us"
              className="rounded-xl w-full h-[350px] object-cover shadow-md"
            />
          </div>
        </div>

        {/* ---------------------- WHY US SECTION ---------------------- */}
        <div className="bg-gray-100 py-10 rounded-xl">
          <div className="px-4 md:px-8">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <i className="fa-solid fa-check-to-slot mr-2"></i> Why Choose Us?
            </h3>

            <p className="font-semibold text-gray-800">
              We understand the challenges you may face when typesetting
              documents in LaTeX, such as:
            </p>

            <ul className="mt-4 ml-6 list-disc text-gray-700 space-y-2">
              <li>Lack of time due to other engagements.</li>
              <li>A preference to focus on more creative tasks.</li>
              <li>Limited technical knowledge of LaTeX.</li>
            </ul>

            <p className="mt-6 text-gray-700">
              Whatever the reason, we are here to provide expert typesetting
              services promptly and at a competitive cost.
            </p>

            <p className="mt-4 font-semibold text-gray-800">
              Here’s why you should choose us for your typesetting needs:
            </p>

            <ol className="list-decimal ml-6 space-y-4 mt-4 text-gray-700">
              <li>
                <p>
                  <b>Expert Typesetters:</b> Our team consists of subject
                  experts skilled in mathematics, symbols, notations, and
                  operators, ensuring accuracy and professionalism.
                </p>
              </li>

              <li>
                <p>
                  <b>Timely Delivery:</b> We are committed to delivering your
                  typeset document in the required format within the agreed
                  timeline.
                </p>
              </li>

              <li>
                <p>
                  <b>Confidentiality:</b> Your content’s privacy is our top
                  priority. Documents are divided among team members for typing
                  and compiled securely by our core team to maintain
                  confidentiality.
                </p>
              </li>

              <li>
                <p>
                  <b>Data Security:</b> After successful delivery, all your
                  documents are securely erased from our systems. For further
                  assistance, you can always reach us via email at
                  <span className="font-semibold"> support@texscript.com</span>.
                </p>
              </li>
            </ol>

            <div className="mt-10">
              <div className="flex items-center justify-center p-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600">
                <h4 className="text-white font-bold text-lg text-center">
                  Here you’ll find online Typing Services as per your Needs!
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
