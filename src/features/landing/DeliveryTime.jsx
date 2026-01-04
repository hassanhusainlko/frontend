export default function DeliveryTimeTable() {
  return (
    <>
      <div className="w-full mb-8 px-4 md:px-8">
        <h4 className="text-xl font-bold mt-6 mb-6 flex items-center">
          <i className="fa-solid fa-check-to-slot mr-2"></i>
          Delivery Time We Offer
        </h4>

        {/* Table Wrapper */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
          <table className="w-full border border-gray-300 text-center text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr className="font-semibold text-gray-700">
                <th className="border border-gray-300 p-3"></th>
                <th className="border border-gray-300 p-3">Number of Pages</th>
                <th className="border border-gray-300 p-3">Priority</th>
                <th className="border border-gray-300 p-3">Delivery Time*</th>
                <th className="border border-gray-300 p-3">Number of Pages</th>
                <th className="border border-gray-300 p-3">Delivery Time*</th>
              </tr>
            </thead>

            <tbody>
              {/* Normal Days */}
              <tr>
                <td
                  rowSpan="2"
                  className="border border-gray-300 p-3 align-middle"
                >
                  During Normal Days
                </td>

                <td
                  rowSpan="4"
                  className="border border-gray-300 p-3 align-middle"
                >
                  Up to 30 Pages
                </td>

                <td className="border border-gray-300 p-3">Regular</td>
                <td className="border border-gray-300 p-3">
                  3-4 Business Days
                </td>

                <td
                  rowSpan="4"
                  className="border border-gray-300 p-3 align-middle"
                >
                  More than 30
                </td>

                <td
                  rowSpan="4"
                  className="border border-gray-300 p-3 align-middle"
                >
                  In such cases delivery time shall be decided by mutual
                  agreement via email communication
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 p-3">Urgent</td>
                <td className="border border-gray-300 p-3">
                  1-2 Business Days
                </td>
              </tr>

              {/* Peak Days */}
              <tr>
                <td
                  rowSpan="2"
                  className="border border-gray-300 p-3 align-middle"
                >
                  During Peak Days
                </td>

                <td className="border border-gray-300 p-3">Regular</td>
                <td className="border border-gray-300 p-3">
                  4-7 Business Days
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 p-3">Urgent</td>
                <td className="border border-gray-300 p-3">
                  2-3 Business Days
                </td>
              </tr>

              {/* Footer Row */}
              <tr className="bg-white">
                <td
                  colSpan="6"
                  className="border border-gray-300 p-4 text-gray-700"
                >
                  Delivery Time is the time between the payment of Token Amount
                  and supply of First Draft.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
