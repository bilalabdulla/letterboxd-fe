import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Search from '../components/Search'

const UpdateProfile = () => {
    const userId = localStorage.getItem('letterUserId')
    const token = localStorage.getItem('letterToken')
    const [userFavourites, setUserFavourites] = useState()
    const [modal, setModal] = useState() 
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        location: '',
        bio:''
    })
    const [movieNumber, setMovieNumber] = useState()

    useEffect(() => {
      const fetchUserFavourites = async () => {
        try {
          const response = await axios.get(
            `https://letterboxd-be.onrender.com/api/v1/userfavourites/${userId}`,
            {
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }
          )
          setUserFavourites(response.data.userFavourites[0])
          console.log('user favourites fetched', userFavourites);
        } catch (error) {
          console.error('error fetching user favourites', error);
        }
      }
      fetchUserFavourites()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
            try {
                const response = await axios.patch(
                    `https://letterboxd-be.onrender.com/api/v1/users/${userId}`,
                    userData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                console.log('updated user', response.data);
            } catch (error) {
                console.error('error updating user', error);
            }
    }

    const toggleModal = (value) => {
        console.log('value', value);
        setMovieNumber(value)
        setModal(!modal)
      }

  return (
    <div className='settings'>

    <form className='settings-form' onSubmit={handleSubmit}>
     <h2 className='settings-text'>Account Settings</h2>
      <h2 className='settings-profile-text'>Profile</h2>

      <h4 className='settings-input-text'>Name</h4>
      <input type='text' className='settings-input'
      onChange={(e) => setUserData({...userData, name: e.target.value})}/> 
      
      <h4 className='settings-input-text'>Email address</h4>
      <input type='text' className='settings-input'
      onChange={(e) => setUserData({...userData, email: e.target.value})}/>

      <h4 className='settings-input-text'>Location</h4>
      <input type='text' className='settings-input'
      onChange={(e) => setUserData({...userData, location: e.target.value})}/>

      <h4 className='settings-input-text'>Bio</h4>      
      <textarea className='settings-textarea' 
      onChange={(e) => setUserData({...userData, bio: e.target.value})}/>

      <button className='settings-btn' type='submit'>SAVE CHANGES</button>
    </form>

    <div className='update-favourite-div'>
        <h4>Favourite Films</h4>
        {/* <img src={userFavourites?.movieOne?.Poster} /> */}
        <img src={userFavourites?.movieOne ? userFavourites?.movieOne?.Poster : '/empty-image.jpg'} className='fav-update-img' onClick={() => toggleModal(1)}/>
        <img src={userFavourites?.movieTwo ? userFavourites?.movieTwo?.Poster : '/empty-image.jpg'} className='fav-update-img' onClick={() => toggleModal(2)}/>
        <img src={userFavourites?.movieThree ? userFavourites?.movieThree?.Poster : '/empty-image.jpg'} className='fav-update-img' onClick={() => toggleModal(3)}/>
        <img src={userFavourites?.movieFour ? userFavourites?.movieFour?.Poster : '/empty-image.jpg'} className='fav-update-img' onClick={() => toggleModal(4)}/>
    </div>

    {
      modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}></div>
          <button onClick={toggleModal}>X</button> 
          <div className="modal-content-three">
            <Search modal={modal}
            setModal={setModal} 
            movieNumber={movieNumber}/>
          </div>
          </div> 
      )
    }
    </div>
  )
}

export default UpdateProfile
