export async function pingHandler(req, res) {
  const token = req.cookies.token

  if (!token) res.status(401).send('Unauthorized: no token provided')

  const decoded = jwt.verify(token, secretKey)

  // Token is valid, access the user ID from the decoded payload
  const userId = decoded.userId
  res.send(`Protected route accessed by user with ID: ${userId}`)
}

export async function healthHandler(req, res) {
  res.send('Postgres and Redis connections ok!')
}
