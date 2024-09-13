import { Context, h, Schema } from 'koishi'

export const name = 'speedtest-og'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.on('message', (session) => {
    if (isValidSpeedtestURL(session.content)) {
      session.send(h('img', { src: `${session.content}.png` }));
    }
  })
}

function isValidSpeedtestURL(url) {
  const pattern = /^https:\/\/www\.speedtest\.net\/result\/c\/[a-f0-9\-]{36}$/i;
  return pattern.test(url);
}
