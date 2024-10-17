import twemoji from 'twemoji';

export const twemojiParse = (emoji: string) => {
  return twemoji.parse(emoji, {
    base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/',
    folder: 'svg',
    ext: '.svg',
  });
};
