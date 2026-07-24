const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

export interface AgentAuthResult {
  agent: { id: string; name: string; email: string; phone: string | null; is_admin: boolean };
  token: string;
}

export interface UserAuthResult {
  user: { id: string; name: string; email: string };
  token: string;
}

async function parseAuthResponse<T>(res: Response): Promise<T> {
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.error || body.message || "Request failed");
  }
  return body.data as T;
}

export async function loginAgent(email: string, password: string): Promise<AgentAuthResult> {
  const res = await fetch(`${API_URL}/auth/agent/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return parseAuthResponse<AgentAuthResult>(res);
}

export async function registerAgent(
  name: string,
  email: string,
  phone: string,
  password: string
): Promise<AgentAuthResult> {
  const res = await fetch(`${API_URL}/auth/agent/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, password }),
  });
  return parseAuthResponse<AgentAuthResult>(res);
}

export async function loginUser(email: string, password: string): Promise<UserAuthResult> {
  const res = await fetch(`${API_URL}/auth/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return parseAuthResponse<UserAuthResult>(res);
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<UserAuthResult> {
  const res = await fetch(`${API_URL}/auth/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return parseAuthResponse<UserAuthResult>(res);
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

function authHeaders(token?: string): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getMyListings(
  token: string,
  params: SearchParams = {}
): Promise<PaginatedListings> {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val) query.set(key, val);
  });
  query.set("mine", "true");

  const res = await fetch(`${API_URL}/listings?${query.toString()}`, {
    headers: authHeaders(token),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch your listings");
  const data = await res.json();
  return data.data;
}

export interface ListingInput {
  title: string;
  description: string;
  price: number;
  suburb: string;
  state: string;
  postcode: string;
  address: string;
  property_type: Property["property_type"];
  bedrooms: number;
  bathrooms: number;
  parking?: number;
  land_size?: number;
  internal_status?: string;
}

async function parseListingResponse(res: Response): Promise<Property> {
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.message || "Request failed");
  }
  return body.data as Property;
}

export async function createListing(token: string, input: ListingInput): Promise<Property> {
  const res = await fetch(`${API_URL}/listings`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify(input),
  });
  return parseListingResponse(res);
}

export async function updateListing(
  token: string,
  id: string,
  input: Partial<ListingInput>
): Promise<Property> {
  const res = await fetch(`${API_URL}/listings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders(token) },
    body: JSON.stringify(input),
  });
  return parseListingResponse(res);
}

export async function deleteListing(token: string, id: string): Promise<void> {
  const res = await fetch(`${API_URL}/listings/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!res.ok && res.status !== 204) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Failed to delete listing");
  }
}

export async function uploadListingImages(
  listingId: string,
  files: File[],
  token: string
) {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const res = await fetch(`${API_URL}/listings/${listingId}/images`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload images");
  return res.json();
}

export async function deleteListingImage(imageId: string, token: string) {
  const res = await fetch(`${API_URL}/listings/images/${imageId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete image");
  return res.json();
}