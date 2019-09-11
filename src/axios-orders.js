import axios from 'axios';

const orders = axios.create({
	baseURL: 'https://react-burger-app-bb.firebaseio.com'
});

export default orders;