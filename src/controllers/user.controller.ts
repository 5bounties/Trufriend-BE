import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserById,
	updateUser,
} from "../services/user.service";

export const fetchAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const users = await getAllUsers();

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "Users retrieved successfully",
			data: users,
		});
	} catch (error) {
		next(error);
	}
};

export const fetchUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await getUserById(req.params.id);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "User retrieved successfully",
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

export const storeUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		req.body.avatarUrl = (req.file as any).location;
		const newUser = await createUser(req.body);

		return res.status(httpStatus.CREATED).send({
			status: httpStatus.CREATED,
			message: "User created successfully",
			data: {
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				username: newUser.username,
				avatarUrl: newUser.avatarUrl,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const editUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		await getUserById(id); // if user not found then throw error
		const updatedUser = await updateUser(id, req.body);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "User updated successfully",
			data: {
				id: updatedUser.id,
				name: updatedUser.name,
				email: updatedUser.email,
				username: updatedUser.username,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const destroyUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;

		await getUserById(id); // if user not found then throw error
		await deleteUser(id);

		return res.status(httpStatus.OK).send({
			status: httpStatus.OK,
			message: "User deleted successfully",
			data: [],
		});
	} catch (error) {
		next(error);
	}
};