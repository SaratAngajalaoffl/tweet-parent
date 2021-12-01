import UserModel from './user-model';

export const registerModels = async () => {
  await UserModel.sync();

  console.log('Models  are Synced!');
};
