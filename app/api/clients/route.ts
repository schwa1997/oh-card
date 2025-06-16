import { getClientsForUser } from '@/lib/db/queries';


export async function GET() {
  const clients = await getClientsForUser();
  return Response.json(clients);
}
