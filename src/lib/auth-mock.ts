export type PartnerRole = "academic" | "trade" | "library" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: PartnerRole;
  institution?: string;
}

// Mock Database of verified partners
export const mockUsers: User[] = [
  {
    id: "usr_admin1",
    email: "admin@mangupublishing.com",
    name: "Editorial Director",
    role: "admin",
  },
  {
    id: "usr_acad1",
    email: "professor@university.edu",
    name: "Dr. Jane Smith",
    role: "academic",
    institution: "State University",
  },
  {
    id: "usr_trade1",
    email: "buyer@bookshop.com",
    name: "Independent Bookstore",
    role: "trade",
    institution: "The Local Bookshop",
  }
];

/**
 * Server-side mock authentication strategy
 * In production this would use AWS Cognito or an external JWT provider
 */
export async function authenticate(email: string): Promise<User | null> {
  const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  return user || null;
}
