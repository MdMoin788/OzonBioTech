
import { useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { logoutUser } from "../../store/actions/userActions";
import '../../styles/profile-card.less'

export const ProfileCard = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser())
    // window.location.reload();
    console.log(location)
  }
  return (
    <>
      <div className="profile-card">
        <div className="faltu"></div>
        <div className="card">
          <Link to={"/profile"}>Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
};