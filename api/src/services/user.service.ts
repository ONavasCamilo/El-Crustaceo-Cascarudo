import { UserModel } from "../config/data-source";
import { hashPassword } from "../utils/passwordManager";
import RoleModel from "../repositories/rol.repository";
import { DeleteUser, LoginUser, RegisterUser } from './../interfaces/user.interface';

export const getUsersService = async () => {
  const users = await UserModel.find();
  return users;
}

export const getUserService = async ({ id, username, email }: { id: number, username: string | undefined, email: string | undefined }) => {
  if (id) {
    return await UserModel.findBy({ id })
  }
  else if (username) {
    return await UserModel.findBy({ username })
  }
  else if (email) {
    return await UserModel.findBy({ email })
  }
}

export const registerUserService = async ({ username, password, email }: RegisterUser) => {

  const passwordHash = await hashPassword(password);
  const newUser = UserModel.create({ username, password: passwordHash, email })
  await RoleModel.asignRole(newUser)
  await newUser.save()
  return newUser
}

export const loginUserService = async ({ username, email }: LoginUser) => {
  return username
    ? await UserModel.findOne({ where: { username }, relations: ["role"] })
    : await UserModel.findOne({ where: { email }, relations: ["role"] });
}

export const deleteUserService = async ({ id, username, email }: DeleteUser) => {
  if (id) {
    const user = await UserModel.findOne({ where: { id } })
    if (!user) throw new Error("User not found");
    await user?.remove()
  }
  else if (username) {
    const user = await UserModel.findOne({ where: { username } })
    if (!user) throw new Error("User not found");
    await user?.remove()
  }
  else if (email) {
    const user = await UserModel.findOne({ where: { email } })
    if (!user) throw new Error("User not found");
    await user?.remove()
  }
}