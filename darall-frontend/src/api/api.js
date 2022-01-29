import axios from "axios";

const CSRF_COOKIE_NAME = "csrftoken";
const CSRF_HEADER_NAME = "X-CSRFToken";

export default axios.create({
	baseURL: "http://localhost:8000",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	xsrfCookieName: CSRF_COOKIE_NAME,
	xsrfHeaderName: CSRF_HEADER_NAME,
});
