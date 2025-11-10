import twemoji from 'twemoji';

/**
 * 이모지를 Twemoji SVG로 파싱
 * Astro 컴포넌트에서는 set:html을 통해 렌더링
 */
export const twemojiParse = (emoji: string): string => {
  return twemoji.parse(emoji, {
    base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/',
    folder: 'svg',
    ext: '.svg',
  });
};

/**
 * 단일 이모지만 추출 (텍스트 제거)
 */
export const extractEmoji = (text: string): string => {
  // 이모지 유니코드 범위로 필터링
  const emojiRegex =
    /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]/gu;
  const match = text.match(emojiRegex);
  return match ? match[0] : '📝';
};
