// Путь к статике из public/ с учётом base (Vite import.meta.env.BASE_URL).
// Нужно для деплоя в подпапку (GitHub Pages: /twdomains/) — иначе абсолютные
// «/foo.svg» уходят в корень домена и дают 404.
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
