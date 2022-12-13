import { useState } from "react";
import { fetchUpdateUser, fetchDeleteUser } from "../../services/userservices";
import ClearAllModal from "../modals/ClearAllModal";
import DeleteAccountModal from "../modals/DeleteAccountModal";

const Profile = ({ user, setUser, setIsLoggedIn }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [clearDataModalOpen, setClearDataModalModalOpen] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await fetchUpdateUser(user.email, password, firstName, lastName);
      setMessage("Profile Updated Successfully");
      setError("");
      setUser({ password, firstName, lastName });
    } catch (error) {
      setError(error.message);
      setMessage("");
    }
  };

  return (
    <div className="profile-div">
      <div className="profile-container">
        <form>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleUpdateUser}
            className="btn-update"
          >
            SAVE DATA
          </button>
        </form>
      </div>
      {message && <p className="message">{message}</p>}
      <br></br>
      <div className="caution-div">
        <span>
          Do you want to Clear all the records ?{" "}
          <button
            className="openModalBtn"
            onClick={() => {
              setClearDataModalModalOpen(true);
            }}
          >
            Clear Data
          </button>
          {clearDataModalOpen && (
            <ClearAllModal setOpenModal={setClearDataModalModalOpen} />
          )}
        </span>
        <span>
          Delete Account ?
          <button
            className="openModalBtn"
            onClick={() => setDeleteAccountModal(true)}
          >
            Delete Account
          </button>
          {deleteAccountModal && (
            <DeleteAccountModal
              setOpenModal={setDeleteAccountModal}
              setIsLoggedIn={setIsLoggedIn}
              setUser={setUser}
            />
          )}
        </span>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Profile;
