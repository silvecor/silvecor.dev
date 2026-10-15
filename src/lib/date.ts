const environment = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function formatDate(date: string) {
  const parts = Object.fromEntries(environment.formatToParts(new Date(date)).map(i => [i.type, i.value]));
  return `${parts.day} ${parts.month}, ${parts.year}`;
}
