import { OAuth2Client } from 'google-auth-library'
import { clientId } from 'variables/clienteId'

export async function handleGoogleToken(request) {
  const body = await request.json()
  const client = new OAuth2Client(clientId)
  
  if (!body) {
    return new Response(
      JSON.stringify({
        message: 'Invalid body',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
  
  async function verify(body) {
    const ticket = await client.verifyIdToken({
      idToken: body.token,
      audience: clientId,
    })
    const payload = ticket.getPayload()
    return payload
  }

  try {
    const payload = await verify(body).catch(console.error)
    return new Response(
      JSON.stringify(payload),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        code: 400,
        message: error instanceof Error ? error.message : 'Unknown',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
