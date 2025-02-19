import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

async function removeSeededData() {
  const data = await sql`
    DROP TABLE users
    DROP TABLE invoices
    DROP TABLE customers
    DROP TABLE revenue
  `;
}

export async function GET() {
  try {
  	return Response.json(await removeSeededData());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
