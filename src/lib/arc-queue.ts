import { PartnerRole } from "./auth-mock";

export interface ArcRequest {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userRole: PartnerRole;
  bookSlug: string;
  format: "digital" | "physical";
  address?: string;
  notes?: string;
  status: "pending" | "approved" | "denied" | "shipped";
  timestamp: Date;
}

// In-memory queue for the MVP demo
export const mockArcQueue: ArcRequest[] = [
  {
    id: "arc_1",
    userId: "usr_acad1",
    userEmail: "professor@university.edu",
    userName: "Dr. Jane Smith",
    userRole: "academic",
    bookSlug: "hathor-red",
    format: "digital",
    notes: "Requesting for potential syllabus inclusion.",
    status: "pending",
    timestamp: new Date()
  }
];

export function addArcRequest(request: Omit<ArcRequest, "id" | "status" | "timestamp">) {
  mockArcQueue.push({
    ...request,
    id: `arc_${Date.now()}`,
    status: "pending",
    timestamp: new Date(),
  });
}

export function updateArcStatus(id: string, newStatus: ArcRequest["status"]) {
  const req = mockArcQueue.find(r => r.id === id);
  if (req) {
    req.status = newStatus;
  }
}
