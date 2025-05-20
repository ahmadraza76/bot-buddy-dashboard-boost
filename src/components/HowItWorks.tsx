
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const steps = [
  {
    number: "01",
    title: "Create your bot on Telegram",
    description:
      "Start by creating a bot through BotFather on Telegram and get your bot token.",
  },
  {
    number: "02",
    title: "Deploy on BotBuddy",
    description:
      "Enter your bot token in our platform to deploy your bot on our servers.",
  },
  {
    number: "03",
    title: "Monitor and manage",
    description:
      "Access real-time logs, analytics, and manage settings through our dashboard.",
  },
];

// Sample uptime data for the chart
const uptimeData = [
  { name: "Jan", uptime: 99.97 },
  { name: "Feb", uptime: 99.98 },
  { name: "Mar", uptime: 99.99 },
  { name: "Apr", uptime: 100 },
  { name: "May", uptime: 99.96 },
  { name: "Jun", uptime: 99.99 },
  { name: "Jul", uptime: 99.95 },
  { name: "Aug", uptime: 99.99 },
  { name: "Sep", uptime: 99.97 },
  { name: "Oct", uptime: 99.98 },
  { name: "Nov", uptime: 99.99 },
  { name: "Dec", uptime: 99.96 },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Getting started with BotBuddy is quick and easy. Follow these simple steps to deploy your Telegram bot in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            {steps.map((step) => (
              <div key={step.number} className="flex">
                <div className="mr-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-lg p-6 shadow-md h-96">
            <h3 className="text-xl font-bold mb-4">Our Uptime Performance</h3>
            <p className="text-muted-foreground mb-6">
              We maintain a consistent 99.9%+ uptime across all our servers, ensuring your bots are always online.
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={uptimeData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis 
                    domain={[99.9, 100]} 
                    tick={{ fontSize: 12 }}
                    tickCount={3}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Uptime']}
                    contentStyle={{
                      backgroundColor: 'var(--background)',
                      borderColor: 'var(--border)',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="uptime"
                    stroke="hsl(var(--primary))"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
