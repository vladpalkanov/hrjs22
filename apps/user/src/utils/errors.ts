export class UsedEmailError extends Error {
  constructor() {
    super("Email is already in use");
  }

  get name() {
    return "UsedEmailError";
  }
}

export class ValidationError extends Error {
  constructor(message?: string) {
    super(message);
  }

  get name() {
    return "ValidationError";
  }
}

export class UndefinedUserError extends Error {
  constructor() {
    super("The user does not exist");
  }
}