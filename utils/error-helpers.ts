export function noPriviledgedHandler(message: string) {
  throw { status: 403, message };
}

export function unAuthorizedUser(message: string) {
  throw { status: 401, message };
}
