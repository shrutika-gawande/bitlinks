import clientPromise from '@/lib/mongodb';

export async function GET(request, { params }) {
  const resolvedParams = await params;  // await params first
  const shortId = resolvedParams.shortId;

  try {
    const client = await clientPromise;
    const db = client.db('bitlinks');
    const collection = db.collection('links');

    const result = await collection.findOne({ shortId });

    if (!result) {
      return new Response('Short URL not found', { status: 404 });
    }

    // Permanent redirect to the original URL
    return Response.redirect(result.originalUrl, 302);
  } catch (error) {
    console.error('Redirect error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
