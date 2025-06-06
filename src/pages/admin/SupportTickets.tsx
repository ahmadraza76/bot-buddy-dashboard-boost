
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, MessageSquare, Send, Eye, Clock } from "lucide-react";

// Sample ticket data
const tickets = [
  {
    id: "TKT-001",
    user: "john@example.com",
    subject: "Bot not starting after payment",
    status: "open",
    priority: "high",
    created: "2024-06-05 10:30",
    lastUpdate: "2024-06-05 14:15",
    messages: 3
  },
  {
    id: "TKT-002",
    user: "sarah@example.com",
    subject: "How to change bot username?",
    status: "in-progress",
    priority: "medium",
    created: "2024-06-04 16:20",
    lastUpdate: "2024-06-05 09:45",
    messages: 5
  },
  {
    id: "TKT-003",
    user: "mike@example.com",
    subject: "Billing inquiry for yearly plan",
    status: "resolved",
    priority: "low",
    created: "2024-06-03 12:15",
    lastUpdate: "2024-06-04 11:30",
    messages: 2
  },
];

export default function SupportTickets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState("");

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-500";
      case "in-progress": return "bg-yellow-500";
      case "resolved": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Support Tickets</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Open Tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">45</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>In Progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">23</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Resolved Today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">18</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Response Time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Support Tickets
            </CardTitle>
            <CardDescription>Manage customer support requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow 
                    key={ticket.id}
                    className={selectedTicket === ticket.id ? "bg-muted" : ""}
                  >
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {ticket.id}
                      </code>
                    </TableCell>
                    <TableCell>{ticket.user}</TableCell>
                    <TableCell>
                      <div className="max-w-48 truncate">{ticket.subject}</div>
                      <div className="text-xs text-muted-foreground">
                        {ticket.messages} messages
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(ticket.status)} text-white`}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {ticket.created}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedTicket(ticket.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Ticket Details & Reply */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedTicket ? `Ticket ${selectedTicket}` : "Select a Ticket"}
            </CardTitle>
            <CardDescription>
              {selectedTicket ? "View details and reply" : "Choose a ticket to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedTicket ? (
              <div className="space-y-4">
                {/* Ticket Details */}
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Bot not starting after payment</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    From: john@example.com
                  </p>
                  <p className="text-sm">
                    Hi, I made the payment for monthly plan but my bot is still not starting. 
                    Can you please help me with this issue?
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <Clock className="h-3 w-3 mr-1" />
                    2024-06-05 10:30
                  </div>
                </div>

                {/* Previous Messages */}
                <div className="space-y-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium mb-1">Admin Reply:</p>
                    <p className="text-sm">
                      I can see your payment has been processed. Let me check your bot deployment status.
                    </p>
                    <div className="text-xs text-muted-foreground mt-1">
                      2024-06-05 11:15
                    </div>
                  </div>
                </div>

                {/* Reply Form */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Reply to Customer:</label>
                  <Textarea
                    placeholder="Type your reply here..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    rows={4}
                  />
                  <div className="flex justify-between items-center">
                    <select className="px-3 py-1 border rounded text-sm">
                      <option value="in-progress">Mark as In Progress</option>
                      <option value="resolved">Mark as Resolved</option>
                      <option value="open">Keep Open</option>
                    </select>
                    <Button size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Select a ticket from the list to view details and reply</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
