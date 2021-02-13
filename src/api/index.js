import axios from "axios";

const baseUrl = "http://localhost/makemytrip/"

export default {
    makeMyTrip(url = baseUrl) {
        return {
            fetchTerminals: () => axios.get(url + 'terminals.php'),
            fetchBuses: () => axios.get(url + 'buses.php'),
            fetchUsers: () => axios.get(url + 'users.php'),
            removeUser: (id) => axios.post(url + 'remove_user.php', id),
            fetchTrips: data => axios.post(url + 'avail_trips.php', data),
            getAllTrips: () => axios.get(url + 'all_trips.php'),
            login: (data) => axios.post(url + 'login.php', data),
            signup: data => axios.post(url + 'signup.php', data),
            addTrip: data => axios.post(url + 'add_trip.php', data),
            updateTrip: data => axios.post(url + 'update_trip.php', data),
            bookTrip: data => axios.post(url + 'book_trip.php', data),
            myTrips: userId => axios.post(url + 'my_trip.php', userId),
            removeMyTrip: data => axios.post(url + 'remove_myTrip.php', data),
        }
    }
}