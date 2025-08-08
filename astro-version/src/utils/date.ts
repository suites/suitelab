import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { CollectionEntry } from 'astro:content';

// dayjs 플러그인 및 로케일 설정
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.locale('ko');

/**
 * 날짜를 한국어 포맷으로 변환
 */
export function formatDate(
  date: Date | string,
  format: string = 'YYYY.MM.DD',
): string {
  return dayjs(date).format(format);
}

/**
 * 상대적인 시간 표시 (예: "3일 전")
 */
export function getRelativeTime(date: Date | string): string {
  return dayjs(date).fromNow();
}

/**
 * ISO 문자열을 Date 객체로 안전하게 변환
 */
export function parseDate(dateString: string): Date {
  const parsed = dayjs(dateString);
  if (!parsed.isValid()) {
    throw new Error(`Invalid date string: ${dateString}`);
  }
  return parsed.toDate();
}

/**
 * 날짜 비교 유틸리티
 */
export function isBefore(date1: Date | string, date2: Date | string): boolean {
  return dayjs(date1).isBefore(dayjs(date2));
}

export function isAfter(date1: Date | string, date2: Date | string): boolean {
  return dayjs(date1).isAfter(dayjs(date2));
}

/**
 * 날짜 정렬 헬퍼 - Astro collection entry용
 */
export function sortByDate(
  items: CollectionEntry<'blog'>[],
  ascending: boolean = false,
): CollectionEntry<'blog'>[] {
  return [...items].sort((a, b) => {
    const dateA = dayjs(a.data.date || a.data.pubDate);
    const dateB = dayjs(b.data.date || b.data.pubDate);
    return ascending
      ? dateA.unix() - dateB.unix()
      : dateB.unix() - dateA.unix();
  });
}
