
export default function StatusFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 border rounded-md"
    >
      <option value="all">All Status</option>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
      <option value="failed">Failed</option>
      <option value="refunded">Refunded</option>
    </select>
  );
}
