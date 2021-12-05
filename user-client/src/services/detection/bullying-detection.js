import axios from 'axios';

export const get_detection = async (text) => {
	try {
		const response = await axios.post('http://192.168.1.10:8080/check-bullying', { data: text }, { Headers: { 'Content-Type': 'application/json' } });
		return { detection: response.data.result, error: null };
	} catch (err) {
		return { detection: null, error: err };
	}
};
