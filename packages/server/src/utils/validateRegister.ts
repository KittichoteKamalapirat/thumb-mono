import { CreateUserInput } from '../resources/users/dto/create-user.input';
import { FieldError } from '../types/field-error.type';

export const validateRegister = (
  data: CreateUserInput,
): FieldError[] | null => {
  const errors: FieldError[] = [];
  // if (data.username.length <= 2) {
  //   return [
  //     {
  //       field: 'username',
  //       message: 'Length must be greater than 2',
  //     },
  //   ];
  // }

  if (!data.email.includes('@')) {
    const error = {
      field: 'email',
      message: 'email must include an @',
    };

    errors.push(error);
  }

  if (data.password.length <= 2) {
    const error = {
      field: 'password',
      message: 'Length must be greater than 2',
    };
    errors.push(error);
  }

  if (errors.length === 0) return null;
  return errors;
};
