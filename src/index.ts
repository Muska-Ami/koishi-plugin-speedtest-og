import { Context, h, Schema } from 'koishi'

export const name = 'speedtest-og'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.on('message', (session) => {
    let uuid = extractSpeedtestUUID(session.content);
    if (uuid != null) {
      session.send(h('img', { src: `https://www.speedtest.net/result/c/${uuid}.png` }));
    }
  })
}

function extractSpeedtestUUID(url) {
  const pattern = /^https:\/\/www\.speedtest\.net\/result\/c\/([a-f0-9\-]{36})$/i;
  const match = url.match(pattern);
  if (match) {
    return match[1];
  }
  return null;
}
