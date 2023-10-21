
import React, { useState } from 'react'
import logoZon from "./logoOzon.png"
import { useSelector } from 'react-redux';
import {
  Link,
  useNavigate,
  // useSearchParams,
  createSearchParams,
} from "react-router-dom";
import '../../styles/navbar.less'
import { ProfileCard } from './ProfileCard';


export const Navbar = () => {
  const { user } = useSelector((state) => state.user)
  const [query, setQuery] = useState({ name: '' })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setQuery({ ...query, [name]: value })
  }
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate({
        pathname: '/search',
        search: `?${createSearchParams(query)}`
      })
    }
  }


  return (
    <nav className="navbar">
      <Link to={"/"}>
        <img src={logoZon} alt="" />
      </Link>
      <input
        type="text"
        placeholder="Search Any Product"
        name="name"
        value={query?.name}
        onChange={handleChange}
        onKeyUp={handleSearch}
      />
      <Link to={"/products"}>Products</Link>
      <div className='profile-container'> {user?.name}
          <ProfileCard />
        </div>


    </nav>
  );
}

