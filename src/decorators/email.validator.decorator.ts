import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false }) // async true if we need to fetch data from db
export class IsEmailConstraint implements ValidatorConstraintInterface {

  validate(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof email === 'string' && emailRegex.test(email);
  }

  // exception message
  defaultMessage(): string {
    return 'Invalid Email: Please enter a valid email!';
  }
}

// a decorator fucntion to be called in dto
export function EmailValidator(validationOptions?: ValidationOptions) {

  // registering a new validation rule in class-validator
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor, // tells us this rule is for an object
      propertyName: propertyName, // tells the property of the object.attr
      options: validationOptions,
      constraints: [],
      validator: IsEmailConstraint, // then applies this logic defined above, on the object.attr it recieves
    });
  };
}
