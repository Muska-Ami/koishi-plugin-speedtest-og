import { Context, h, Schema } from 'koishi'

export const name = 'speedtest-og'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.on('message', (session) => {
    let key = extractSpeedtestUUID(session.content) ?? extractSpeedtestID(session.content);
    if (key != null) {
      session.send(h('img', { src: `https://www.speedtest.net/result/${key}.png` }));
    }
  })
}

function extractSpeedtestUUID(url) {
  const pattern = /^https:\/\/www\.speedtest\.net\/result\/(.+)$/;
  const match = url.match(pattern);
  if (match) {
    return match[1];
  }
  return null;
}

function extractSpeedtestID(url) {
  const pattern = /^https:\/\/www\.speedtest\.net\/my-result\/(.+)$/;
  const match = url.match(pattern);
  if (match) {
    return match[1];
  }
  return null;
}
