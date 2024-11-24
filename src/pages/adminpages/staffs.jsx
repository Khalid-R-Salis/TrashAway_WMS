import { useState, useEffect, useCallback } from "react";
import formbg from "../../assets/formsbg.png";
import cancelIcon from "../../assets/close.svg";
import notificationdb from "../../assets/notificationdb.png";
import SidebarAdmin from "../../components/SidebarAdmin";
import { useNavigate } from "react-router-dom";

// const staff = [
//   { id: 1001, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
//   { id: 1002, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
//   { id: 1003, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
//   { id: 1004, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
//   { id: 1005, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
//   { id: 1006, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
//   { id: 1007, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
//   { id: 1008, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
//   { id: 1009, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
//   { id: 1010, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
//   { id: 1011, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
//   { id: 1012, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
//   { id: 1013, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
//   { id: 1014, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
//   { id: 1015, name: "Khalid Rabiu", phoneNumber: 8085499803, role: "Driver" },
// ]

const Staffs = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [staff, setStaff] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showSuccessMessage, setSuccessMessage] = useState(false);
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [date, setDate] = useState({
    day: "1st",
    month: "Jan",
    year: 2023,
  });
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [formError, setFormError] = useState("");
  const [formFieldError, setFormFieldError] = useState({
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatWithLeadingZero = (num) => (num < 10 ? `0${num}` : num);
      const ordinalSuffix = (day) => {
        if (day >= 11 && day <= 13) return `${day}th`;
        switch (day % 10) {
          case 1:
            return `${day}st`;
          case 2:
            return `${day}nd`;
          case 3:
            return `${day}rd`;
          default:
            return `${day}th`;
        }
      };

      setTime({
        hours: formatWithLeadingZero(now.getHours()),
        minutes: formatWithLeadingZero(now.getMinutes()),
        seconds: formatWithLeadingZero(now.getSeconds()),
      });

      setDate({
        day: ordinalSuffix(now.getDate()),
        month: now.toLocaleString("default", { month: "short" }),
        year: now.getFullYear(),
      });
    };

    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const handleDelete = (id) => {
    setStaff(staff.filter((order) => order.id !== id));
    setShowDeleteModal(false); // Close modal after delete
    setDeleteReason(""); // Clear reason input
    console.log(id);
  };

  // @desc: fetching all staffs
  const fetchStaffHandler = useCallback(async () => {
    setIsLoading(true);
    setError("");
    setShowErrorMessage(false);

    const userSession = JSON.parse(localStorage.getItem("userSession"));
    const token = userSession?.token;

    try {
      if (!token) return;

      const response = await fetch(
        "http://localhost:9090/api/admin/all-staff",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok && data.error) {
        setIsLoading(false);
        throw new Error(data.error);
      }

      if (data.message === "No staff available at the moment.") {
        setIsLoading(false);
        throw new Error("No staff available at the moment.");
      }
      if (data.message === "jwt expired") {
        navigate("/login");
      }

      setStaff(data.staffs);
      setIsLoading(false);
      setError("");
      setShowErrorMessage(false);
      console.log(refresh)
    } catch (error) {
      console.log(error);
      setStaff([]);
      setIsLoading(false);
      setShowErrorMessage(true);
      setError(error.message);
    }
  }, [navigate, refresh]);

  useEffect(() => {
    fetchStaffHandler();
  }, [fetchStaffHandler]);

  // @desc: creating a new staff
  const submitStaffHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setShowErrorMessage(false);
    setFormError("");

    const userSession = JSON.parse(localStorage.getItem("userSession"));
    const token = userSession?.token;

    try {
      if (!token) return;

      const response = await fetch(
        "https://waste-mangement-backend-3qg6.onrender.com/api/admin/create-new-staff",
        {
          method: "POST",
          body: JSON.stringify({ name: fullname, email, phone: phoneNumber }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok && data.error) {
        setIsLoading(false);
        setShowErrorMessage(false); 
        throw new Error(data.error);
      }

      if (data.message === 'User already exists with this email') {
        setIsLoading(false);
        setShowErrorMessage(false); 
        throw new Error('User with email already exists.')
      }

      if (response.status === 403) {
        navigate('/login');
      }
      
      if (data.message === 'jwt expired') {
        setIsLoading(false);
        setShowErrorMessage(false); 
        navigate('/login')

      }

      
      setRefresh(prevVal => !prevVal);
      setIsLoading(false);
      setShowErrorMessage(false);
      setFormError('');
      setSuccessMessage(true);
      setShowModal(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setFormError(error.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage(false);
    }, 2500);

    console.log(refresh)

    return () => clearTimeout(timer);
  }, [refresh]);

  // @desc: removed beacuses nothing is being filtered
  // const [filterStatus] = useState("All");
  // const filteredOrders = staff.filter((order) => filterStatus === "All");

  const ordersPerStaff = 6;
  const indexOfLastStaff = currentPage * ordersPerStaff;
  const indexOfFirstStaff = indexOfLastStaff - ordersPerStaff;
  const currentStaff = staff.slice(indexOfFirstStaff, indexOfLastStaff);
  const totalPages = Math.ceil(staff.length / ordersPerStaff);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const openModal = () => {
    setShowModal(true);
    setShowErrorMessage(false);
  };

  const closeModal = useCallback(() => {
    setShowModal(false);
    setShowErrorMessage(false);
    setRefresh(true);
    setFormError('')
  }, []);

  useEffect(() => {
    closeModal();

    console.log(refresh)
  }, [closeModal, refresh]);

  // @desc: showing error modal conditionally
  const showError = (
    <div className="absolute right-[35rem] bottom-[25rem] mt-[23rem] w-[370px] bg-[#549877] p-6 rounded-lg shadow-sm z-10">
      <div className="flex justify-between items-center pb-[32px]">
        <h3 className="text-white font-Inter text-[20px] font-semibold capitalize">
          {error}
        </h3>
      </div>
    </div>
  );

  // @desc: showing success message afer staff has been created
  const showStaffCreatedMessage = (
    <div className="absolute right-[35rem] bottom-[45rem] mt-[23rem] w-[300px] bg-[#549877] p-6 rounded-lg shadow-sm z-10">
      <div className="flex justify-between items-center pb-[-1px]">
        <h3 className="text-white font-Inter text-[16px] capitalize">
          Staff successfully created.
        </h3>
      </div>
    </div>
  );
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarAdmin activePage="staffs" />
      <main className="flex-1">
        <div className="flex justify-between items-center px-[32px] py-[12px] w-full bg-[#1E1E1E] h-20 relative">
          <h2 className="text-white font-Inter text-[20px] font-[600] tracking-[-0.4]">
            Admin Dashboard
          </h2>
          <div className="flex gap-4 items-center justify-center text-white font-Inter text-[16px] font-[500] p-2 border-gray-green/50 rounded-xl border-[1px]">
            <div>
              <span>{date.day}</span>-<span>{date.month}</span>-
              <span>{date.year}</span>
            </div>
            <div>
              <span>{time.hours}</span>:<span>{time.minutes}</span>:
              <span>{time.seconds}</span>
            </div>
          </div>

          <img
            src={notificationdb}
            alt="Notifications"
            className="cursor-pointer"
            onClick={toggleNotification}
          />

          {showNotification && (
            <>
              <div
                className="fixed inset-0 bg-black opacity-50 z-10"
                onClick={toggleNotification}
              ></div>
              <div className="absolute right-[30px] mt-[23rem] w-[370px] bg-white p-6 rounded-lg shadow-sm z-10">
                <div className="flex justify-between items-center pb-[32px]">
                  <h3 className="text-[#1E1E1E] font-Inter text-[20px] font-semibold">
                    Notifications
                  </h3>
                  <img
                    src={cancelIcon}
                    alt="Close"
                    className="cursor-pointer h-4 w-4"
                    onClick={toggleNotification}
                  />
                </div>
                {/* Notification List */}
              </div>
            </>
          )}
        </div>

        <div
          className="bg-no-repeat bg-cover bg-center w-full h-full"
          style={{ backgroundImage: `url(${formbg})` }}
        >
          <div className="flex justify-between items-center px-5 py-2 mt-6 mb-4">
            <h1 className="text-[#1E1E1E] text-[24px] font-Inter font-[600] tracking-[-0.48px]">
              Staffs
            </h1>
            <button
              className="py-[12px] px-[39px] bg-[#549877] rounded-[4px] text-white"
              onClick={openModal}
            >
              + <span className="ml-2">Add Staff</span>
            </button>
          </div>

          <div className="RecentPickUpOrders mt-4 mx-[20px]">
            <table className="min-w-full table-auto bg-white shadow-md rounded-md py-5">
              <thead>
                <tr>
                  <th className="text-[#8B909A] text-[13px] font-[500] px-0 py-2">
                    ID
                  </th>
                  <th className="text-[#8B909A] text-[13px] font-[500] px-0 py-2">
                    Name
                  </th>
                  <th className="text-[#8B909A] text-[13px] font-[500] px-0 py-2">
                    Phone Number
                  </th>
                  <th className="text-[#8B909A] text-[13px] font-[500] px-0 py-2">
                    Role
                  </th>
                  <th className="px-0 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {currentStaff.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400]">
                      {order.driverID}
                    </td>
                    <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400]">
                      {order.name}
                    </td>
                    <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400]">
                      {order.phone}
                    </td>
                    <td className="px-[45px] py-2 text-[#23272E] text-[15px] font-[400]">
                      Driver
                    </td>
                    <td className="px-4 py-2">
                      <div className="relative">
                        <button
                          onClick={() => {
                            setSelectedOrderId(order._id);
                            setShowDeleteModal(true);
                          }}
                          className="text-gray-500"
                        >
                          &#x22EE;
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Showing error conditionally */}
            {!isLoading && showErrorMessage && showError}

            {/* Showing staff created modal */}
            {!isLoading && showSuccessMessage && showStaffCreatedMessage}
          </div>
        </div>

        <div className="flex justify-around items-center">
          <button
            onClick={handlePrevious}
            className="bg-gray-200 text-gray-700 px-4 py-2 mt-[-650px] rounded-md hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-200 text-gray-700 px-4 py-2 mt-[-650px] rounded-md hover:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-md shadow-lg w-[400px]">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Are you sure you want to remove this driver?
              </h3>
              <textarea
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                className="w-full h-[80px] p-2 border-2 rounded-md mb-4 outline-none resize-none"
                placeholder="Optional: Provide a reason"
              ></textarea>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedOrderId)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Remove Driver
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for the form */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-[400px] relative">
              <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={closeModal}
              >
                &times;
              </button>

              <h2 className="text-[16px] font-Inter font-[500] mb-4">
                Add Staff
              </h2>
              <form className="" onSubmit={submitStaffHandler}>
                <div className="mb-4">
                  <label className="block text-gray-700">Full Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded outline-none"
                    placeholder="Enter Full Name"
                    onChange={(event) => setFullName(event.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 p-2 rounded outline-none"
                    placeholder="Enter Email"
                    onChange={(event) => {
                      const emailValue = event.target.value;

                      const validateEmail = (value) => {
                        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        return regex.test(value);
                      };

                      if (validateEmail(emailValue)) {
                        setEmail(emailValue);
                        setFormFieldError({
                          ...formFieldError,
                          email: ''
                        });
                      } else setFormFieldError({
                        ...formFieldError,
                        email: 'Invalid Email.'
                      });;
                    }}
                    required
                  />
                </div>
                <p className="text-red-600">{formFieldError.email}</p>

                <div className="mb-4">
                  <label className="block text-gray-700">Contact Number</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded outline-none"
                    placeholder="Enter Contact Number"
                    onChange={(event) => {
                      const phone = event.target.value;

                      const validatePhone = (value) => {
                        const regex = /^(0\d{10}|(\+234)\d{10})$/;
                        return regex.test(value);
                      };

                      if (validatePhone(phone)) {
                        setPhoneNumber(phone);
                        setFormFieldError({
                          ...formFieldError,
                          phone: ''
                        });
                      } else setFormFieldError({
                        ...formFieldError,
                        phone: 'Invaid Phone Format'
                      });
                    }}
                    required
                  />
                </div>
                <p className="text-red-600">{formFieldError.phone}</p>

                <div className="mb-4">
                  <label className="block text-gray-700">Role</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 text-gray-400 p-2 rounded outline-none"
                    placeholder="Driver"
                    value={"Driver"}
                    disabled
                  />
                </div>
                <p className="text-red-600">{formError}</p>

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="text-gray-600"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gray-green text-white px-4 py-2 rounded"
                  >
                    Create
                  </button>
                </div>
              </form>
              {/* Form ends here */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Staffs;
