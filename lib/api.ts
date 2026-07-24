const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

export interface AgentSummary extends Agent {
  listing_count: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  suburb: string;
  state: string;
  postcode: string;
  address: string;
  property_type: "HOUSE" | "APARTMENT" | "TOWNHOUSE" | "LAND" | "COMMERCIAL";
  bedrooms: number;
  bathrooms: number;
  parking: number;
  land_size: number | null;
  internal_status?: string;
  created_at: string;
  agent: Agent;
}

export type AgentListing = Pick<
  Property,
  | "id"
  | "title"
  | "price"
  | "suburb"
  | "property_type"
  | "bedrooms"
  | "bathrooms"
>;

export interface AgentDetail extends Agent {
  properties: AgentListing[];
}

export interface PaginatedListings {
  items: Property[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SearchParams {
  suburb?: string;
  price_min?: string;
  price_max?: string;
  bedrooms?: string;
  bathrooms?: string;
  property_type?: string;
  keyword?: string;
  page?: string;
  limit?: string;
}

export async function getListings(
  params: SearchParams,
  agentId?: string
): Promise<PaginatedListings> {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val) query.set(key, val);
  });

  const headers: Record<string, string> = {};
  if (agentId) headers["x-agent-id"] = agentId;

  const res = await fetch(`${API_URL}/listings?${query.toString()}`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch listings");
  const data = await res.json();
  return data.data;
}

export async function getListingById(
  id: string,
  agentId?: string
): Promise<Property> {
  const headers: Record<string, string> = {};
  if (agentId) headers["x-agent-id"] = agentId;

  const res = await fetch(`${API_URL}/listings/${id}`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Listing not found");
  const data = await res.json();
  return data.data;
}

export async function getAgents(): Promise<AgentSummary[]> {
  const res = await fetch(`${API_URL}/agents`, { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch agents");
  const data = await res.json();
  return data.data;
}

export async function getAgentById(id: string): Promise<AgentDetail | null> {
  const res = await fetch(`${API_URL}/agents/${id}`, { cache: "no-store" });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch agent");
  const data = await res.json();
  return data.data;
}