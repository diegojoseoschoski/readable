export const ROOT_URL = "http://localhost:3001";
export const AUTH_HEADERS = {
  Authorization: "authentication-required",
  Accept: "application/json"
};
export function guid() {
  function random() {
    return Math.floor(Math.random() * (16 - 1 + 1)) + 1;
  }
  return random() + random() + random();
}
