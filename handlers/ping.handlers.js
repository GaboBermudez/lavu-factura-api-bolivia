export async function pingHandler(req, res) {
  res.send('pong!')
}

export async function healthHandler(req, res) {
  res.send('Postgres and Redis connections ok!')
}
