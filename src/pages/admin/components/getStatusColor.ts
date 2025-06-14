
export function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-500";
    case "pending":
      return "bg-yellow-500";
    case "failed":
      return "bg-red-500";
    case "refunded":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
}
