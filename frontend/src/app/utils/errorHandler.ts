// utils/errorHandler.ts
export function getFriendlyErrorMessage(error: any): string {
  if (!error) return "Something went wrong. Please try again.";

  // If it's an Axios error
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        return data?.message || "Invalid request. Please check your input.";
      case 401:
        return "Unauthorized. Please log in again.";
      case 403:
        return "You don't have permission to perform this action.";
      case 404:
        return "Resource not found.";
      case 500:
        return "Internal server error. Please try again later.";
      default:
        return data?.message || "An unexpected error occurred.";
    }
  }

  // If it’s a network error
  if (error.request) {
    return "Network error. Please check your connection.";
  }

  // Default fallback
  return error.message || "Something went wrong. Please try again.";
}
