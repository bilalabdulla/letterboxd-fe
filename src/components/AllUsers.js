import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const AllUsers = () => {
    const [users, setUsers] = useState()
    const token = localStorage.getItem('letterToken')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get(
                    `https://letterboxd-be.onrender.com/api/v1/users`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setUsers(response.data.users)
                console.log('fetched all users', response.data);
            } catch (error) {
                console.error('error ferching users', error);
            }
        }
        fetchAllUsers()
    }, [])

  return (
    <div className="all-users">
        
    <h4 className="new-users-title">New Users</h4>
      <ul className="new-users-ul">
      { 
        users?.map((user, index) => {
          if (index < 4 ) { 
            return <div key={user?._id} className="single-user" onClick={() => navigate(`/home/${user?._id}/profile`)}>
                    <img src='/userimage.png' className="pfp"/>
                    <div className="user-details">
                    <p className="all-user-name">{user?.name}</p>
                    <p className="all-user-email">{user?.email}</p>
                    </div>
                </div>
          }
        })
      }
      </ul>
      <ul className="all-users-ul">
      <h4 className="new-users-title">All Users</h4>
        {
          users?.map((user, index) => {
              return <div key={user?._id} className="all-single-user" onClick={() => navigate(`/home/${user?._id}/profile`)}>
                      <img src='/userimage.png' className="pfp-small"/>
                      <div className="all-user-details">
                      <p className="all-user-name">{user?.name}</p>
                      <p className="all-user-email">{user?.email}</p>
                      </div>
                  </div>
          })  
        }
      </ul>
    </div>
  )
}

export default AllUsers
