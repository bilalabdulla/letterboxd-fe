import axios from "axios"

export const fetchUserMovie = async () => {
    try {
        const response = await axios.get(
            'http://localhost:8000/api/v1/usermovie',
            {
                headers: {
                    'Accept': 'application/json'
                }
            }
        )
        console.log('user movies fetched', response.data);
    } catch (error) {
        console.error('erro fetching user movies', error);
    }
}