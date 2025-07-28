// import React from 'react';
// import CompletedPaymentsPage from './CompletedPaymentsPage';

// const PendingPaymentsPage = () => {
//   // tumhara poora existing code yahan hoga including completedPayments state

//   return (
//     <div className="table-container">
//       <h2>Completed Payments</h2>
//       <table className="styled-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Lost Item</th>
//             <th>Found Item</th>
//             <th>Category</th>
//             <th>Status</th>
//             <th>Amount</th>
//             <th>Payer</th>
//             <th>Is Paid</th>
//             <th>Transaction ID</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length > 0 ? (
//             data.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.id}</td>
//                 <td>{item.lost_item?.name || '-'}</td>
//                 <td>{item.found_item?.name || '-'}</td>
//                 <td>{item.found_item?.category || '-'}</td>
//                 <td>{item.status}</td>
//                 <td>₹{item.amount}</td>
//                 <td>{item.payer?.name}</td>
//                 <td>{item.is_paid ? 'Yes' : 'No'}</td>
//                 <td>{item.transaction_id || '-'}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="9">No completed payments</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// export default PendingPaymentsPage;


// import React from 'react'

// function Coplete_pay() {
//   return (
//     <div>
//       Coplete_pay
//       Coplete_pay
//     </div>
//   )
// }

// export default Coplete_pay
import React, { useEffect, useState } from 'react';
import  "./Complete_pay.css"

function CompletePay() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch(`http://localhost:8000/paymentsList-complete/`);
      const data = await res.json();
      console.log("Fetched completed payments:", data);
      setItems(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  return (
    <div className="page-container">
      <h1>Completed Payments</h1>

      <div className="table-container">
        <h2>Completed Payments List</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Lost Item</th>
              {/* <th>Found Item</th> */}
              <th>Category</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Payer</th>
              <th>Is Paid</th>
              <th>Transaction ID</th>
              <th>Payment ID</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.lost_item_detail?.name || '-'}</td>
                  {/* <td>{item.found_item?.name || '-'}</td> */}
                  <td>{item.lost_item_detail?.category || '-'}</td>
              
                   <td>{item.status}</td>
                  <td>₹{item.amount}</td>
                  <td>{item.payer_detail?.name}</td>
                  <td>{item.is_paid ? 'Yes' : 'No'}</td>
                  <td>{item.transaction_id || '-'}</td>
                  <td>{item.payment_id || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompletePay;
