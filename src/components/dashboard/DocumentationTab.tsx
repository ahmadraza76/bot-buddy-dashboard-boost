
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export function DocumentationTab() {
  return (
    <Card className="bg-white shadow-sm border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-600" />
          API Documentation
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Learn how to use the BotBuddy API to interact with your Telegram bot programmatically.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none space-y-6">
          <div>
            <h3 className="text-base font-semibold mb-3 text-gray-900">Getting Started</h3>
            <p className="text-sm text-gray-700 mb-4">
              All API requests require authentication using your API key. Include your API key in the request header as follows:
            </p>
            <pre className="p-4 rounded-lg bg-gray-50 overflow-x-auto text-xs border text-gray-800">
{`Authorization: Bearer YOUR_API_KEY`}
            </pre>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4 text-gray-900">Available Endpoints</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Endpoint</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Method</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-gray-800">/v1/bots/messages</td>
                    <td className="px-4 py-3 text-green-600 font-medium">POST</td>
                    <td className="px-4 py-3 text-gray-700">Send a message to a user from your bot</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-gray-800">/v1/bots/status</td>
                    <td className="px-4 py-3 text-blue-600 font-medium">GET</td>
                    <td className="px-4 py-3 text-gray-700">Get the status of your bot</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-gray-800">/v1/bots/users</td>
                    <td className="px-4 py-3 text-blue-600 font-medium">GET</td>
                    <td className="px-4 py-3 text-gray-700">List all users who have interacted with your bot</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-gray-800">/v1/bots/restart</td>
                    <td className="px-4 py-3 text-amber-600 font-medium">POST</td>
                    <td className="px-4 py-3 text-gray-700">Restart your bot</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-3 text-gray-900">Rate Limits</h3>
            <p className="text-sm text-gray-700 mb-3">The API has the following rate limits:</p>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>60 requests per minute for the free plan</li>
              <li>300 requests per minute for the Pro plan</li>
              <li>1000 requests per minute for the Business plan</li>
            </ul>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              📚 Need more help? Check out our{" "}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                complete API documentation
              </a>{" "}
              for detailed examples and advanced usage.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
