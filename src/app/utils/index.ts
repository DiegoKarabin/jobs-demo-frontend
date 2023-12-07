export function querystringify(obj: any) {
  const keys = Object.keys(obj);

  return keys.map((key) => {
    const value = obj[key];

    if (!value) {
      return null;
    }

    return `${key}=${encodeURIComponent(value)}`;
  })
    .filter((element) => element)
    .join('&');
}
