import axios from "axios";
import { API_ROUTES } from "../config/apiConfig";
import { QueryParams } from "../model/api";

export const getTodos = async (token: string, params: QueryParams) => {
	const response = await axios.get(API_ROUTES.TODO, {
		headers: {
			Authorization: token,
		},
		params
	});

	return response.data.data;
};


export const addTodo = async (title: string, content: string, priority: string, token: string,) => {
	const response = await axios.post(
		API_ROUTES.TODO,
		{
			title,
			content,
			priority
		},
		{
			headers: {
				Authorization: token,
			},
		}
	);

	return response.data.data;
};


export const updateTodo = async (id: string, title: string, content: string, token: string,) => {
	const response = await axios.put(`${API_ROUTES.TODO}/${id}`, {
		title: title,
		content: content,
	}, {
		headers: {
			Authorization: token,
		},
	});
	return response.data.data;
};


export const deleteTodo = async (id: string, token: string) => {
	await axios.delete(`${API_ROUTES.TODO}/${id}`, {
		headers: {
			Authorization: token,
		}
	});
};