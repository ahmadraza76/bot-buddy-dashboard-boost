
export default function MethodFilter({
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
      <option value="all">All Methods</option>
      <option value="razorpay">Razorpay</option>
      <option value="UPI">UPI</option>
      <option value="PayPal">PayPal</option>
      <option value="USDT">USDT</option>
    </select>
  );
}
