
const ChartCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white p-5 rounded-lg shadow">
    <h4 className="font-semibold mb-4">{title}</h4>
    <div className="w-full h-64">{children}</div>
  </div>
);

export default ChartCard;
