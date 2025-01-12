export class UsedEmailError extends Error {
  constructor() {
    super('Email is already in use');
  }

  name = 'UsedEmailError';
}

export class ValidationError extends Error {
  constructor(message?: string) {
    super(message);
  }

  name = 'ValidationError';
}

export class UndefinedUserError extends Error {
  constructor() {
    super('The user does not exist');
  }
  name = 'UndefinedUserError';
}
