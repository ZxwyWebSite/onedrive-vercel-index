//import Redis from 'ioredis'
import siteConfig from '../../config/site.config'
import { KVNamespace } from '@cloudflare/workers-types'

// Persistent key-value store is provided by Redis, hosted on Upstash
// https://vercel.com/integrations/upstash
declare const kv: KVNamespace

export async function getOdAuthTokens(): Promise<{ accessToken: unknown; refreshToken: unknown }> {
  const accessToken = await kv.get(`${siteConfig.kvPrefix}access_token`)
  const refreshToken = await kv.get(`${siteConfig.kvPrefix}refresh_token`)

  return {
    accessToken,
    refreshToken,
  }
}

export async function storeOdAuthTokens({
  accessToken,
  accessTokenExpiry,
  refreshToken,
}: {
  accessToken: string
  accessTokenExpiry: number
  refreshToken: string
}): Promise<void> {
  await kv.put(`${siteConfig.kvPrefix}access_token`, accessToken, {expirationTtl: accessTokenExpiry})
  await kv.put(`${siteConfig.kvPrefix}refresh_token`, refreshToken)
}
