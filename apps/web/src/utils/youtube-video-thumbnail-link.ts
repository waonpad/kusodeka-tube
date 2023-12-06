export const youtubeVideoThumbnailLink = {
  default: (videoId: string) => `https://img.youtube.com/vi/${videoId}/default.jpg`,
  medium: (videoId: string) => `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
  high: (videoId: string) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  standard: (videoId: string) => `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
  maxres: (videoId: string) => `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
};
